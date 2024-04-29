<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");
header ('Content-Type: multipart/form-data' );

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = $_POST['full_name'] ?? '';
    $email = $_POST['sender_email'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($fullName) || empty($email) || empty($message)) {
        http_response_code(400); // Bad Request
        echo json_encode(array("error" => "Please fill in all required fields"));
        exit;
    }

    // Save the message to the database 
    include 'connection.php';

    $conn = connectDB(); 

    $sql = "INSERT INTO messages (full_name, sender_email, message) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $fullName, $email, $message);
    if ($stmt->execute()) {
        // Message saved successfully
        http_response_code(200); // OK
        echo json_encode(array("message" => "Message saved successfully"));
    } else {
        // Failed to save the message
        http_response_code(500); // Internal Server Error
        echo json_encode(array("error" => "Failed to save message"));
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // If not a POST request, return an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("error" => "Method not allowed"));
}
?>
