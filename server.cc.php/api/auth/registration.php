<?php
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repassword = $_POST['re-password'];

    include "../configDB.php";

    $query = "select * from users where email='$email'";
    $result = mysqli_query($connectDB, $query);
    if (mysqli_num_rows($result)!=0)
    {
        echo 'Такой пользователь уже существует!';
        exit;
    }
    else 
    {
        if ($password != $repassword)
        {
            echo 'Пароли не совпадают!';
            exit;
        }
        else
        {
            $query = "insert into users value(null, '$username', '$email', sha1('$password'), false, 'transaction')";
            $result = mysqli_query($connectDB, $query);
            if ($result) {
                $redicet = "http://".$_SERVER['SERVER_NAME']."/index.html";
                header ("Location: $redicet");
                echo 'Вы успешно зарегистрировались';
            }
            else 
            {
                echo 'Ошибка запроса';
            }
        }
    }
?>