<?php
include_once("../header.php");
include_once("../configDB.php");

switch ($_SERVER['REQUEST_METHOD']) {
        /* Этот метод запроса получает счет из базы данных */
    case "GET": {
            $changeid = $_GET['changeID'];
            $userid = $_GET['userID'];
            switch ($_GET['typeAccount']) {
                case 'cash': {
                        $result = mysqli_query($connectDB, "select name, amountMoney, isSavingsAccount, isTotalBalance, isArchive from users_cash 
                        where userCashID=$changeid and userID=" . $userid);
                        $result = mysqli_fetch_array($result);

                        $arr = array(
                            'name' => $result['name'], 'amountMoney' => $result['amountMoney'], 'isSavingsAccount' => $result['isSavingsAccount'],
                            'isTotalBalance' => $result['isTotalBalance'], 'isArchive' => $result['isArchive']
                        );
                        echo json_encode(array('accountData' => $arr, 'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    };
                    break;

                case 'card': {
                        $result = mysqli_query($connectDB, "select name, bankName, 
                            isGracePeriod, dateBankStatement, countDaysGracePeriod, limitOverspendingCardAccount, 
                            countDaysOverspendingCardAccount, startDateGracePeriod, dateNotification, endDateGracePeriod, 
                            creditLimit, amountMoney, isSavingsAccount, isTotalBalance, isArchive from users_Card
                            where userCardID=$changeid and userID=" . $userid);
                        $result = mysqli_fetch_array($result);

                        $isGracePeriod = $result['isGracePeriod'];
                        $dateBankStatement = $result['dateBankStatement'];
                        $countDaysGracePeriod = $result['countDaysGracePeriod'];
                        $limitOverspendingCardAccount = $result['limitOverspendingCardAccount'];
                        $countDaysOverspendingCardAccount = $result['countDaysOverspendingCardAccount'];
                        $startDateGracePeriod = $result['startDateGracePeriod'];
                        $dateNotification = $result['dateNotification'];
                        $endDateGracePeriod = $result['endDateGracePeriod'];

                        $arr = array(
                            'name' => $result['name'], 'bankName' => $result['bankName'],
                            'isGracePeriod' => $isGracePeriod, 'dateBankStatement' => $dateBankStatement,
                            'countDaysGracePeriod' => $countDaysGracePeriod, 'limitOverspendingCardAccount' => $limitOverspendingCardAccount,
                            'countDaysOverspendingCardAccount' => $countDaysOverspendingCardAccount,
                            'startDateGracePeriod' => $startDateGracePeriod,
                            'dateNotification' => $dateNotification,
                            'endDateGracePeriod' => $endDateGracePeriod,
                            'creditLimit' => $result['creditLimit'], 'amountMoney' => $result['amountMoney'],
                            'isSavingsAccount' => $result['isSavingsAccount'], 'isTotalBalance' => $result['isTotalBalance'], 'isArchive' => $result['isArchive']
                        );
                        echo json_encode(array('accountData' => $arr, 'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    };
                    break;

                case 'creditCard': {
                        $result = mysqli_query($connectDB, "select name, bankName, amountMoney, dateOfReceipt, creditPeriod, interestRate, paymentsCreditCardID, isTotalBalance, isArchive 
                        from users_Credit_Card where userCreditCardID=$changeid and userID=" . $userid);
                        $result = mysqli_fetch_array($result);

                        $arr = array(
                            'name' => $result['name'], 'bankName' => $result['bankName'], 'amountMoney' => $result['amountMoney'], 'dateOfReceipt' => $result['dateOfReceipt'],
                            'creditPeriod' => $result['creditPeriod'], 'interestRate' => $result['interestRate'], 'paymentsCreditCardID' => $result['paymentsCreditCardID'],
                            'isTotalBalance' => $result['isTotalBalance'], 'isArchive' => $result['isArchive']
                        );
                        echo json_encode(array('accountData' => $arr, 'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    };
                    break;

                case 'bankAccount': {
                        $result = mysqli_query($connectDB, "select name, bankName, creditLimit, amountMoney, isSavingsAccount, isTotalBalance, isArchive from users_bank_account 
                        where userBankAccountID=$changeid and userID=" . $userid);
                        $result = mysqli_fetch_array($result);

                        $arr = array(
                            'name' => $result['name'], 'bankName' => $result['bankName'], 'creditLimit' => $result['creditLimit'], 'amountMoney' => $result['amountMoney'],
                            'isSavingsAccount' => $result['isSavingsAccount'], 'isTotalBalance' => $result['isTotalBalance'], 'isArchive' => $result['isArchive']
                        );
                        echo json_encode(array('accountData' => $arr, 'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    };
                    break;

                case 'deposit': {
                        $result = mysqli_query($connectDB, "select name, bankName, openingDate, amountMoney, periodDeposit, interestRate, capitalizationOfInterest, isTotalBalance, isArchive 
                        from users_deposit where userDepositID=$changeid and userID=" . $userid);
                        $result = mysqli_fetch_array($result);

                        $arr = array(
                            'name' => $result['name'], 'bankName' => $result['bankName'], 'openingDate' => $result['openingDate'], 'amountMoney' => $result['amountMoney'],
                            'periodDeposit' => $result['periodDeposit'], 'interestRate' => $result['interestRate'], 'capitalizationOfInterest' => $result['capitalizationOfInterest'],
                            'isTotalBalance' => $result['isTotalBalance'], 'isArchive' => $result['isArchive']
                        );
                        echo json_encode(array('accountData' => $arr, 'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    };
                    break;

                default: {
                        echo json_encode(array('message' => 'Неизвестный тип счета', 'resultCode' => 1), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                    }
            }
        };
        break;

        /* Этот метод запроса добавляет счет в базу данных */
    case "POST": {
            $_POST = json_decode(file_get_contents('php://input'), true);
            /* print_r($_POST); */
            $typeAccount = $_POST['data']['typeAccount'];
            $userID = $_POST['userid'];
            $nameAccount = $_POST['data']['name'];

            switch ($typeAccount) {
                case "cash": {
                        $amountMoney = $_POST['data']['amountMoney'];
                        $isSavingsAccount = 'false';
                        $isTotalBalance = 'true';
                        $isArchive = $_POST['data']['isArchive'];
                        $result = mysqli_query($connectDB, "insert into users_cash value (NULL, $userID, '$nameAccount', $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
                    };
                    break;
                case "card": {
                        $bankName = $_POST['data']['bankName'];
                        $numAccount = $_POST['data']['numCardAccount'];
                        $creditLimit = $_POST['data']['creditLimit'];
                        $amountMoney = $_POST['data']['amountMoney'];
                        /* Данные для грейс-периода */
                        $isGracePeriod = isset($_POST['data']['isGracePeriod']) ? $_POST['data']['isGracePeriod'] : 'false';
                        if ($isGracePeriod) {
                            $dateBankStatement = isset($_POST['data']['dateBankStatement']) ? $_POST['data']['dateBankStatement'] : 'NULL';
                            $countDaysGracePeriod = isset($_POST['data']['countDaysGracePeriod']) ? $_POST['data']['countDaysGracePeriod'] : 'NULL';
                            $limitOverspendingCardAccount = isset($_POST['data']['limitOverspendingCardAccount']) ? $_POST['data']['limitOverspendingCardAccount'] : 'NULL';
                            $countDaysOverspendingCardAccount = isset($_POST['data']['countDaysOverspendingCardAccount']) ? $_POST['data']['countDaysOverspendingCardAccount'] : 'NULL';
                            $startDateGracePeriod = isset($_POST['data']['startDateGracePeriod']) ? $_POST['data']['startDateGracePeriod'] : 'NULL';
                            $dateNotification = isset($_POST['data']['dateNotification']) ? $_POST['data']['dateNotification'] : 'NULL';
                            $endDateGracePeriod = isset($_POST['data']['endDateGracePeriod']) ? $_POST['data']['endDateGracePeriod'] : 'NULL';
                        } else {
                            $dateBankStatement = 'NULL';
                            $countDaysGracePeriod = 'NULL';
                            $limitOverspendingCardAccount = 'NULL';
                            $countDaysOverspendingCardAccount = 'NULL';
                            $startDateGracePeriod = 'NULL';
                            $dateNotification = 'NULL';
                            $endDateGracePeriod = 'NULL';
                        }

                        /* ------------------------ */
                        $isArchive = $_POST['data']['isArchive'];
                        $isSavingsAccount = 'false';
                        $isTotalBalance = 'true';
                        $result = mysqli_query(
                            $connectDB,
                            "insert into users_Card value (NULL, $userID, '$nameAccount', '$bankName', 
                                $isGracePeriod, $dateBankStatement, $countDaysGracePeriod, $limitOverspendingCardAccount, 
                                $countDaysOverspendingCardAccount, $startDateGracePeriod, $dateNotification, $endDateGracePeriod,
                                $creditLimit, $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)"
                        );
                    };
                    break;
                case "creditCard": {
                        $bankName = $_POST['data']['bankName'];
                        $numAccount = $_POST['data']['numCardAccount'];
                        $amountMoney = $_POST['data']['amountMoney'] * (-1);
                        $dateOfReceipt = $_POST['data']['dateOfReceipt'];
                        $creditPeriod = $_POST['data']['creditPeriod'];
                        //$typeCreditPeriod = $_POST['data']['typeCreditPeriod'];
                        $interestRate = $_POST['data']['interestRate'];
                        $paymentsCreditCardID = $_POST['data']['paymentsCreditCardID'];
                        $isTotalBalance = 'true';
                        $isArchive = $_POST['data']['isArchive'];
                        if (isset($_POST['data']['addTransaction']))
                            $addTransactionCreditAccount = true;
                        else
                            $addTransactionCreditAccount = false;
                        $result = mysqli_query($connectDB, "insert into users_Credit_Card value (NULL, $userID, '$nameAccount', '$bankName', $amountMoney, '$dateOfReceipt', '$creditPeriod', $interestRate, $paymentsCreditCardID, $isTotalBalance, $isArchive)");
                    };
                    break;
                case "bankAccount": {
                        $bankName = $_POST['data']['bankName'];
                        $numAccount = $_POST['data']['numCardAccount'];
                        $creditLimit = $_POST['data']['creditLimit'];
                        $amountMoney = $_POST['data']['amountMoney'];
                        $isSavingsAccount = 'true';
                        $isTotalBalance = 'true';
                        $isArchive = $_POST['data']['isArchive'];
                        /* isSavingAccount - пока что нет такого пункта*/
                        $result = mysqli_query($connectDB, "insert into users_bank_account value (NULL, $userID, '$nameAccount', '$bankName', $creditLimit, $amountMoney, $isSavingsAccount, $isTotalBalance, $isArchive)");
                    };
                    break;
                case "deposit": {
                        $bankName = $_POST['data']['bankName'];
                        $numAccount = $_POST['data']['numCardAccount'];
                        $openingDate = $_POST['data']['openingDate'];
                        $amountMoney = $_POST['data']['amountMoney'];
                        $periodDeposit = $_POST['data']['periodDeposit'];
                        $interestRate = $_POST['data']['interestRate'];
                        if (isset($_POST['data']['capitalizationOfInterest']))
                            $capitalizationOfInterest = 'true';
                        else
                            $capitalizationOfInterest = 'false';
                        $isTotalBalance = 'true';
                        $isArchive = $_POST['data']['isArchive'];
                        if (isset($_POST['data']['addTransaction']))
                            $addTransactionDepositAccount = true;
                        else
                            $addTransactionDepositAccount = false;
                        $result = mysqli_query($connectDB, "insert into users_deposit value (NULL, $userID, '$nameAccount', '$bankName', '$openingDate', $amountMoney, '$periodDeposit', $interestRate, $capitalizationOfInterest, $isTotalBalance, $isArchive)");
                    };
                    break;
                default: {
                        echo json_encode(array('resultCode' => 1, 'message' => 'При добавлении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }

            if ($result) {
                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(array('resultCode' => 2, 'message' => 'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для обновления информации на сервере */
    case "PUT": {
            $_PUT = json_decode(file_get_contents('php://input'), true);
            print_r($_PUT);
            $typeAccount = $_PUT['typeAccount'];
            $userID = $_PUT['userid'];
            $accountID = $_PUT['accountID'];
            $nameAccount = $_PUT['data']['name'];
            $amountMoney = $_PUT['data']['amountMoney'];

            /* Если checkbox отключен, то он не появится в параметрах GET*/
            switch ($typeAccount) {
                case "cash": {
                        $isSavingsAccount = 'false';
                        $isTotalBalance = 'true';
                        $isArchive = $_PUT['data']['isArchive'];
                        $result = mysqli_query($connectDB, "update users_cash set name='$nameAccount', amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCashID=$accountID");
                    };
                    break;
                case "card": {
                        $bankName = $_PUT['data']['bankName'];
                        /* $numAccount = $_PUT['data']['numCardAccount']; */
                        /* Данные для грейс-периода */
                        $isGracePeriod = isset($_PUT['data']['isGracePeriod']) ? $_PUT['data']['isGracePeriod'] : 'false';
                        if ($isGracePeriod) {
                            $dateBankStatement = isset($_PUT['data']['dateBankStatement']) ? $_PUT['data']['dateBankStatement'] : 'NULL';
                            $countDaysGracePeriod = isset($_PUT['data']['countDaysGracePeriod']) ? $_PUT['data']['countDaysGracePeriod'] : 'NULL';
                            $limitOverspendingCardAccount = isset($_PUT['data']['limitOverspendingCardAccount']) ? $_PUT['data']['limitOverspendingCardAccount'] : 'NULL';
                            $countDaysOverspendingCardAccount = isset($_PUT['data']['countDaysOverspendingCardAccount']) ? $_PUT['data']['countDaysOverspendingCardAccount'] : 'NULL';
                            if (isset($_PUT['data']['startDateGracePeriod'])) {
                                $startDateGracePeriod = $_PUT['data']['startDateGracePeriod'];
                                $tempDate = date_create($startDateGracePeriod);
                                if (floatval(date_format($tempDate, "d")) >= $dateBankStatement) {
                                    $tempDateBankStatement = date(
                                        'Y-m-d',
                                        mktime(
                                            0,
                                            0,
                                            0,
                                            date_format($tempDate, "m"),
                                            $dateBankStatement,
                                            date_format($tempDate, "Y")
                                        )
                                    );
                                } else {
                                    $tempDateBankStatement = date(
                                        'Y-m-d',
                                        mktime(
                                            0,
                                            0,
                                            0,
                                            date_format($tempDate, "m") - 1,
                                            $dateBankStatement,
                                            date_format($tempDate, "Y")
                                        )
                                    );
                                }

                                $diffDays = round((strtotime($startDateGracePeriod) - strtotime($tempDateBankStatement)) / (60 * 60 * 24));
                                $countDiffDaysGracePeriod = $countDaysGracePeriod - floatval($diffDays);
                                $countDiffDaysOverspendingCardAccount = 0;

                                $dateNotification = date_create($startDateGracePeriod);
                                if ($countDaysOverspendingCardAccount == 'NULL' || $countDaysOverspendingCardAccount <= 0) {
                                    date_modify($dateNotification, "$countDiffDaysGracePeriod day");
                                } else {
                                    $countDiffDaysOverspendingCardAccount = $countDaysOverspendingCardAccount - $diffDays;
                                    date_modify($dateNotification, "$countDiffDaysOverspendingCardAccount day");
                                }

                                $endDateGracePeriod = $tempDate;
                                date_modify($endDateGracePeriod, "$countDiffDaysGracePeriod day");

                                $dateNotification = date_format($dateNotification, 'Y-m-d');
                                $endDateGracePeriod = date_format($endDateGracePeriod, 'Y-m-d');
                            } else {
                                $startDateGracePeriod = 'NULL';
                                $dateNotification = 'NULL';
                                $endDateGracePeriod = 'NULL';
                            }
                        } else {
                            $dateBankStatement = 'NULL';
                            $countDaysGracePeriod = 'NULL';
                            $limitOverspendingCardAccount = 'NULL';
                            $countDaysOverspendingCardAccount = 'NULL';
                            $startDateGracePeriod = 'NULL';
                            $dateNotification = 'NULL';
                            $endDateGracePeriod = 'NULL';
                        }
                        /* ------------------------ */
                        $creditLimit = $_PUT['data']['creditLimit'];
                        $isArchive = $_PUT['data']['isArchive'];
                        $isSavingsAccount = 'false';
                        $isTotalBalance = 'true';
                        $result = mysqli_query($connectDB, "update users_Card set name='$nameAccount', bankName='$bankName',
                            isGracePeriod=$isGracePeriod, dateBankStatement=$dateBankStatement, countDaysGracePeriod=$countDaysGracePeriod,
                            limitOverspendingCardAccount=$limitOverspendingCardAccount, countDaysOverspendingCardAccount=$countDaysOverspendingCardAccount, 
                            startDateGracePeriod=$startDateGracePeriod, dateNotification=$dateNotification, endDateGracePeriod=$endDateGracePeriod, 
                            creditLimit=$creditLimit, amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCardID=$accountID");
                    };
                    break;
                case "creditCard": {
                        $bankName = $_PUT['data']['bankName'];
                        /* $numAccount = $_PUT['data']['numCreditAccount']; */
                        $dateOfReceipt = $_PUT['data']['dateOfReceipt'];
                        $creditPeriod = $_PUT['data']['creditPeriod'];
                        //$typeCreditPeriod = $_PUT['data']['typeCreditPeriod'];
                        $interestRate = $_PUT['data']['interestRate'];
                        $paymentsCreditCardID = $_PUT['data']['paymentsCreditCardID'];
                        $isTotalBalance = 'true';
                        $isArchive = $_PUT['data']['isArchive'];
                        $result = mysqli_query($connectDB, "update users_Credit_Card set name='$nameAccount', bankName='$bankName', amountMoney=$amountMoney, dateOfReceipt='$dateOfReceipt', creditPeriod='$creditPeriod', interestRate=$interestRate, paymentsCreditCardID=$paymentsCreditCardID, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userCreditCardID=$accountID");
                    };
                    break;
                case "bankAccount": {
                        $bankName = $_PUT['data']['bankName'];
                        /* $numAccount = $_PUT['data']['numBankAccount']; */
                        $creditLimit = $_PUT['data']['creditLimit'];
                        $isSavingsAccount = 'true';
                        $isTotalBalance = 'true';
                        $isArchive = $_PUT['data']['isArchive'];
                        /* isSavingAccount - пока что нет такого пункта*/
                        $result = mysqli_query($connectDB, "update users_bank_account set name='$nameAccount', bankName='$bankName', creditLimit=$creditLimit, amountMoney=$amountMoney, isSavingsAccount=$isSavingsAccount, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userBankAccountID=$accountID");
                    };
                    break;
                case "deposit": {
                        $bankName = $_PUT['data']['bankName'];
                        /* $numAccount = $_PUT['data']['numDepositAccount']; */
                        $openingDate = $_PUT['data']['openingDate'];
                        $periodDeposit = $_PUT['data']['periodDeposit'];
                        $interestRate = $_PUT['data']['interestRate'];
                        if ($_PUT['data']['capitalizationOfInterest'] == 1)
                            $capitalizationOfInterest = 'true';
                        else
                            $capitalizationOfInterest = 'false';
                        $isTotalBalance = 'true';
                        $isArchive = $_PUT['data']['isArchive'];
                        /* if (isset($_PUT['data']['addTransactionDepositAccount']))
                        $addTransactionDepositAccount = true;
                    else
                        $addTransactionDepositAccount = false; */
                        $result = mysqli_query($connectDB, "update users_deposit set name='$nameAccount', bankName='$bankName', openingDate='$openingDate', amountMoney=$amountMoney, periodDeposit='$periodDeposit', interestRate=$interestRate, capitalizationOfInterest=$capitalizationOfInterest, isTotalBalance=$isTotalBalance, isArchive=$isArchive where userDepositID=$accountID");
                    };
                    break;
                default: {
                        echo json_encode(array('resultCode' => 1, 'message' => 'При изменении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }

            if ($result) {
                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(array('resultCode' => 2, 'message' => 'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для удаления информации на сервере */
    case "DELETE": {
            $typeAccount = $_GET['typeAccount'];
            $accountID = $_GET['accountID'];
            $userID = $_GET['userID'];

            switch ($typeAccount) {
                case "cash": {
                        $deleteAcc = mysqli_query($connectDB, "delete from users_cash where userCashID=$accountID and userID=$userID");
                        $result = mysqli_query($connectDB, "delete from users_transaction where ((firstTypeAccountID=1 and firstAccountID=$accountID) or (secondTypeAccountID=1 and secondAccountID=$accountID)) and userID=$userID");
                    };
                    break;
                case "card": {
                        $deleteAcc = mysqli_query($connectDB, "delete from users_Card where userCardID=$accountID and userID=$userID");
                        $result = mysqli_query($connectDB, "delete from users_transaction where ((firstTypeAccountID=2 and firstAccountID=$accountID) or (secondTypeAccountID=2 and secondAccountID=$accountID)) and userID=$userID");
                    };
                    break;
                case "creditCard": {
                        $deleteAcc = mysqli_query($connectDB, "delete from users_Credit_Card where userCreditCardID=$accountID and userID=$userID");
                        $result = mysqli_query($connectDB, "delete from users_transaction where ((firstTypeAccountID=3 and firstAccountID=$accountID) or (secondTypeAccountID=3 and secondAccountID=$accountID)) and userID=$userID");
                    };
                    break;
                case "bankAccount": {
                        $deleteAcc = mysqli_query($connectDB, "delete from users_bank_account where userBankAccountID=$accountID and userID=$userID");
                        $result = mysqli_query($connectDB, "delete from users_transaction where ((firstTypeAccountID=4 and firstAccountID=$accountID) or (secondTypeAccountID=4 and secondAccountID=$accountID)) and userID=$userID");
                    };
                    break;
                case "deposit": {
                        $deleteAcc = mysqli_query($connectDB, "delete from users_deposit where userDepositID=$accountID and userID=$userID");
                        $result = mysqli_query($connectDB, "delete from users_transaction where ((firstTypeAccountID=5 and firstAccountID=$accountID) or (secondTypeAccountID=5 and secondAccountID=$accountID)) and userID=$userID");
                    };
                    break;
                default: {
                        echo json_encode(array('resultCode' => 1, 'message' => 'При удалении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }

            if ($result) {
                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(array('resultCode' => 2, 'message' => 'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


    default: {
            echo json_encode(array('resultCode' => 1, 'message' => 'Неизвестный метод запроса'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        }
}
