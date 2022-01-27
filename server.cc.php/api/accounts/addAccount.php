<?php
    if (isset($_COOKIE['userID'])){
        $typeAccount = $_GET['typeAccount'];
        $userID = $_COOKIE['userID'];
        $nameAccount = $_GET['name'];
        include_once("configDB.php");
        /* Если checkbox отключен, то он не появится в параметрах GET*/
        switch ($typeAccount)
        {
            case "cash":{
                $amountMoney = $_GET['amountMoney'];
                $isSavingsAccount = 'false';
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                $result=mysqli_query($connectDB, "insert into users_cash value (NULL, $userID, '$nameAccount', $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
            }; 
            break;
            case "card":{
                $bankName = $_GET['bankCardAccount'];
                $numAccount = $_GET['numCardAccount'];
                $creditLimit = $_GET['limitCardAccount'];
                $amountMoney = $_GET['amountMoney'];
                $isArchive = $_GET['isArchive'];
                $isSavingsAccount = 'false';
                $isTotalBalance = 'true';
                $result=mysqli_query($connectDB, "insert into users_Card value (NULL, $userID, '$nameAccount', '$bankName', $creditLimit, $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
            }; 
            break;
            case "credit":{
                $bankName = $_GET['bankCreditAccount'];
                $numAccount = $_GET['numCreditAccount'];
                $amountMoney = $_GET['amountMoney']*(-1);
                $dateOfReceipt = $_GET['dateOfReceiptCreditAccount'];
                $creditPeriod = $_GET['creditPeriodCreditAccount'];
                //$typeCreditPeriod = $_GET['typeCreditPeriod'];
                $interestRate = $_GET['interestRateCreditAccount'];
                $paymentsCreditCardID = $_GET['payments'];
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                if (isset($_GET['addTransactionCreditAccount']))
                    $addTransactionCreditAccount = true;
                else
                    $addTransactionCreditAccount = false;
                $result=mysqli_query($connectDB, "insert into users_Credit_Card value (NULL, $userID, '$nameAccount', '$bankName', $amountMoney, '$dateOfReceipt', '$creditPeriod', $interestRate, $paymentsCreditCardID, $isTotalBalance, $isArchive)");
            }; 
            break;
            case "bankAccount":{
                $bankName = $_GET['bankBankAccount'];
                $numAccount = $_GET['numBankAccount'];
                $creditLimit = $_GET['creditLimitBankAccount'];
                $amountMoney = $_GET['amountMoney'];
                $isSavingsAccount = 'true';
                $isTotalBalance = 'true';
                $isArchive = $_GET['isArchive'];
                /* isSavingAccount - пока что нет такого пункта*/
                $result=mysqli_query($connectDB, "insert into users_bank_account value (NULL, $userID, '$nameAccount', '$bankName', $creditLimit, $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
            }; 
            break;
            case "deposit":{
                $bankName = $_GET['bankDepositAccount'];
                $numAccount = $_GET['numDepositAccount'];
                $openingDate = $_GET['dateOfReceiptDepositAccount'];
                $amountMoney = $_GET['amountMoney'];
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
                $result=mysqli_query($connectDB, "insert into users_deposit value (NULL, $userID, '$nameAccount', '$bankName', '$openingDate', $amountMoney, '$periodDeposit', $interestRate, $capitalizationOfInterest, $isTotalBalance, $isArchive)");
            }; 
            break;
            default: {
                $redicet = $_SERVER['HTTP_REFERER'];
                header ("Location: $redicet");
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