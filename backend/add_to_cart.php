<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connection.php';

$conn = connectDB();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user ID and product ID from the request body
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$bookId = $data['bookId'];

try {
    // Retrieve the cart ID associated with the user
    $stmt = $conn->prepare("SELECT idcarts FROM carts WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $cartId = $row['idcarts'];
    } else {
        // If the cart for the user is not found, create a new cart record
        $stmt = $conn->prepare("INSERT INTO carts (user_id) VALUES (?)");
        $stmt->bind_param("i", $userId);
        $stmt->execute();

        // Get the newly inserted cart ID
        $cartId = $stmt->insert_id;
    }

    // Add the product to the user's cart
    $stmt = $conn->prepare("INSERT INTO cart_details (carts_cart_id, books_book_id, quantity) VALUES (?, ?, 1)");
    $stmt->bind_param("ii", $cartId, $bookId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(array("success" => true, "cartId" => $cartId));
    } else {
        echo json_encode(array("success" => false, "message" => "Failed to add product to cart."));
    }
} catch (Exception $e) {
    // If an exception occurs, return the error message
    echo json_encode(array("success" => false, "message" => "Error: " . $e->getMessage()));
}

$stmt->close();
$conn->close();

?>
