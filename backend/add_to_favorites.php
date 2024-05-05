<?php
// Allow requests from all origins (replace * with specific origins if needed)
header("Access-Control-Allow-Origin: *");
// Allow certain HTTP methods
header("Access-Control-Allow-Methods: POST");
// Allow certain headers
header("Access-Control-Allow-Headers: Content-Type");

// Include the function to establish database connection
include 'connection.php'; 

// Get user id from POST parameter
$data = json_decode(file_get_contents("php://input"));
$userId = $data->userId; 

// Get book id from POST parameter
$bookId = $data->bookId;

// Connect to the database
$conn = connectDB();

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL statement to insert the book into favorites
$sql = "INSERT INTO favorites (users_idusers, books_idbooks) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $bookId);

$response = new stdClass();

if ($stmt->execute() === TRUE) {
    $response->message = "Book added to favorites successfully.";
} else {
    $response->error = "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();

// Convert response object to JSON and echo
echo json_encode($response);
?>
