<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(405, ['message' => 'Method not allowed.']);
}

session_start();
$_SESSION = [];
session_destroy();

jsonResponse(200, ['message' => 'Signed out.']);
