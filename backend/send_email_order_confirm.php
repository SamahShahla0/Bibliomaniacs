<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php'; 

$conn = connectDB();
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if POST request contains required data
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["userId"]) && isset($_POST["orderId"])) {
    // Retrieve data from POST request
    $userId = $_POST["userId"];
    $orderId = $_POST["orderId"];

    // Fetch user details from API using userId
    $userDetails = getUserDetails($userId);
    if ($userDetails && isset($userDetails["email"])) {
        $userEmail = $userDetails["email"];

        // Set up email parameters
        $to = $userEmail;
        $subject = "Your Order Confirmation";
        $message = "Your order #" . $orderId . " has been successful! Thank you for choosing Bibliomaniacs.";

        // Send email
        $headers = "From: bibliomaniacs@outlook.com"; // Replace with your email
        if (mail($to, $subject, $message, $headers)) {
            // Email sent successfully
            echo json_encode(["success" => true]);
        } else {
            // Failed to send email
            echo json_encode(["success" => false, "error" => "Failed to send email"]);
        }
    } else {
        // Failed to fetch user details or email not found
        echo json_encode(["success" => false, "error" => "Failed to fetch user details or email not found"]);
    }
} else {
    // Invalid request
    echo json_encode(["success" => false, "error" => "Invalid request"]);
}

// Function to fetch user details from API using userId
function getUserDetails($userId) {
    // API endpoint URL (replace with your actual API endpoint)
    $apiUrl = "http://localhost/Bibliomaniacs/backend/userInfo.php?userId=" . $userId;

    // Initialize cURL session
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL request
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        // Handle cURL error
        return null;
    } else {
        // Decode JSON response
        $userDetails = json_decode($response, true);

        // Check if user details were successfully fetched
        if ($userDetails && isset($userDetails["email"])) {
            return $userDetails; // Return user details
        } else {
            return null; // Return null if email not found or if there's an error
        }
    }

    // Close cURL session
    curl_close($ch);
}

?>

