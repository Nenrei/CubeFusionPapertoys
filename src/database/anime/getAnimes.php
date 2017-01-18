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

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$actual = $objData->actual;
$orderBy = $objData->orderBy;

$orderStr = "a.name ASC";

if($orderBy == "id"){
    $orderStr = "a.id ASC";
}else if($orderBy == "-id"){
    $orderStr = "a.id DESC";
}else if($orderBy == "name"){
    $orderStr = "a.name ASC";
}else if($orderBy == "-name"){
    $orderStr = "a.name DESC";
}else if($orderBy == "paperCount"){
    $orderStr = "paperCount ASC";
}else if($orderBy == "-paperCount"){
    $orderStr = "paperCount DESC";
}

$sql = "
  SELECT
    a.id,
    a.name,
    a.imageName,
    (
      SELECT COUNT( p.id )
      FROM papertoy p
      WHERE p.anime = a.id
    ) AS paperCount
  FROM
    anime a
  ORDER BY
    " . $orderStr . "
  LIMIT " . $actual . ",10
 ";

$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows['animes'][] = $row;
    }
}

echo json_encode($rows);

$conn->close();