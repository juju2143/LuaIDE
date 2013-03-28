<?php
$lua = rawurldecode($_POST['lua']);
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.(isset($_GET['f'])?$_GET['f']:'file.lua'));
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . strlen($lua));
echo $lua;
exit();
?>
