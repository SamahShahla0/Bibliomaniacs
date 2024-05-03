<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include 'connection.php';

$conn = connectDB();
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve sign-up form data
$FirstName = $_POST['First_name'];
$LastName = $_POST['Last_name'];
$email = $_POST['email'];

// Check if the email already exists
$stmt = $conn->prepare("SELECT idusers FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Email already exists, return response status
    http_response_code(400);
    echo "Error: Email already registered";
    exit();
}
$stmt->close();


// Extract username from email
$username = explode('@', $email)[0];

// Check if the username already exists
$stmt = $conn->prepare("SELECT idusers FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Username already exists, append a number until a unique username is found
    $i = 1;
    while ($stmt->num_rows > 0) {
        $newUsername = $username . $i;
        $stmt->bind_param("s", $newUsername);
        $stmt->execute();
        $stmt->store_result();
        $i++;
    }
    $username = $newUsername;
}
$stmt->close();


$password = $_POST['password'];
// Hash the password before storing it in the database
$hashedPassword = hash('sha256', $password);

// SQL query to insert user data into the database
$sql = "INSERT INTO users (First_name, Last_name, email, username, password, `user-types_iduser-types`)
        VALUES (?, ?, ?, ?, ?, 2)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $FirstName, $LastName, $email, $username, $hashedPassword);

if ($stmt->execute() === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>
