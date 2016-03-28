#!/usr/local/bin/php

<?php

$conn  = mysql_connect('mysql.cise.ufl.edu', 'jnassar', 'Theitis94') or 
   die ('Could not connect:' . mysql_error());

@mysql_select_db('hci_project') or die('Could not select database');

$taskID = $_POST['taskID'];
$query = "UPDATE tasks SET completed=1 where taskID='$taskID'";
$result = mysql_query($query);


mysql_close();?>
