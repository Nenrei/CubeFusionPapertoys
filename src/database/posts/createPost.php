<?php
/**
 * Created by PhpStorm.
 * User: Enman
 * Date: 06/07/2016
 * Time: 19:38
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include '../conectionData.php';

$conn = new mysqli($host, $user, $pass, $db);

$title = $objData->title;
$shortTitle = $objData->shortTitle;
$category = $objData->category;
$tags = $objData->tags;
$text = $objData->text;
$shortText = $objData->shortText;
$autor = $objData->autor;
$image = $objData->image;
$idPaper = $objData->idPaper;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    INSERT INTO
        post (title, shortTitle, category, tags, text, autor)
    VALUES
        ('" . $title . "', '" . $shortTitle . "', " . $category . ", '" . $tags . "', '" . $text . "', " . $autor . ")
 ";


$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows['posts'][] = $row;
    }
}

echo json_encode($rows);

$conn->close();