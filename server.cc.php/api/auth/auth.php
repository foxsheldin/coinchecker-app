<?php
include_once("../header.php");
include_once("../configDB.php");

$_POST = json_decode(file_get_contents('php://input'), true);
$email=$_POST["email"];
$password=$_POST["password"];

if ($email==''||$password=='') 
{
    $arr = array('resultCode' => 1, 
        'message' => "Вы не ввели email или пароль");
    echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    exit;
}

$result=mysqli_query($connectDB, 
    "select * from users where email='$email' and pass=sha1('$password')");
$row=mysqli_fetch_row($result);
if ($row){
    /* session_start(); */
    /* $_SESSION["email"] = $email;
    $_SESSION["userID"] = $row[0];
    $_SESSION["username"] = $row[1];
    $_SESSION['time'] = time(); */
    $arr = array('resultCode' => 0, 
        'data' => array('userid'=>$row[0], 'email'=>$email, 'startPage' => $row[5]));
    echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    
    exit;
}
else
{
    $arr = array('resultCode' => 2, 
        'message' => "Неправильный email или пароль!");
    echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    exit;
}
?>