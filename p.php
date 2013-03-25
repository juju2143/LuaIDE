<?php
//$uri = explode("/", $_SERVER['REQUEST_URI'], 3);
//$uri = $_SERVER['QUERY_STRING'];
$uri = $_GET['f'];
if(preg_match("((((ht|f)tp(s?))\://){1}\S+)",$uri))
{
$contents = file_get_contents($uri);
if($contents===FALSE)
{
header("HTTP/1.1 404 Not Found");
echo "404";
}
else die($contents);
}
else
{
header("HTTP/1.1 403 Forbidden");
echo "lol nope";
}
?>
