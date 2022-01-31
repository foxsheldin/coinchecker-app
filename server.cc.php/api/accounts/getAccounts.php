<?php
    include_once('../header.php');
    include_once('../configDB.php');
    $userid=$_GET['userID'];
    $cashData=array();
    $cardData=array();
    $creditData=array();
    $bankAccountData=array();
    $depositData=array();
    $sumArr=array();

    $result=mysqli_query($connectDB, 
        "select userCashID, name, amountMoney from users_cash where userID=".$userid);
    if (mysqli_num_rows($result)){
        while ($row=mysqli_fetch_array($result)){
            $arr = array('id'=>$row['userCashID'], 'name'=>$row['name'], 'amountMoney'=>$row['amountMoney'], 'typeAccount'=>'cash');
            array_push($cashData,$arr);
        }
    } 

    $result=mysqli_query($connectDB, 
        "select userCardID, name, amountMoney from users_card where userID=".$userid);
    if (mysqli_num_rows($result)){
        while ($row=mysqli_fetch_array($result)){
            $arr = array('id'=>$row['userCardID'], 'name'=>$row['name'], 'amountMoney'=>$row['amountMoney'], 'typeAccount'=>'card');
            array_push($cardData,$arr);
        }
    } 
    $result=mysqli_query($connectDB, 
        "select userCreditCardID, name, amountMoney from users_credit_card where userID=".$userid);
    if (mysqli_num_rows($result)){
        while ($row=mysqli_fetch_array($result)){
            $arr = array('id'=>$row['userCreditCardID'], 'name'=>$row['name'], 'amountMoney'=>$row['amountMoney'], 'typeAccount'=>'creditCard');
            array_push($creditData,$arr);
        }
    } 
    $result=mysqli_query($connectDB, 
        "select userBankAccountID, name, amountMoney from users_bank_account where userID=".$userid);
    if (mysqli_num_rows($result)){
        while ($row=mysqli_fetch_array($result)){
            $arr = array('id'=>$row['userBankAccountID'], 'name'=>$row['name'], 'amountMoney'=>$row['amountMoney'], 'typeAccount'=>'bankAccount');
            array_push($bankAccountData,$arr);
        }
    } 
    $result=mysqli_query($connectDB, 
        "select userDepositID, name, amountMoney from users_deposit where userID=".$userid);
    if (mysqli_num_rows($result)){
        while ($row=mysqli_fetch_array($result)){
            $arr = array('id'=>$row['userDepositID'], 'name'=>$row['name'], 'amountMoney'=>$row['amountMoney'], 'typeAccount'=>'deposit');
            array_push($depositData,$arr);
        }
    } 

    $sumArr = array('cashData'=>$cashData,'cardData'=>$cardData,'creditData'=>$creditData,
        'bankAccountData'=>$bankAccountData,'depositData'=>$depositData);
    $sumArr = array('accountsInfo'=>$sumArr, 'resultCode'=>0);
    echo json_encode($sumArr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
?>