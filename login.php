#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$email = $_POST['email'];
$password = $_POST['password1'];

$query = "SELECT id, password from users where email='$email'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$encryptedPassword = $row[1];
$num = mysql_num_rows($result);

if(sha1($password) == $encryptedPassword){
	session_start();
	$_SESSION["userID"] = $row[0];
	echo($row[0]);
}
else if($num == 0){
	echo(-1);
}
else{
	echo(-2);
}

mysql_close();?>
