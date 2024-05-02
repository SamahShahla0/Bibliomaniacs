<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the bookId parameter is set
if(isset($_POST['bookId'])) {
    // Retrieve bookId from the request
    $bookId = $_POST['bookId'];

    // Connect to your database (assuming you have a connection)
    include 'connection.php';
    $conn = connectDB();

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute SQL query to delete the book from the cart
    $sql = "DELETE FROM cart_details WHERE books_book_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bookId);

    if ($stmt->execute()) {
        // Book successfully deleted from the cart
        echo "Book deleted from cart successfully.";
    } else {
        // Error occurred
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the database connection
    $conn->close();
} else {
    // bookId parameter is not set
    echo "Error: Book ID not provided.";
}
?>
