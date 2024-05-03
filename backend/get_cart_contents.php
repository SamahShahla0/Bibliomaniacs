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

// Retrieve user_id from the URL parameter
$user_id = $_GET['userId'];

// Query carts table to find the corresponding idcarts for the given user_id
$sql_carts = "SELECT idcarts FROM carts WHERE user_id = $user_id";
$result_carts = $conn->query($sql_carts);

if ($result_carts->num_rows > 0) {
    $row_carts = $result_carts->fetch_assoc();
    $idcarts = $row_carts["idcarts"];

    // Fetch cart contents from cart_details table using the retrieved idcarts
    $sql_cart_contents = "SELECT books.idbooks, books.tittle, books.image_base64, books.price, cart_details.quantity, cart_details.total
                          FROM cart_details
                          INNER JOIN books ON cart_details.books_book_id = books.idbooks
                          WHERE cart_details.carts_cart_id = $idcarts";


    $result_cart_contents = $conn->query($sql_cart_contents);

    if ($result_cart_contents->num_rows > 0) {
        // Output data of each row
        $cart_contents = array();
        while($row_cart_contents = $result_cart_contents->fetch_assoc()) {
            $item = array(
                "book_id" => $row_cart_contents["idbooks"],
                "title" => $row_cart_contents["tittle"],
                "image_base64" => $row_cart_contents["image_base64"],
                "price" => $row_cart_contents["price"],
                "quantity" => $row_cart_contents["quantity"],
                "total" => $row_cart_contents["total"]
            );
            $cart_contents[] = $item;
        }
        // Return cart contents as JSON
        header('Content-Type: application/json');
        echo json_encode($cart_contents);
    } else {
        echo "0 results";
    }
} else {
    echo "Cart not found for the user.";
}

$conn->close();
?>
