<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

$resource = $_GET['resource'] ?? '';

switch ($resource) {
    case 'auth':
        require __DIR__ . '/auth.php';
        break;

    case 'logout':
        require __DIR__ . '/logout.php';
        break;

    case 'students':
        require __DIR__ . '/students.php';
        break;

    case 'courses':
        require __DIR__ . '/courses.php';
        break;

    default:
        jsonResponse(404, [
            'message' => 'Resource not found.',
            'available_resources' => ['auth', 'logout', 'students', 'courses'],
        ]);
}
