<?php
    include_once("../header.php");
    include_once("../configDB.php");

    switch ($_SERVER['REQUEST_METHOD']) {
        /* Этот метод запроса получает транзакцию из базы данных */
        case "GET":{
            $userID = $_GET['userID'];
            $transactionid = $_GET['transactionid'];
            
            $query = "select transactionID, userID, firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID,
            amountMoney, categoryID, dateTransaction, payer, commentID, repeatOperation, repeatTransactionID, isIncome, isOutcome, isTransfer
            from users_transaction where userID=".$userID." and transactionid=".$transactionid;
            $result=mysqli_query($connectDB, $query);

            if (mysqli_num_rows($result)) {
                while ($row=mysqli_fetch_array($result)){
                    $date=date_create($row['dateTransaction']);
                    $nameCategory=mysqli_query($connectDB, "select name from categories where categoryID=".$row['categoryID']);
                    $nameCategory=mysqli_fetch_row($nameCategory);
                    $comment="";
                    if ($row['commentID']!=null){
                        $comment=mysqli_query($connectDB, "select comment from comments where commentID=".$row['commentID']);
                        $comment=mysqli_fetch_row($comment);
                    }
                    switch ($row['firstTypeAccountID'])
                    {
                        case 1:{
                            $account1=mysqli_query($connectDB, "select name from users_Cash where userCashID=".$row['firstAccountID']);
                            $account1=mysqli_fetch_row($account1);
                        }; 
                        break;
                        case 2:{
                            $account1=mysqli_query($connectDB, "select name from users_Card where userCardID=".$row['firstAccountID']);
                            $account1=mysqli_fetch_row($account1);
                        }; 
                        break;
                        case 3:{
                            $account1=mysqli_query($connectDB, "select name from users_Credit_Card where userCreditCardID=".$row['firstAccountID']);
                            $account1=mysqli_fetch_row($account1);
                        }; 
                        break;
                        case 4:{
                            $account1=mysqli_query($connectDB, "select name from users_bank_account where userBankAccountID=".$row['firstAccountID']);
                            $account1=mysqli_fetch_row($account1);
                        }; 
                        break;
                        case 5:{
                            $account1=mysqli_query($connectDB, "select name from users_deposit where userDepositID=".$row['firstAccountID']);
                            $account1=mysqli_fetch_row($account1);
                        }; 
                        break;
                        default:{
                            echo json_encode(array('resultCode'=>1, 'message'=>'Использование неизвестного счета(1)'));
                            exit;
                        }
                    }
                    $account2="";
                    if ($row['secondTypeAccountID']!=null){
                        switch ($row['secondTypeAccountID'])
                        {
                            case 1:{
                                $account2=mysqli_query($connectDB, "select name from users_Cash where userCashID=".$row['secondAccountID']);
                                $account2=mysqli_fetch_row($account2);
                            }; 
                            break;
                            case 2:{
                                $account2=mysqli_query($connectDB, "select name from users_Card where userCardID=".$row['secondAccountID']);
                                $account2=mysqli_fetch_row($account2);
                            }; 
                            break;
                            case 3:{
                                $account2=mysqli_query($connectDB, "select name from users_Credit_Card where userCreditCardID=".$row['secondAccountID']);
                                $account2=mysqli_fetch_row($account2);
                            }; 
                            break;
                            case 4:{
                                $account2=mysqli_query($connectDB, "select name from users_bank_account where userBankAccountID=".$row['secondAccountID']);
                                $account2=mysqli_fetch_row($account2);
                            }; 
                            break;
                            case 5:{
                                $account2=mysqli_query($connectDB, "select name from users_deposit where userDepositID=".$row['secondAccountID']);
                                $account2=mysqli_fetch_row($account2);
                            }; 
                            break;
                            default:{
                                echo json_encode(array('resultCode'=>2, 'message'=>'Использование неизвестного счета(2)'));
                                exit;
                            }
                        }
                    }
                    $arr = array('transactionID'=>$row['transactionID'], 'userID'=>$row['userID'], 
                    'firstTypeAccountID'=>$row['firstTypeAccountID'], 'firstAccountID'=>$row['firstAccountID'],
                    'secondTypeAccountID'=>$row['secondTypeAccountID'], 'secondAccountID'=>$row['secondAccountID'],
                    'amountMoney'=>$row['amountMoney'], 'categoryID'=>$row['categoryID'], 'dateTransaction'=>$row['dateTransaction'], 'payer'=>$row['payer'],
                    'commentID'=>$row['commentID'], 'repeatOperation'=>$row['repeatOperation'], 'repeatTransactionID'=>$row['repeatTransactionID'],
                    'isIncome'=>$row['isIncome'], 'isOutcome'=>$row['isOutcome'], 'isTransfer'=>$row['isTransfer'], 
                    'date'=>$date, 'nameCategory'=>$nameCategory, 'nameAccount1'=>$account1, 'nameAccount2'=>$account2, 'comment'=>$comment);
                    /* $arr = array('array'=>$row, 'date'=>$date, 'nameCategory'=>$nameCategory, 
                    'nameAccount1'=>$account1, 'nameAccount2'=>$account2, 'comment'=>$comment); */
                    echo json_encode(array("items"=>$arr, "resultCode"=>0));
                }
            }
        };
        break;



        /* Этот метод запроса добавляет транзакцию в базу данных */
        case "POST": {
            $_POST = json_decode(file_get_contents('php://input'), true);
            $userid = $_POST['userID'];
            $typeTransaction = $_POST['type'];
            $date = $_POST['date'];
            $money = $_POST['money'];
            $secondTypeAccountID = 'null';
            $secondAccountID = 'null';
            $payer = 'null';
            $categoryID = '1';
            $comment = $_POST['comment'];
            $isIncome = 'false';
            $isOutcome = 'false';
            $isTransfer = 'false';
            //$commentID = mysqli_query($connectDB, "insert into comments value (null, ");

            switch ($typeTransaction){
                case 'outcome':{
                    $firstAccountID = $_POST['account'];
                    $firstAccountID = explode(', ', $firstAccountID);
                    $firstTypeAccountID = $firstAccountID[0];
                    $firstAccountID = $firstAccountID[1];
                    $payer = $_POST['payer'];
                    $categoryID = $_POST['category'];
                    $money = $money * (-1);
                    $isOutcome = 'true';
                }; break;
                case 'income':{
                    $firstAccountID = $_POST['account'];
                    $firstAccountID = explode(', ', $firstAccountID);
                    $firstTypeAccountID = $firstAccountID[0];
                    $firstAccountID = $firstAccountID[1];
                    $categoryID = $_POST['category'];
                    $payer = $_POST['payer'];
                    $isIncome = 'true';
                }; break;
                case 'transfer':{
                    $firstAccountID = $_POST['firstAccount'];
                    $firstAccountID = explode(', ', $firstAccountID);
                    $firstTypeAccountID = $firstAccountID[0];
                    $firstAccountID = $firstAccountID[1];
                    $secondAccountID = $_POST['secondAccount'];
                    $secondAccountID = explode(', ', $secondAccountID);
                    $secondTypeAccountID = $secondAccountID[0];
                    $secondAccountID = $secondAccountID[1];
                    $isTransfer = 'true';
                    if (($firstTypeAccountID == $secondTypeAccountID) && ($firstAccountID == $secondAccountID))
                    {
                        /* Обработка одинаковых счетов в переводе*/
                        echo json_encode(array('resultCode'=>2, 'message'=>'Использование одинаковых счетов для перевода средств'));
                        exit;
                    }
                }; break;
                default:{
                    echo json_encode(array('resultCode'=>3, 'message'=>'При добавлении используется неизвестный тип транзакции'));
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
                        echo json_encode(array('resultCode'=>4, 'message'=>'Ошибка запроса данных с сервера'));
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
                echo json_encode(array('resultCode'=>5, 'message'=>'Поймано исключение: '+$e->getMessage()));
                exit;
            }
            
            if ($result)
            {
                echo json_encode(array('resultCode'=>0, 'message'=>'Операция выполнена успешно'));
            }
            else
            {
                echo json_encode(array('resultCode'=>6, 'message'=>'ОШИБКА СЕРВЕРА'));
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для обновления информации на сервере */
        case "PUT":{
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $userID = $_PUT['userID'];
            $transactionID = $_PUT['transactionID'];
            $typeTransaction = $_PUT['type'];
            $date = $_PUT['date'];
            $amountMoney = $_PUT['money'];
            $secondTypeAccountID = 'null';
            $secondAccountID = 'null';
            $payer = 'null';
            $categoryID = '1';
            $oldCommentID = $_PUT['commentid'];
            $comment = $_PUT['comment'];
            $isIncome = 'false';
            $isOutcome = 'false';
            $isTransfer = 'false';
            //$commentID = mysqli_query($connectDB, "insert into comments value (null, ");

            $oldTransaction = mysqli_query($connectDB, "select firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID, amountMoney from users_transaction where transactionID=$transactionID");
            $oldTransaction = mysqli_fetch_array($oldTransaction);

            switch ($typeTransaction){
                case 'outcome':{
                    $firstAccountID = $_PUT['account'];
                    $firstAccountID = explode(', ', $firstAccountID);
                    $firstTypeAccountID = $firstAccountID[0];
                    $firstAccountID = $firstAccountID[1];
                    $payer = $_PUT['payer'];
                    $categoryID = $_PUT['category'];
                    $amountMoney = $amountMoney * (-1);
                    $isOutcome = 'true';
                }; break;
                case 'income':{
                    $firstAccountID = $_PUT['account'];
                    $firstAccountID = explode(', ', $firstAccountID);
                    $firstTypeAccountID = $firstAccountID[0];
                    $firstAccountID = $firstAccountID[1];
                    $categoryID = $_PUT['category'];
                    $payer = $_PUT['payer'];
                    $isIncome = 'true';
                }; break;
                case 'transfer':{
                    $firstAccountID = $_PUT['firstAccount'];
                    $firstAccountID = explode(', ', $firstAccountID);
                    $firstTypeAccountID = $firstAccountID[0];
                    $firstAccountID = $firstAccountID[1];
                    $secondAccountID = $_PUT['secondAccount'];
                    $secondAccountID = explode(', ', $secondAccountID);
                    $secondTypeAccountID = $secondAccountID[0];
                    $secondAccountID = $secondAccountID[1];
                    $isTransfer = 'true';
                    if (($firstTypeAccountID == $secondTypeAccountID) && ($firstAccountID == $secondAccountID))
                    {
                        /* Обработка одинаковых счетов в переводе*/
                        echo json_encode(array('resultCode'=>2, 'message'=>'Использование одинаковых счетов для перевода средств'));
                        exit;
                    }
                }; break;
                default:{
                    echo json_encode(array('resultCode'=>3, 'message'=>'При добавлении используется неизвестный тип транзакции'));
                    exit;
                }
            }
            
            try
            {

                if ($oldCommentID != null)
                {
                    if ($comment != null)
                    {
                        $comment = mysqli_query($connectDB, "update comments set comment='$comment' where commentID=$oldCommentID and transactionID=$transactionID");
                        $commentID = $oldCommentID;
                    }
                    else
                    {
                        $comment = mysqli_query($connectDB, "delete from comments where commentID=$oldCommentID and transactionID=$transactionID");
                        if (!$comment)
                        {
                            echo 'ОШИБКА СЕРВЕРА';
                            exit;
                        }
                        $commentID = 'null';
                    }
                }
                else
                {
                    if ($comment != null)
                    {
                        $comment = mysqli_query($connectDB, "insert into comments value (null, $transactionID, '$comment')");
                        if ($comment)
                        {
                            $commentID = mysqli_query($connectDB, "select commentID from comments where transactionID=$transactionID");
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
                }

                $transaction = mysqli_query($connectDB, "update users_transaction set firstTypeAccountID=$firstTypeAccountID, firstAccountID=$firstAccountID, secondTypeAccountID=$secondTypeAccountID, secondAccountID=$secondAccountID, amountMoney=$amountMoney, categoryID=$categoryID, dateTransaction='$date', payer='$payer', commentID=$commentID where transactionID=$transactionID and userID=$userID");
                if ($transaction)
                {
                    $oldAmountMoney = $oldTransaction['amountMoney'];

                    if ($typeTransaction == 'income' || $typeTransaction == 'outcome')
                    {
                        if ($firstTypeAccountID == $oldTransaction['firstTypeAccountID'] && $firstAccountID == $oldTransaction['firstAccountID'])
                        {
                            $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                            $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                            $firstTypeAccountTableID = $firstTypeAccountTable[1];
                            $firstTypeAccountTable = $firstTypeAccountTable[0];
                            $result = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney+$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                        }
                        else
                        {
                            $oldFirstTypeAccountID = $oldTransaction['firstTypeAccountID'];
                            $oldFirstAccountID = $oldTransaction['firstAccountID']; 
                            $oldFirstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldFirstTypeAccountID");
                            $oldFirstTypeAccountTable = mysqli_fetch_array($oldFirstTypeAccountTable);
                            $oldFirstTypeAccountTableID = $oldFirstTypeAccountTable[1];
                            $oldFirstTypeAccountTable = $oldFirstTypeAccountTable[0];
                            $oldResult = mysqli_query($connectDB, "update $oldFirstTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney where $oldFirstTypeAccountTableID=$oldFirstAccountID");
                            if ($oldResult)
                            {
                                $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                $firstTypeAccountTable = $firstTypeAccountTable[0];
                                $result = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                            }
                        }
                    }
                    if ($typeTransaction == 'transfer')
                    {
                        if (($firstTypeAccountID == $oldTransaction['firstTypeAccountID'] && $firstAccountID == $oldTransaction['firstAccountID']) && ($secondTypeAccountID == $oldTransaction['secondTypeAccountID'] && $secondAccountID == $oldTransaction['secondAccountID']))
                        {
                            $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                            $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                            $firstTypeAccountTableID = $firstTypeAccountTable[1];
                            $firstTypeAccountTable = $firstTypeAccountTable[0];
                            $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                            $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                            $secondTypeAccountTableID = $secondTypeAccountTable[1];
                            $secondTypeAccountTable = $secondTypeAccountTable[0];
                            $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                            if ($firstResult)
                            {
                                $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");
                            }
                        }
                        else
                        {
                            if ($firstTypeAccountID == $oldTransaction['firstTypeAccountID'] && $firstAccountID == $oldTransaction['firstAccountID'])
                            {
                                $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                $firstTypeAccountTable = $firstTypeAccountTable[0];
                                $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                                if ($firstResult)
                                {
                                    $oldSecondTypeAccountID = $oldTransaction['secondTypeAccountID'];
                                    $oldSecondAccountID = $oldTransaction['secondAccountID']; 
                                    $oldSecondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldSecondTypeAccountID");
                                    $oldSecondTypeAccountTable = mysqli_fetch_array($oldSecondTypeAccountTable);
                                    $oldSecondTypeAccountTableID = $oldSecondTypeAccountTable[1];
                                    $oldSecondTypeAccountTable = $oldSecondTypeAccountTable[0];
                                    $oldResult = mysqli_query($connectDB, "update $oldSecondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney where $oldSecondTypeAccountTableID=$oldSecondAccountID");
                                    if ($oldResult)
                                    {
                                        $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                                        $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                                        $secondTypeAccountTableID = $secondTypeAccountTable[1];
                                        $secondTypeAccountTable = $secondTypeAccountTable[0];
                                        $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");
                                    }
                                }
                            }
                            else if ($secondTypeAccountID == $oldTransaction['secondTypeAccountID'] && $secondAccountID == $oldTransaction['secondAccountID'])
                            {
                                $oldFirstTypeAccountID = $oldTransaction['firstTypeAccountID'];
                                $oldFirstAccountID = $oldTransaction['firstAccountID']; 
                                $oldFirstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldFirstTypeAccountID");
                                $oldFirstTypeAccountTable = mysqli_fetch_array($oldFirstTypeAccountTable);
                                $oldFirstTypeAccountTableID = $oldFirstTypeAccountTable[1];
                                $oldFirstTypeAccountTable = $oldFirstTypeAccountTable[0];
                                $oldResult = mysqli_query($connectDB, "update $oldFirstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney where $oldFirstTypeAccountTableID=$oldFirstAccountID");
                                if ($oldResult)
                                {
                                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                                    $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                                    if ($firstResult)
                                    {
                                        $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                                        $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                                        $secondTypeAccountTableID = $secondTypeAccountTable[1];
                                        $secondTypeAccountTable = $secondTypeAccountTable[0];
                                        $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");
                                    }
                                }
                            }
                            else
                            {
                                $oldFirstTypeAccountID = $oldTransaction['firstTypeAccountID'];
                                $oldFirstAccountID = $oldTransaction['firstAccountID']; 
                                $oldFirstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldFirstTypeAccountID");
                                $oldFirstTypeAccountTable = mysqli_fetch_array($oldFirstTypeAccountTable);
                                $oldFirstTypeAccountTableID = $oldFirstTypeAccountTable[1];
                                $oldFirstTypeAccountTable = $oldFirstTypeAccountTable[0];
                                $oldFirstResult = mysqli_query($connectDB, "update $oldFirstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney where $oldFirstTypeAccountTableID=$oldFirstAccountID");
                                if ($oldFirstResult)
                                {
                                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                                    $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                                    if ($firstResult)
                                    {
                                        $oldSecondTypeAccountID = $oldTransaction['secondTypeAccountID'];
                                        $oldSecondAccountID = $oldTransaction['secondAccountID']; 
                                        $oldSecondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldSecondTypeAccountID");
                                        $oldSecondTypeAccountTable = mysqli_fetch_array($oldSecondTypeAccountTable);
                                        $oldSecondTypeAccountTableID = $oldSecondTypeAccountTable[1];
                                        $oldSecondTypeAccountTable = $oldSecondTypeAccountTable[0];
                                        $oldSecondResult = mysqli_query($connectDB, "update $oldSecondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney where $oldSecondTypeAccountTableID=$oldSecondAccountID");
                                        if ($oldSecondResult)
                                        {
                                            $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                                            $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                                            $secondTypeAccountTableID = $secondTypeAccountTable[1];
                                            $secondTypeAccountTable = $secondTypeAccountTable[0];
                                            $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
            catch (Exception $e) {
                echo json_encode(array('resultCode'=>4, 'message'=>'Поймано исключение: '+$e->getMessage()));
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для удаления информации на сервере */
        case "DELETE":{
            $_DELETE = json_decode(file_get_contents('php://input'), true);
            $transactionID = $_DELETE['transactionID'];
            $userID = $_DELETE['userID'];

            $transaction = mysqli_query($connectDB, 
                "select firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID, amountMoney, commentID, isIncome, isOutcome, isTransfer from users_transaction where transactionID=$transactionID and userID=$userID");
            $transaction = mysqli_fetch_array($transaction);
            $firstTypeAccountID = $transaction['firstTypeAccountID'];
            $firstAccountID = $transaction['firstAccountID'];
            $amountMoney = $transaction['amountMoney'];
            $commentID = $transaction['commentID'];
            $firstTypeAccountTable = mysqli_query($connectDB, 
                "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
            $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
            $firstTypeAccountTableID = $firstTypeAccountTable[1];
            $firstTypeAccountTable = $firstTypeAccountTable[0];
            if ($transaction['isIncome']||$transaction['isOutcome'])
            {
                $refund = mysqli_query($connectDB, 
                    "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
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
                echo json_encode(array('resultCode'=>0, 'message'=>'Операция выполнена успешно'));
            }
            else
            {
                echo json_encode(array('resultCode'=>2, 'message'=>'ОШИБКА СЕРВЕРА'));
                exit;
            }
        };
        break;


        
        default: {
            echo json_encode(array('resultCode'=>1, 'message'=>'Неизвестный метод запроса'));
        }
    }
?>