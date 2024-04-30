<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow GET, POST, PUT, DELETE requests
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");
// Include database connection file
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
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// SQL query to insert user data into the database
$sql = "INSERT INTO users (First_name, Last_name, email, username, password, addresses_idaddresses, `user-types_iduser-types`)
        VALUES (?, ?, ?, ?, ?, NULL, 2)";

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
