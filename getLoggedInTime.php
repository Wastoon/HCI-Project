#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$id = $_POST['id'];

$query = "SELECT time from logged_in where id='$id'";
//$query = "SELECT time from logged_in";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$time = $row[0];
$num = mysql_num_rows($result);

$dt = new DateTime();
$currTime = $dt->format('Y-m-d H:i:s');
$diff = round((strtotime($currTime) - strtotime($time))/60);

if($diff > 5){
	echo(0);
}
else{
	echo(1);
}

mysql_close();?>
