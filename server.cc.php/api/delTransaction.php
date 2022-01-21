<?php
    if (isset($_COOKIE['userID'])){
        include_once("configDB.php");
        $transactionID = $_GET['transactionID'];
        $userID = $_COOKIE['userID'];

        $transaction = mysqli_query($connectDB, "select firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID, amountMoney, commentID, isIncome, isOutcome, isTransfer from users_transaction where transactionID=$transactionID and userID=$userID");
        $transaction = mysqli_fetch_array($transaction);
        $firstTypeAccountID = $transaction['firstTypeAccountID'];
        $firstAccountID = $transaction['firstAccountID'];
        $amountMoney = $transaction['amountMoney'];
        $commentID = $transaction['commentID'];
        $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
        $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
        $firstTypeAccountTableID = $firstTypeAccountTable[1];
        $firstTypeAccountTable = $firstTypeAccountTable[0];
        if ($transaction['isIncome']||$transaction['isOutcome'])
        {
            $refund = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
        }
        if($transaction['isTransfer'])
        {
            $secondTypeAccountID = $transaction['secondTypeAccountID'];
            $secondAccountID = $transaction['secondAccountID'];
            $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
            $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
            $secondTypeAccountTableID = $secondTypeAccountTable[1];
            $secondTypeAccountTable = $secondTypeAccountTable[0];
            $firstrefund = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$amountMoney where $firstTypeAccountTableID=$firstAccountID");
            if ($firstrefund)
            {
                $refund = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney-$amountMoney where $secondTypeAccountTableID=$secondAccountID");
            }
        }
        if ($commentID != null)
        {
            $delcomment=mysqli_query($connectDB, "delete from comments where commentID=$commentID and transactionID=$transactionID");
        }
        $result = mysqli_query($connectDB, "delete from users_transaction where transactionID=$transactionID");

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