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

// Function to delete records related to a cart_id
function deleteCartRecords($cart_id) {
    global $conn;

    // Sanitize input to prevent SQL injection
    $cart_id = $conn->real_escape_string($cart_id);

    // Construct the SQL query
    $sql = "DELETE FROM cart_details WHERE carts_cart_id = '$cart_id'";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        return "Records related to cart_id $cart_id deleted successfully";
    } else {
        return "Error deleting records: " . $conn->error;
    }
}

// Check if cart_id is received from the client-side
if (isset($_POST['cartId'])) {
    $cart_id = $_POST['cartId'];
    $result = deleteCartRecords($cart_id);
    echo $result;
} else {
    echo "No cart_id received";
}

// Close connection
$conn->close();

?>
