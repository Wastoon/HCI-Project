#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$title = $_POST['title'];
$deadline = $_POST['deadline'];
$desc = $_POST['desc'];
$userID = $_POST['userID'];

$query = "SELECT groupID from users where id='$userID'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$groupID = $row[0];
$zero = 0;

$query = "INSERT INTO goals VALUES ('$groupID', '$title', '$desc', '$deadline', '$zero', '')";
$result = mysql_query($query);

echo($result);

mysql_close();?>
