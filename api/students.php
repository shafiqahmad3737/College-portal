<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
session_start();

$user = $_SESSION['user'] ?? null;
if (!is_array($user) || !in_array($user['role'] ?? null, ['Admin', 'Faculty', 'Student'], true)) {
    jsonResponse(401, ['message' => 'Please sign in to view student records.']);
}

$method = $_SERVER['REQUEST_METHOD'];
$isStaff = in_array($user['role'], ['Admin', 'Faculty'], true);
if ($method !== 'GET' && (!$isStaff || !in_array($method, ['POST', 'PUT', 'DELETE'], true))) {
    jsonResponse($isStaff ? 405 : 403, [
        'message' => $isStaff ? 'Method not allowed.' : 'You do not have permission to modify student records.',
    ]);
}

function readStudentInput(): array
{
    $data = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($data)) {
        jsonResponse(400, ['message' => 'A valid JSON object is required.']);
    }

    $student = [
        'student_id' => trim((string) ($data['student_id'] ?? '')),
        'name' => trim((string) ($data['name'] ?? '')),
        'department' => trim((string) ($data['department'] ?? '')),
        'semester' => trim((string) ($data['semester'] ?? '')),
        'cgpa' => $data['cgpa'] ?? null,
        'status' => trim((string) ($data['status'] ?? '')),
    ];

    if (
        $student['student_id'] === '' || strlen($student['student_id']) > 50 ||
        $student['name'] === '' || strlen($student['name']) > 120 ||
        $student['department'] === '' || strlen($student['department']) > 100 ||
        $student['semester'] === '' || strlen($student['semester']) > 30 ||
        !is_numeric($student['cgpa']) || (float) $student['cgpa'] < 0 || (float) $student['cgpa'] > 4 ||
        !in_array($student['status'], ['Active', 'Inactive'], true)
    ) {
        jsonResponse(422, ['message' => 'Provide a valid student ID, name, department, semester, CGPA (0–4), and status.']);
    }

    $student['cgpa'] = (float) $student['cgpa'];
    return $student;
}

function studentIdFromRequest(): int
{
    $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($id === false) {
        jsonResponse(400, ['message' => 'A valid student record ID is required.']);
    }

    return $id;
}

function handleStudentRequest(): void
{
    global $method;
    $pdo = getPdo();

    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT id, student_id, name, department, semester, cgpa, status FROM students ORDER BY name ASC');
        $students = $stmt->fetchAll();
        jsonResponse(200, ['count' => count($students), 'data' => $students]);
    }

    if ($method === 'POST') {
        $student = readStudentInput();
        $stmt = $pdo->prepare(
            'INSERT INTO students (student_id, name, department, semester, cgpa, status)
             VALUES (:student_id, :name, :department, :semester, :cgpa, :status)'
        );
        $stmt->execute($student);
        $student['id'] = (int) $pdo->lastInsertId();
        jsonResponse(201, ['message' => 'Student created.', 'data' => $student]);
    }

    $id = studentIdFromRequest();
    if ($method === 'PUT') {
        $student = readStudentInput();
        $stmt = $pdo->prepare(
            'UPDATE students
             SET student_id = :student_id, name = :name, department = :department,
                 semester = :semester, cgpa = :cgpa, status = :status
             WHERE id = :id'
        );
        $stmt->execute($student + ['id' => $id]);
        if ($stmt->rowCount() === 0) {
            $exists = $pdo->prepare('SELECT id FROM students WHERE id = :id');
            $exists->execute(['id' => $id]);
            if (!$exists->fetch()) {
                jsonResponse(404, ['message' => 'Student record not found.']);
            }
        }

        jsonResponse(200, ['message' => 'Student updated.', 'data' => ['id' => $id] + $student]);
    }

    if ($method === 'DELETE') {
        $stmt = $pdo->prepare('DELETE FROM students WHERE id = :id');
        $stmt->execute(['id' => $id]);
        if ($stmt->rowCount() === 0) {
            jsonResponse(404, ['message' => 'Student record not found.']);
        }

        jsonResponse(200, ['message' => 'Student deleted.']);
    }

    jsonResponse(405, ['message' => 'Method not allowed.']);
}

try {
    handleStudentRequest();
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        jsonResponse(409, ['message' => 'A student with that student ID already exists.']);
    }

    error_log($e->getMessage());
    jsonResponse(500, ['message' => 'The student request could not be completed.']);
} catch (Throwable $e) {
    error_log($e->getMessage());
    jsonResponse(500, ['message' => 'The student request could not be completed.']);
}
