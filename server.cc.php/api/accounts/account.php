<?php
    include_once("../header.php");
    include_once("../configDB.php");

    switch ($_SERVER['REQUEST_METHOD']) {
        /* Этот метод запроса добавляет счет в базу данных */
        case "POST": {
            $_POST = json_decode(file_get_contents('php://input'), true);
            $typeAccount = $_POST['typeAccount'];
            $userID = $_POST['userID'];
            $nameAccount = $_POST['name'];
            include_once("configDB.php");
            /* Если checkbox отключен, то он не появится в параметрах GET*/
            switch ($typeAccount)
            {
                case "cash":{
                    $amountMoney = $_POST['amountMoney'];
                    $isSavingsAccount = 'false';
                    $isTotalBalance = 'true';
                    $isArchive = $_POST['isArchive'];
                    $result=mysqli_query($connectDB, "insert into users_cash value (NULL, $userID, '$nameAccount', $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
                }; 
                break;
                case "card":{
                    $bankName = $_POST['bankCardAccount'];
                    $numAccount = $_POST['numCardAccount'];
                    $creditLimit = $_POST['limitCardAccount'];
                    $amountMoney = $_POST['amountMoney'];
                    $isArchive = $_POST['isArchive'];
                    $isSavingsAccount = 'false';
                    $isTotalBalance = 'true';
                    $result=mysqli_query($connectDB, "insert into users_Card value (NULL, $userID, '$nameAccount', '$bankName', $creditLimit, $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
                }; 
                break;
                case "credit":{
                    $bankName = $_POST['bankCreditAccount'];
                    $numAccount = $_POST['numCreditAccount'];
                    $amountMoney = $_POST['amountMoney']*(-1);
                    $dateOfReceipt = $_POST['dateOfReceiptCreditAccount'];
                    $creditPeriod = $_POST['creditPeriodCreditAccount'];
                    //$typeCreditPeriod = $_POST['typeCreditPeriod'];
                    $interestRate = $_POST['interestRateCreditAccount'];
                    $paymentsCreditCardID = $_POST['payments'];
                    $isTotalBalance = 'true';
                    $isArchive = $_POST['isArchive'];
                    if (isset($_POST['addTransactionCreditAccount']))
                        $addTransactionCreditAccount = true;
                    else
                        $addTransactionCreditAccount = false;
                    $result=mysqli_query($connectDB, "insert into users_Credit_Card value (NULL, $userID, '$nameAccount', '$bankName', $amountMoney, '$dateOfReceipt', '$creditPeriod', $interestRate, $paymentsCreditCardID, $isTotalBalance, $isArchive)");
                }; 
                break;
                case "bankAccount":{
                    $bankName = $_POST['bankBankAccount'];
                    $numAccount = $_POST['numBankAccount'];
                    $creditLimit = $_POST['creditLimitBankAccount'];
                    $amountMoney = $_POST['amountMoney'];
                    $isSavingsAccount = 'true';
                    $isTotalBalance = 'true';
                    $isArchive = $_POST['isArchive'];
                    /* isSavingAccount - пока что нет такого пункта*/
                    $result=mysqli_query($connectDB, "insert into users_bank_account value (NULL, $userID, '$nameAccount', '$bankName', $creditLimit, $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
                }; 
                break;
                case "deposit":{
                    $bankName = $_POST['bankDepositAccount'];
                    $numAccount = $_POST['numDepositAccount'];
                    $openingDate = $_POST['dateOfReceiptDepositAccount'];
                    $amountMoney = $_POST['amountMoney'];
                    $periodDeposit = $_POST['periodDepositAccount'];
                    $interestRate = $_POST['interestRateDepositAccount'];
                    if (isset($_POST['capitalizationDepositAccount']))
                        $capitalizationOfInterest = 'true';
                    else
                        $capitalizationOfInterest = 'false';
                    $isTotalBalance = 'true';
                    $isArchive = $_POST['isArchive'];
                    if (isset($_POST['addTransactionDepositAccount']))
                        $addTransactionDepositAccount = true;
                    else
                        $addTransactionDepositAccount = false;
                    $result=mysqli_query($connectDB, "insert into users_deposit value (NULL, $userID, '$nameAccount', '$bankName', '$openingDate', $amountMoney, '$periodDeposit', $interestRate, $capitalizationOfInterest, $isTotalBalance, $isArchive)");
                }; 
                break;
                default: {
                    echo json_encode(array('resultCode'=>1, 'message'=>'При добавлении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                    exit;
                }
            }

            if ($result)
            {
                echo json_encode(array('resultCode'=>0, 'message'=>'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            }
            else
            {
                echo json_encode(array('resultCode'=>2, 'message'=>'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для обновления информации на сервере */
        case "PUT":{
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $typeAccount = $_PUT['typeAccount'];
            $accountID = $_PUT['accountID'];
            $userID = $_PUT['userID'];
            $nameAccount = $_PUT['name'];
            $amountMoney = $_PUT['amountMoney'];
            include_once("configDB.php");
            /* Если checkbox отключен, то он не появится в параметрах GET*/
            switch ($typeAccount)
            {
                case "cash":{
                    /* $nameAccount = $_PUT['nameCashAccount']; */
                    /* $amountMoney = $_PUT['amountMoney']; */
                    $isSavingsAccount = 'false';
                    $isTotalBalance = 'true';
                    $isArchive = $_PUT['isArchive'];
                    /*$result=mysqli_query($connectDB, "update users_cash set (NULL, $userID, '$nameAccount', $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");*/
                    $result=mysqli_query($connectDB, "update users_cash set name='$nameAccount', amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCashID=$accountID");
                }; 
                break;
                case "card":{
                    /* $nameAccount = $_PUT['nameCardAccount']; */
                    $bankName = $_PUT['bankCardAccount'];
                    $numAccount = $_PUT['numCardAccount'];
                    $creditLimit = $_PUT['limitCardAccount'];
                    /* $amountMoney = $_PUT['amountMoney']; */
                    $isArchive = $_PUT['isArchive'];
                    $isSavingsAccount = 'false';
                    $isTotalBalance = 'true';
                    $result=mysqli_query($connectDB, "update users_Card set name='$nameAccount', bankName='$bankName', creditLimit=$creditLimit, amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCardID=$accountID");
                }; 
                break;
                case "credit":{
                    /* $nameAccount = $_PUT['nameCreditAccount']; */
                    $bankName = $_PUT['bankCreditAccount'];
                    $numAccount = $_PUT['numCreditAccount'];
                    /* $amountMoney = $_PUT['amountMoney']; */
                    $dateOfReceipt = $_PUT['dateOfReceiptCreditAccount'];
                    $creditPeriod = $_PUT['creditPeriodCreditAccount'];
                    //$typeCreditPeriod = $_PUT['typeCreditPeriod'];
                    $interestRate = $_PUT['interestRateCreditAccount'];
                    $paymentsCreditCardID = $_PUT['payments'];
                    $isTotalBalance = 'true';
                    $isArchive = $_PUT['isArchive'];
                    $result=mysqli_query($connectDB, "update users_Credit_Card set name='$nameAccount', bankName='$bankName', amountMoney=$amountMoney, dateOfReceipt='$dateOfReceipt', creditPeriod='$creditPeriod', interestRate=$interestRate, paymentsCreditCardID=$paymentsCreditCardID, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCreditCardID=$accountID");
                }; 
                break;
                case "bankAccount":{
                    /* $nameAccount = $_PUT['name']; */
                    $bankName = $_PUT['bankBankAccount'];
                    $numAccount = $_PUT['numBankAccount'];
                    $creditLimit = $_PUT['creditLimitBankAccount'];
                    /* $amountMoney = $_PUT['amountMoney']; */
                    $isSavingsAccount = 'true';
                    $isTotalBalance = 'true';
                    $isArchive = $_PUT['isArchive'];
                    /* isSavingAccount - пока что нет такого пункта*/
                    $result=mysqli_query($connectDB, "update users_bank_account set name='$nameAccount', bankName='$bankName', creditLimit=$creditLimit, amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userBankAccountID=$accountID");
                }; 
                break;
                case "deposit":{
                    /* $nameAccount = $_PUT['nameDepositAccount']; */
                    $bankName = $_PUT['bankDepositAccount'];
                    $numAccount = $_PUT['numDepositAccount'];
                    $openingDate = $_PUT['dateOfReceiptDepositAccount'];
                    /* $amountMoney = $_PUT['amountMoney']; */
                    $periodDeposit = $_PUT['periodDepositAccount'];
                    $interestRate = $_PUT['interestRateDepositAccount'];
                    if (isset($_PUT['capitalizationDepositAccount']))
                        $capitalizationOfInterest = 'true';
                    else
                        $capitalizationOfInterest = 'false';
                    $isTotalBalance = 'true';
                    $isArchive = $_PUT['isArchive'];
                    if (isset($_PUT['addTransactionDepositAccount']))
                        $addTransactionDepositAccount = true;
                    else
                        $addTransactionDepositAccount = false;
                    $result=mysqli_query($connectDB, "update users_deposit set name='$nameAccount', bankName='$bankName', openingDate='$openingDate', amountMoney=$amountMoney, periodDeposit='$periodDeposit', interestRate=$interestRate, capitalizationOfInterest=$capitalizationOfInterest, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userDepositID=$accountID");
                }; 
                break;
                default: {
                    echo json_encode(array('resultCode'=>1, 'message'=>'При изменении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                    exit;
                }
            }

            if ($result)
            {
                echo json_encode(array('resultCode'=>0, 'message'=>'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            }
            else
            {
                echo json_encode(array('resultCode'=>2, 'message'=>'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для удаления информации на сервере */
        case "DELETE":{
            $_DELETE = json_decode(file_get_contents('php://input'), true);
            $typeAccount = $_DELETE['type'];
            $accountID = $_DELETE['deleteid'];
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
                    echo json_encode(array('resultCode'=>1, 'message'=>'При удалении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                    exit;
                }
            }

            if ($result)
            {
                echo json_encode(array('resultCode'=>0, 'message'=>'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            }
            else
            {
                echo json_encode(array('resultCode'=>2, 'message'=>'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


        
        default: {
            echo json_encode(array('resultCode'=>1, 'message'=>'Неизвестный метод запроса'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        }
    }
?>