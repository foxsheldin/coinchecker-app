<?php
    if (isset($_COOKIE['userID'])){
        $typeAccount = $_GET['type'];
        $accountID = $_GET['deleteid'];
        include_once("configDB.php");

        switch ($typeAccount)
        {
            case "cash":{
                $deleteAcc=mysqli_query($connectDB, "delete from users_cash where userCashID=$accountID");
                $result=mysqli_query($connectDB,"delete from users_transaction where (firstTypeAccountID=1 and firstAccountID=$accountID) or (secondTypeAccountID=1 and secondAccountID=$accountID)");
            }; 
            break;
            case "card":{
                $deleteAcc=mysqli_query($connectDB, "delete from users_Card where userCardID=$accountID");
                $result=mysqli_query($connectDB,"delete from users_transaction where (firstTypeAccountID=2 and firstAccountID=$accountID) or (secondTypeAccountID=2 and secondAccountID=$accountID)");
            }; 
            break;
            case "credit":{
                $deleteAcc=mysqli_query($connectDB, "delete from users_Credit_Card where userCreditCardID=$accountID");
                $result=mysqli_query($connectDB,"delete from users_transaction where (firstTypeAccountID=3 and firstAccountID=$accountID) or (secondTypeAccountID=3 and secondAccountID=$accountID)");
            }; 
            break;
            case "bankAccount":{
                $deleteAcc=mysqli_query($connectDB, "delete from users_bank_account where userBankAccountID=$accountID");
                $result=mysqli_query($connectDB,"delete from users_transaction where (firstTypeAccountID=4 and firstAccountID=$accountID) or (secondTypeAccountID=4 and secondAccountID=$accountID)");
            }; 
            break;
            case "deposit":{
                $deleteAcc=mysqli_query($connectDB, "delete from users_deposit where userDepositID=$accountID");
                $result=mysqli_query($connectDB,"delete from users_transaction where (firstTypeAccountID=5 and firstAccountID=$accountID) or (secondTypeAccountID=5 and secondAccountID=$accountID)");
            }; 
            break;
            default: {
                $redicet = $_SERVER['HTTP_REFERER'];
                header ("Location: $redicet");
                exit;
            }
        }

        if ($result)
        {
            $redicet = $_SERVER['HTTP_REFERER'];
            header ("Location: $redicet");
        }
        else
        {
            echo 'ОШИБКА СЕРВЕРА';
            exit;
        }

    }
    else
    {
        $redicet = "http://".$_SERVER['SERVER_NAME']."/auth/index.html";
        header ("Location: $redicet");
    }
?>