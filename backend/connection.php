<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function connectDB() {
    $servername = "localhost"; // Replace with your database server
    $username = "root"; // Replace with your database username
    $password = ""; // Replace with your database password
    $dbname = "bibliomaniacsdb"; // Replace with your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}
?>
