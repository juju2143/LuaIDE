<?php
$luaname = tempnam("/tmp", "lua");
$tnsname = tempnam("/tmp", "luna");

$handle = fopen($luaname, "w");
fwrite($handle, $_POST['lua']);
fclose($handle);

shell_exec('luna '.$luaname.' '.$tnsname);

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.(isset($_GET['f'])?$_GET['f']:'file.tns'));
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($tnsname));
ob_clean();
flush();
readfile($tnsname);

unlink($luaname);
unlink($tnsname);
exit();
?>
