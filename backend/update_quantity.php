<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the bookId and quantity parameters are set
if(isset($_POST['bookId']) && isset($_POST['quantity'])) {
    // Retrieve bookId and quantity from the request
    $bookId = $_POST['bookId'];
    $quantity = $_POST['quantity'];

    // Connect to your database (assuming you have a connection)
    include 'connection.php';
    $conn = connectDB();

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute SQL query to update the quantity in the database
    $sql = "UPDATE cart_details SET quantity = ? WHERE books_book_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $quantity, $bookId);
    $stmt->execute();

    // Check if the update was successful
    if ($stmt->affected_rows > 0) {
        // Return success response
        echo "Quantity updated successfully.";
    } else {
        // Return error response
        echo "Error: Failed to update quantity.";
    }

    // Close the database connection
    $conn->close();
} else {
    // bookId or quantity parameter is not set
    echo "Error: Book ID or quantity not provided.";
}
?>
