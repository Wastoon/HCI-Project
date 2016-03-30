#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

session_start();

$userID = $_SESSION['userID'];
$first=$_POST['firstname'];
$last=$_POST['lastname'];
$phone = $_POST['phonenumber'];
$email = $_POST['email'];
$bio = $_POST['aboutme'];

$query = "SELECT * from users where email='$email'";
$result = mysql_query($query);
$num_rows_email = mysql_num_rows($result);
$row = mysql_fetch_array($result);
if($row[0] == $userID){
	$num_rows_email = 0;
}

$query = "SELECT * from users where phone='$phone'";
$result = mysql_query($query);
$num_rows_phone = mysql_num_rows($result);
$row = mysql_fetch_array($result);
if($row[0] == $userID){
	$num_rows_phone = 0;
}

if($num_rows_email > 0){
	echo(1);
}
else if($num_rows_phone > 0){
	echo(2);
}
else{
$query = "UPDATE users set first='$first', last='$last', phone='$phone', email='$email', bio='$bio' where id='$userID'";
$result = mysql_query($query);
echo(0);
}

mysql_close();?>
