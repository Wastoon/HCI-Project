#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$email = $_POST['email'];
$password = $_POST['password1'];

$query = "SELECT password from users where email='$email' limit 1";
$result = mysql_query($query);
$value = mysql_fetch_object($result);
$encryptedPassword = $value->password;

if($encryptedPassword == SHA1('$password'){
  echo ("Yes");
}
else{
  echo("No");
}

mysql_close();?>
