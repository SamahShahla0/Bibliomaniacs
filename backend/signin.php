<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

$conn = connectDB();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    $hashedPasswordFromDatabase = $user['password'];

    $hashedPasswordFromInput = hash('sha256', $password);

    if ($hashedPasswordFromInput === $hashedPasswordFromDatabase) {
        $response = array(
            "status" => "success",
            "message" => "Signed in successfully",
            "user" => array(
                "id" => $user['idusers'],
                "email" => $user['email'],
                "username" => $user['username']
            )
        );

    } else {

        $response = array("status" => "error", "message" => "Password and email do not match");
    }

} else {
    // Email does not exist
    $response = array("status" => "error", "message" => "Email does not exist");
}

// Close prepared statement and database connection
$stmt->close();
$conn->close();

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
