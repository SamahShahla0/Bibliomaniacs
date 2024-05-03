<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php'; 

$conn = connectDB();
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user ID is provided in the query parameters
if (isset($_GET['userId'])) {
    // Retrieve user ID from the query parameters
    $userId = $_GET['userId'];

    // Retrieve other form data from the POST request
    $holderName = $_POST['holderName'];
    $cardNumber = $_POST['card_number'];
    $cardType = $_POST['card_type'];
    $expiry_date = $_POST['expiry_date'];
    $cvv = $_POST['cvv'];

    // Check if the user already has existing payment information
    $sql_check = "SELECT * FROM payment_information WHERE user_id = '$userId'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        // User already has existing payment information, update the record
        $sql_update = "UPDATE payment_information 
                       SET cardholder_name = '$holderName', card_number = '$cardNumber', card_type = '$cardType', expiry_date = '$expiry_date', cvv = '$cvv'
                       WHERE user_id = '$userId'";

        if ($conn->query($sql_update) === TRUE) {
            echo "Payment information updated successfully";
        } else {
            echo "Error updating payment information: " . $conn->error;
        }
    } else {
        // User does not have existing payment information, insert a new record
        $sql_insert = "INSERT INTO payment_information (user_id, cardholder_name, card_number, card_type, expiry_date, cvv)
                       VALUES ('$userId', '$holderName', '$cardNumber', '$cardType', '$expiry_date', '$cvv')";

        if ($conn->query($sql_insert) === TRUE) {
            echo "New payment information added successfully";
        } else {
            echo "Error adding new payment information: " . $conn->error;
        }
    }

} else {
    // If the user ID is not provided, return an error
    echo "User ID is missing in the request";
}

$conn->close();
?>
