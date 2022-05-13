<?php
include "../header.php";
include "../configDB.php";

$_POST = json_decode(file_get_contents('php://input'), true);
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$repassword = $_POST['repassword'];

$query = "select * from users where email='$email'";
$result = mysqli_query($connectDB, $query);
if (mysqli_num_rows($result) != 0) {
    $arr = array(
        'resultCode' => 1,
        'message' => "Такой пользователь уже существует!"
    );
    echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    exit;
} else {
    if ($password != $repassword) {
        $arr = array(
            'resultCode' => 1,
            'message' => "Пароли не совпадают!"
        );
        echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        exit;
    } else {
        $query = "insert into users value(null, '$username', '$email', sha1('$password'), false, 'transaction')";
        $result = mysqli_query($connectDB, $query);
        if ($result) {
            $newUserID = mysqli_query($connectDB, "select userID from users where email='$email'");
            $newUserID = mysqli_fetch_array($newUserID);
            $newUserID = $newUserID[0];
            $query = "insert into users_Cash values (NULL, $newUserID, 'Наличный счет', 0, false, true, false);";
            $result2 = mysqli_query($connectDB, $query);

            $arr = array(
                'resultCode' => 0,
                'message' => "Вы успешно зарегистрировались"
            );
            echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        } else {
            $arr = array(
                'resultCode' => 1,
                'message' => "Ошибка запроса"
            );
            echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        }
    }
}
