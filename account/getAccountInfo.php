#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

session_start();

$userID = $_SESSION['userID'];
$query = "SELECT * from users where id='$userID'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
echo(json_encode($row));
?>
