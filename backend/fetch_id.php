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

// Get type and title from the request
$type = $_GET['type'];
$title = $_GET['title'];

// Determine which table and ID column to query based on the type
$table = $type === 'article' ? 'blogs' : 'books';
$idColumn = $type === 'article' ? 'idblogs' : 'idbooks';
$titleColumn = $type === 'article' ? 'blog_title' : 'tittle'; 
$idColumnName = $type === 'article' ? 'idblogs' : 'idbooks';// Change to the actual column names

// Fetch the ID from the appropriate table based on the title
$sql = "SELECT $idColumn FROM $table WHERE $titleColumn = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $title);
$stmt->execute();
$stmt->bind_result($id);
$stmt->fetch();
$stmt->close();

// Send back the ID in JSON format
echo json_encode(array($idColumnName => $id));

$conn->close();
?>

