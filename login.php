#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$email = $_POST['email'];
$password = $_POST['password1'];

$query = "SELECT password from users where email='$email'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$encryptedPassword = $row[0];
$num = mysql_num_rows($result);

if(sha1($password) == $encryptedPassword){
	echo("Yes");
}
else{
	echo("No");
}

mysql_close();?>
