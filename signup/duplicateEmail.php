#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$email = $_POST['email'];
//$query = "SELECT * from users where email='$email' or phonenumber='$phone'";
$query = "SELECT email from users where email='$email'";
$result = mysql_query($query);
$num_rows = mysql_num_rows($result);
echo ($num_rows);

mysql_close();?>
