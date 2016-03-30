#!/usr/local/bin/php

<?php
session_start();
$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$message = $_POST['message'];
$userID = $_SESSION['userID'];
$query = "SELECT groupID, first, last from users where id='$userID'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$groupID = $row[0];
$first = $row[1];
$last = $row[2];
$name = $first . " " . $last;

$dt = new DateTime();
$currTime = $dt->format('Y-m-d H:i:s');

$query = "Insert into messages VALUES ('', '$name', '$message', '$currTime', '$groupID')";

$result = mysql_query($query);

echo(1);
mysql_close();?>
