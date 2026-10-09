<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(405, ['message' => 'Method not allowed.']);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    parse_str($rawInput, $data);
}

$username = trim((string) ($data['username'] ?? ''));
$password = (string) ($data['password'] ?? '');

if ($username === '' || $password === '') {
    jsonResponse(400, ['message' => 'Username and password are required.']);
}

try {
    $pdo = getPdo();
    $hashedPassword = hash('sha256', $password);

    $stmt = $pdo->prepare(
        'SELECT id, username, name, role, student_id, email FROM users WHERE username = :username AND password_hash = :password_hash LIMIT 1'
    );
    $stmt->execute([
        'username' => $username,
        'password_hash' => $hashedPassword,
    ]);

    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(401, ['message' => 'Invalid credentials.']);
    }

    $_SESSION['user'] = $user;
    $_SESSION['logged_in'] = true;

    jsonResponse(200, [
        'message' => 'Login successful.',
        'user' => $user,
        'session_id' => session_id(),
    ]);
} catch (Throwable $e) {
    jsonResponse(500, ['message' => $e->getMessage()]);
}
