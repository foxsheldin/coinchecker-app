<?php
    if (isset($_COOKIE['userID'])){
        include_once("configDB.php");
        $userid = $_COOKIE['userID'];
        $typeTransaction = $_GET['type'];
        $date = $_GET['date'];
        $money = $_GET['money'];
        $secondTypeAccountID = 'null';
        $secondAccountID = 'null';
        $payer = 'null';
        $categoryID = '1';
        $comment = $_GET['comment'];
        $isIncome = 'false';
        $isOutcome = 'false';
        $isTransfer = 'false';
        //$commentID = mysqli_query($connectDB, "insert into comments value (null, ");

        switch ($typeTransaction){
            case 'outcome':{
                $firstAccountID = $_GET['account'];
                $firstAccountID = explode(', ', $firstAccountID);
                $firstTypeAccountID = $firstAccountID[0];
                $firstAccountID = $firstAccountID[1];
                $payer = $_GET['payer'];
                $categoryID = $_GET['category'];
                $money = $money * (-1);
                $isOutcome = 'true';
            }; break;
            case 'income':{
                $firstAccountID = $_GET['account'];
                $firstAccountID = explode(', ', $firstAccountID);
                $firstTypeAccountID = $firstAccountID[0];
                $firstAccountID = $firstAccountID[1];
                $categoryID = $_GET['category'];
                $payer = $_GET['payer'];
                $isIncome = 'true';
            }; break;
            case 'transfer':{
                $firstAccountID = $_GET['firstAccount'];
                $firstAccountID = explode(', ', $firstAccountID);
                $firstTypeAccountID = $firstAccountID[0];
                $firstAccountID = $firstAccountID[1];
                $secondAccountID = $_GET['secondAccount'];
                $secondAccountID = explode(', ', $secondAccountID);
                $secondTypeAccountID = $secondAccountID[0];
                $secondAccountID = $secondAccountID[1];
                $isTransfer = 'true';
                if (($firstTypeAccountID == $secondTypeAccountID) && ($firstAccountID == $secondAccountID))
                {
                    $redicet = $_SERVER['HTTP_REFERER'];
                    header ("Location: $redicet");
                    exit;
                }
            }; break;
            default:{
                $redicet = $_SERVER['HTTP_REFERER'];
                header ("Location: $redicet");
                exit;
            }
        }

        $transactionID = mysqli_query($connectDB, "select MAX(transactionID) from users_transaction");
        $transactionID = mysqli_fetch_array($transactionID);
        $transactionID = $transactionID[0]+1;
        
        try
        {
            if ($comment != null)
            {
                $comment = mysqli_query($connectDB, "insert into comments value (null, $transactionID, '$comment')");
                if ($comment)
                {
                    $commentID = mysqli_query($connectDB, "select max(commentID) from comments where transactionID=$transactionID");
                    $commentID = mysqli_fetch_array($commentID);
                    $commentID = $commentID[0];
                }
                else
                {
                    echo 'ОШИБКА СЕРВЕРА';
                    exit;
                }
            }
            else
            {
                //echo 'Пустой коммент';
                $commentID = 'null';
            }
            $transaction = mysqli_query($connectDB, "insert into users_transaction value ($transactionID, $userid, $firstTypeAccountID, $firstAccountID, $secondTypeAccountID, $secondAccountID, $money, $categoryID, '$date', '$payer', $commentID, false, null, $isIncome, $isOutcome, $isTransfer)");
            if ($transaction)
            {
                if ($typeTransaction == 'income' || $typeTransaction == 'outcome')
                {
                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                    $result = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$money where $firstTypeAccountTableID=$firstAccountID");
                }
                if ($typeTransaction == 'transfer')
                {
                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                    $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                    $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                    $secondTypeAccountTableID = $secondTypeAccountTable[1];
                    $secondTypeAccountTable = $secondTypeAccountTable[0];
                    $firstresult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$money where $firstTypeAccountTableID=$firstAccountID");
                    if ($firstresult)
                    {
                        $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney+$money where $secondTypeAccountTableID=$secondAccountID");
                    }
                }
                
            }
            
        } 
        catch (Exception $e) {
            echo 'Поймано исключение: ',  $e->getMessage(), "\n";
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