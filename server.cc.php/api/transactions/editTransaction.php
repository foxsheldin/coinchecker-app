<?php
    if (isset($_COOKIE['userID'])){
        include_once("configDB.php");
        $userID = $_COOKIE['userID'];
        $transactionID = $_POST['transactionID'];
        $typeTransaction = $_POST['type'];
        $date = $_POST['date'];
        $amountMoney = $_POST['money'];
        $secondTypeAccountID = 'null';
        $secondAccountID = 'null';
        $payer = 'null';
        $categoryID = '1';
        $oldCommentID = $_POST['commentid'];
        $comment = $_POST['comment'];
        $isIncome = 'false';
        $isOutcome = 'false';
        $isTransfer = 'false';
        //$commentID = mysqli_query($connectDB, "insert into comments value (null, ");

        $oldTransaction = mysqli_query($connectDB, "select firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID, amountMoney from users_transaction where transactionID=$transactionID");
        $oldTransaction = mysqli_fetch_array($oldTransaction);

        switch ($typeTransaction){
            case 'outcome':{
                $firstAccountID = $_POST['account'];
                $firstAccountID = explode(', ', $firstAccountID);
                $firstTypeAccountID = $firstAccountID[0];
                $firstAccountID = $firstAccountID[1];
                $payer = $_POST['payer'];
                $categoryID = $_POST['category'];
                $amountMoney = $amountMoney * (-1);
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
            echo 'Поймано исключение: ',  $e->getMessage(), "\n";
        }
        
        
        if ($result)
        {
            $redicet = "http://".$_SERVER['SERVER_NAME']."/system/transaction.php";
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