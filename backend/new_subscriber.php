<?php
// Allow requests from your frontend domain
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST"); // Specify the allowed request methods
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the email parameter exists in the POST request
    if (isset($_POST['email'])) {
        // Retrieve the email address from the POST request
        $email = $_POST['email'];

        // Validate the email address
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Include your database connection file
            include 'connection.php';

            // Insert the email address into the subscribers table
            $conn = connectDB(); 

            // Prepare the SQL statement
            $stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
            $stmt->bind_param("s", $email);

            // Execute the statement
            if ($stmt->execute()) {
                // If insertion is successful, return a success message
                echo "Subscription successful!";
            } else {
                // If insertion fails, return an error message
                echo "Error: Unable to insert email address into database.";
            }

            // Close the statement and connection
            $stmt->close();
            $conn->close();
        } else {
            // If email address is invalid, return an error message
            echo "Error: Invalid email address.";
        }
    } else {
        // If email parameter is not provided, return an error message
        echo "Error: Email parameter is missing.";
    }
} else {
    // If request method is not POST, return an error message
    echo "Error: Invalid request method.";
}
?>
