#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$email = $_POST['email'];

$query = "SELECT id from users where email='$email'";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$userID = $row[0];


$query = "SELECT * from logged_in where id='$userID'";
$result = mysql_query($query);
$num = mysql_num_rows($result);
$dt = new DateTime();
$currTime = $dt->format('Y-m-d H:i:s');
if($num == 0){
	$query = "INSERT INTO logged_in VALUES ('$userID', '$currTime')";
}
else{
	$query = "UPDATE logged_in set time='$currTime' where id='$userID'";
}
$result = mysql_query($query);

echo($userID);

mysql_close();?>
