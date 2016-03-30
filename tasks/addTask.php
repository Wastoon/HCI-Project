#!/usr/local/bin/php

<?php
session_start();
$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$title = $_POST['title'];
$deadline = $_POST['deadline'];
$desc = $_POST['desc'];
$userID = $_SESSION['userID'];
$zero = 0;

$query = "INSERT INTO tasks VALUES ('$userID', '$title', '$desc', '$deadline', '$zero', '')";
$result = mysql_query($query);

echo($result);

mysql_close();?>
