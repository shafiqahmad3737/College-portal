<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
session_start();

$user = $_SESSION['user'] ?? null;
if (!is_array($user) || !in_array($user['role'] ?? null, ['Admin', 'Faculty', 'Student'], true)) {
    jsonResponse(401, ['message' => 'Please sign in to view course records.']);
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'GET' && ($user['role'] !== 'Admin' || !in_array($method, ['POST', 'PUT', 'DELETE'], true))) {
    jsonResponse($user['role'] === 'Admin' ? 405 : 403, [
        'message' => $user['role'] === 'Admin'
            ? 'Method not allowed.'
            : 'Only Admin users can modify course records.',
    ]);
}

function readCourseInput(): array
{
    $data = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($data)) {
        jsonResponse(400, ['message' => 'A valid JSON object is required.']);
    }

    $course = [
        'code' => trim((string) ($data['code'] ?? '')),
        'name' => trim((string) ($data['name'] ?? '')),
        'teacher' => trim((string) ($data['teacher'] ?? '')),
        'credits' => $data['credits'] ?? null,
        'department' => trim((string) ($data['department'] ?? '')),
        'semester' => trim((string) ($data['semester'] ?? '')),
        'status' => trim((string) ($data['status'] ?? '')),
    ];

    if (
        $course['code'] === '' || strlen($course['code']) > 50 ||
        $course['name'] === '' || strlen($course['name']) > 160 ||
        $course['teacher'] === '' || strlen($course['teacher']) > 120 ||
        filter_var($course['credits'], FILTER_VALIDATE_INT) === false ||
        (int) $course['credits'] < 1 || (int) $course['credits'] > 30 ||
        $course['department'] === '' || strlen($course['department']) > 100 ||
        $course['semester'] === '' || strlen($course['semester']) > 30 ||
        !in_array($course['status'], ['Active', 'Inactive'], true)
    ) {
        jsonResponse(422, ['message' => 'Provide a valid code, name, instructor, credits (1–30), department, semester, and status.']);
    }

    $course['credits'] = (int) $course['credits'];
    return $course;
}

function courseRecordId(): int
{
    $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($id === false) {
        jsonResponse(400, ['message' => 'A valid course record ID is required.']);
    }

    return $id;
}

function handleCourseRequest(): void
{
    global $method;
    $pdo = getPdo();

    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT id, code, name, teacher, credits, department, semester, status FROM courses ORDER BY name ASC');
        $courses = $stmt->fetchAll();
        jsonResponse(200, ['count' => count($courses), 'data' => $courses]);
    }

    if ($method === 'POST') {
        $course = readCourseInput();
        $stmt = $pdo->prepare(
            'INSERT INTO courses (code, name, teacher, credits, department, semester, status)
             VALUES (:code, :name, :teacher, :credits, :department, :semester, :status)'
        );
        $stmt->execute($course);
        $course['id'] = (int) $pdo->lastInsertId();
        jsonResponse(201, ['message' => 'Course created.', 'data' => $course]);
    }

    $id = courseRecordId();
    if ($method === 'PUT') {
        $course = readCourseInput();
        $stmt = $pdo->prepare(
            'UPDATE courses
             SET code = :code, name = :name, teacher = :teacher, credits = :credits,
                 department = :department, semester = :semester, status = :status
             WHERE id = :id'
        );
        $stmt->execute($course + ['id' => $id]);
        if ($stmt->rowCount() === 0) {
            $exists = $pdo->prepare('SELECT id FROM courses WHERE id = :id');
            $exists->execute(['id' => $id]);
            if (!$exists->fetch()) {
                jsonResponse(404, ['message' => 'Course record not found.']);
            }
        }

        jsonResponse(200, ['message' => 'Course updated.', 'data' => ['id' => $id] + $course]);
    }

    if ($method === 'DELETE') {
        $stmt = $pdo->prepare('DELETE FROM courses WHERE id = :id');
        $stmt->execute(['id' => $id]);
        if ($stmt->rowCount() === 0) {
            jsonResponse(404, ['message' => 'Course record not found.']);
        }

        jsonResponse(200, ['message' => 'Course deleted.']);
    }

    jsonResponse(405, ['message' => 'Method not allowed.']);
}

try {
    handleCourseRequest();
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        jsonResponse(409, ['message' => 'A course with that code already exists.']);
    }

    error_log($e->getMessage());
    jsonResponse(500, ['message' => 'The course request could not be completed.']);
} catch (Throwable $e) {
    error_log($e->getMessage());
    jsonResponse(500, ['message' => 'The course request could not be completed.']);
}
