#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');


$first=$_POST['firstname'];
$last=$_POST['lastname'];
$phone = $_POST['phonenumber'];
$email = $_POST['email'];
$password = $_POST['password1'];
$group = $_POST['groupid'];
$bio = $_POST['aboutme'];
$imageName = $_POST['firstname'] . $_POST['lastname'];
$imagePath = "/pics/" . $_POST['firstname'] . $_POST['lastname'] . $_POST['phonenumber'] . ".png";

$query = "SELECT email from users where email='$email'";
$result = mysql_query($query);
$num_rows_email = mysql_num_rows($result);

$query = "SELECT email from users where phone='$phone'";
$result = mysql_query($query);
$num_rows_phone = mysql_num_rows($result);

if($num_rows_email > 0){
	echo(1);
}
else if($num_rows_phone > 0){
	echo(2);
}
else{
$query = "INSERT INTO users VALUES('', '$first', '$last', '$phone', '$email', SHA1('$password'), '$group', '$bio', '$imageName', '$imagePath')";
$result = mysql_query($query);
echo(0);
}

mysql_close();?>
