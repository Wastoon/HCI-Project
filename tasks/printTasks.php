#!/usr/local/bin/php

<?php
session_start();
$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$userID = $_SESSION['userID'];

$query = "SELECT * from tasks";
$result = mysql_query($query);

$arr = array();
while($row = mysql_fetch_array($result)) {
    $arr[] = $row; 
}

echo(json_encode($arr));

mysql_close();?>
