<?php
    if (isset($_COOKIE['userID'])){
        $typeAccount = $_GET['typeAccount'];
        $accountID = $_GET['accountID'];
        $userID = $_COOKIE['userID'];
        $nameAccount = $_GET['name'];
        $amountMoney = $_GET['amountMoney'];
        include_once("configDB.php");
        /* Если checkbox отключен, то он не появится в параметрах GET*/
        switch ($typeAccount)
        {
            case "cash":{
                /* $nameAccount = $_GET['nameCashAccount']; */
                /* $amountMoney = $_GET['amountMoney']; */
                $isSavingsAccount = 'false';
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                /*$result=mysqli_query($connectDB, "update users_cash set (NULL, $userID, '$nameAccount', $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");*/
                $result=mysqli_query($connectDB, "update users_cash set name='$nameAccount', amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCashID=$accountID");
            }; 
            break;
            case "card":{
                /* $nameAccount = $_GET['nameCardAccount']; */
                $bankName = $_GET['bankCardAccount'];
                $numAccount = $_GET['numCardAccount'];
                $creditLimit = $_GET['limitCardAccount'];
                /* $amountMoney = $_GET['amountMoney']; */
                $isArchive = $_GET['isArchive'];
                $isSavingsAccount = 'false';
                $isTotalBalance = 'true';
                $result=mysqli_query($connectDB, "update users_Card set name='$nameAccount', bankName='$bankName', creditLimit=$creditLimit, amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCardID=$accountID");
            }; 
            break;
            case "credit":{
                /* $nameAccount = $_GET['nameCreditAccount']; */
                $bankName = $_GET['bankCreditAccount'];
                $numAccount = $_GET['numCreditAccount'];
                /* $amountMoney = $_GET['amountMoney']; */
                $dateOfReceipt = $_GET['dateOfReceiptCreditAccount'];
                $creditPeriod = $_GET['creditPeriodCreditAccount'];
                //$typeCreditPeriod = $_GET['typeCreditPeriod'];
                $interestRate = $_GET['interestRateCreditAccount'];
                $paymentsCreditCardID = $_GET['payments'];
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                $result=mysqli_query($connectDB, "update users_Credit_Card set name='$nameAccount', bankName='$bankName', amountMoney=$amountMoney, dateOfReceipt='$dateOfReceipt', creditPeriod='$creditPeriod', interestRate=$interestRate, paymentsCreditCardID=$paymentsCreditCardID, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCreditCardID=$accountID");
            }; 
            break;
            case "bankAccount":{
                /* $nameAccount = $_GET['name']; */
                $bankName = $_GET['bankBankAccount'];
                $numAccount = $_GET['numBankAccount'];
                $creditLimit = $_GET['creditLimitBankAccount'];
                /* $amountMoney = $_GET['amountMoney']; */
                $isSavingsAccount = 'true';
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                /* isSavingAccount - пока что нет такого пункта*/
                $result=mysqli_query($connectDB, "update users_bank_account set name='$nameAccount', bankName='$bankName', creditLimit=$creditLimit, amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userBankAccountID=$accountID");
            }; 
            break;
            case "deposit":{
                /* $nameAccount = $_GET['nameDepositAccount']; */
                $bankName = $_GET['bankDepositAccount'];
                $numAccount = $_GET['numDepositAccount'];
                $openingDate = $_GET['dateOfReceiptDepositAccount'];
                /* $amountMoney = $_GET['amountMoney']; */
                $periodDeposit = $_GET['periodDepositAccount'];
                $interestRate = $_GET['interestRateDepositAccount'];
                if (isset($_GET['capitalizationDepositAccount']))
                    $capitalizationOfInterest = 'true';
                else
                    $capitalizationOfInterest = 'false';
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                if (isset($_GET['addTransactionDepositAccount']))
                    $addTransactionDepositAccount = true;
                else
                    $addTransactionDepositAccount = false;
                $result=mysqli_query($connectDB, "update users_deposit set name='$nameAccount', bankName='$bankName', openingDate='$openingDate', amountMoney=$amountMoney, periodDeposit='$periodDeposit', interestRate=$interestRate, capitalizationOfInterest=$capitalizationOfInterest, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userDepositID=$accountID");
            }; 
            break;
            default: {
                $redicet = "http://".$_SERVER['SERVER_NAME']."/system/accounts.php";
                header ("Location: $redicet");
            }
        }

        if ($result)
        {
            $redicet = "http://".$_SERVER['SERVER_NAME']."/system/accounts.php";
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