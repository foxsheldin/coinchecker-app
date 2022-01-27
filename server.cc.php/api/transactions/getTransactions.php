<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    $userID = $_GET['userID'];
    $page = $_GET['page']-1;
    // количество записей, выводимых на странице
    $count = $_GET['count'];

    $start = abs($page*$count);
    
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    include_once("../configDB.php");

    $totalCount = mysqli_query($connectDB, "select count(*) from users_transaction where userID=".$userID);
    $totalCount = mysqli_fetch_row($totalCount);

    $query = "select transactionID, userID, firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID,
     amountMoney, categoryID, dateTransaction, payer, commentID, repeatOperation, repeatTransactionID, isIncome, isOutcome, isTransfer
     from users_transaction where userID=".$userID." order by dateTransaction desc LIMIT $start, $count";
    $result=mysqli_query($connectDB, $query);

    if (mysqli_num_rows($result)) {
        $sumArr=array();
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
                    $account1=array('!Неизвестный счет!');
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
                        $account2=array('!Неизвестный счет!');
                    }
                }
            }
            if ($row['isOutcome']==="1") {
                $amountMoney=abs($row['amountMoney']);
            }
            else {
                $amountMoney=$row['amountMoney'];
            }

            $arr = array('transactionID'=>$row['transactionID'], 'userID'=>$row['userID'], 
            'firstTypeAccountID'=>$row['firstTypeAccountID'], 'firstAccountID'=>$row['firstAccountID'],
             'secondTypeAccountID'=>$row['secondTypeAccountID'], 'secondAccountID'=>$row['secondAccountID'],
             'amountMoney'=>$amountMoney, 'categoryID'=>$row['categoryID'], 'dateTransaction'=>$row['dateTransaction'], 'payer'=>$row['payer'],
              'commentID'=>$row['commentID'], 'repeatOperation'=>$row['repeatOperation'], 'repeatTransactionID'=>$row['repeatTransactionID'],
               'isIncome'=>$row['isIncome'], 'isOutcome'=>$row['isOutcome'], 'isTransfer'=>$row['isTransfer'], 
               'date'=>$date, 'nameCategory'=>$nameCategory, 'nameAccount1'=>$account1, 'nameAccount2'=>$account2, 'comment'=>$comment);
            /* $arr = array('array'=>$row, 'date'=>$date, 'nameCategory'=>$nameCategory, 
            'nameAccount1'=>$account1, 'nameAccount2'=>$account2, 'comment'=>$comment); */
            array_push($sumArr,$arr);
        }
        echo json_encode(array("items"=>$sumArr, "totalCount"=>$totalCount, "resultCode"=>0));
    }
?>