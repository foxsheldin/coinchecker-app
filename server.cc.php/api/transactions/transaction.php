<?php
include_once("../header.php");
include_once("../configDB.php");

function checkCardWithGracePeriod($connectDB, $accountCardID, $dateTranstaction, $userID)
{
    $result = mysqli_query(
        $connectDB,
        "select name, bankName, isGracePeriod, dateBankStatement, countDaysGracePeriod, 
        limitOverspendingCardAccount, countDaysOverspendingCardAccount, startDateGracePeriod, 
        dateNotification, endDateGracePeriod, creditLimit, amountMoney, isSavingsAccount,
        isTotalBalance, isArchive from users_Card where userCardID=$accountCardID and userID=" . $userID
    );
    $result = mysqli_fetch_array($result);

    $isGracePeriod = $result['isGracePeriod'];
    $dateBankStatement = $result['dateBankStatement'];
    $countDaysGracePeriod = $result['countDaysGracePeriod'];
    $limitOverspendingCardAccount = $result['limitOverspendingCardAccount'];
    $countDaysOverspendingCardAccount = $result['countDaysOverspendingCardAccount'];
    $startDateGracePeriod = $result['startDateGracePeriod'];
    $dateNotification = $result['dateNotification'];
    $endDateGracePeriod = $result['endDateGracePeriod'];
    $nameCard = $result['name'];

    if ($isGracePeriod) {
        echo "GracePeriod";
        if ($result['amountMoney'] < 0) {
            echo  " Money<0";
            echo $startDateGracePeriod;
            if (!isset($startDateGracePeriod)) {
                $startDateGracePeriod = $dateTranstaction;
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

                $query = "update users_Card set 
                startDateGracePeriod='$startDateGracePeriod', 
                dateNotification='$dateNotification', endDateGracePeriod='$endDateGracePeriod' 
                where userCardID=$accountCardID";
                $result = mysqli_query($connectDB, $query);
            }
            if (
                isset($limitOverspendingCardAccount) &&
                $limitOverspendingCardAccount <= 0 &&
                $limitOverspendingCardAccount > $result['amountMoney']
            ) {
                $today = date("Y-m-d");
                $query = "insert into user_notification values
                (NULL, $userID, '$today', 'Предупреждение', 
                'Произошел перерасход по карте $nameCard. Пожалуйста погасите долг досрочно',
                0)";
                $result = mysqli_query($connectDB, $query);
            }
        } else {
            $query = "update users_Card set 
            startDateGracePeriod=NULL, 
            dateNotification=NULL, endDateGracePeriod=NULL
            where userCardID=$accountCardID";
            $result = mysqli_query($connectDB, $query);
        }
    }
}

switch ($_SERVER['REQUEST_METHOD']) {
        /* Этот метод запроса получает транзакцию из базы данных */
    case "GET": {
            $userID = $_GET['userID'];
            $transactionid = $_GET['transactionid'];

            $query = "select transactionID, userID, firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID,
            amountMoney, categoryID, dateTransaction, payer, commentID, repeatOperation, repeatTransactionID, isIncome, isOutcome, isTransfer
            from users_transaction where userID=" . $userID . " and transactionid=" . $transactionid;
            $result = mysqli_query($connectDB, $query);

            if (mysqli_num_rows($result)) {
                while ($row = mysqli_fetch_array($result)) {
                    $date = date_create($row['dateTransaction']);
                    $nameCategory = mysqli_query($connectDB, "select name from categories where categoryID=" . $row['categoryID']);
                    $nameCategory = mysqli_fetch_row($nameCategory);
                    $comment = "";
                    if ($row['commentID'] != null) {
                        $comment = mysqli_query($connectDB, "select comment from comments where commentID=" . $row['commentID']);
                        $comment = mysqli_fetch_row($comment);
                    }
                    switch ($row['firstTypeAccountID']) {
                        case 1: {
                                $account1 = mysqli_query($connectDB, "select name from users_Cash where userCashID=" . $row['firstAccountID']);
                                $account1 = mysqli_fetch_row($account1);
                                $firstAccountSelect = "cash, " . $row['firstAccountID'];
                            };
                            break;
                        case 2: {
                                $account1 = mysqli_query($connectDB, "select name from users_Card where userCardID=" . $row['firstAccountID']);
                                $account1 = mysqli_fetch_row($account1);
                                $firstAccountSelect = "card, " . $row['firstAccountID'];
                            };
                            break;
                        case 3: {
                                $account1 = mysqli_query($connectDB, "select name from users_Credit_Card where userCreditCardID=" . $row['firstAccountID']);
                                $account1 = mysqli_fetch_row($account1);
                                $firstAccountSelect = "creditCard, " . $row['firstAccountID'];
                            };
                            break;
                        case 4: {
                                $account1 = mysqli_query($connectDB, "select name from users_bank_account where userBankAccountID=" . $row['firstAccountID']);
                                $account1 = mysqli_fetch_row($account1);
                                $firstAccountSelect = "bankAccount, " . $row['firstAccountID'];
                            };
                            break;
                        case 5: {
                                $account1 = mysqli_query($connectDB, "select name from users_deposit where userDepositID=" . $row['firstAccountID']);
                                $account1 = mysqli_fetch_row($account1);
                                $firstAccountSelect = "deposit, " . $row['firstAccountID'];
                            };
                            break;
                        default: {
                                echo json_encode(array('resultCode' => 1, 'message' => 'Использование неизвестного счета(1)'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                                exit;
                            }
                    }
                    $account2 = "";
                    if ($row['secondTypeAccountID'] != null) {
                        switch ($row['secondTypeAccountID']) {
                            case 1: {
                                    $account2 = mysqli_query($connectDB, "select name from users_Cash where userCashID=" . $row['secondAccountID']);
                                    $account2 = mysqli_fetch_row($account2);
                                    $secondAccountSelect = "cash, " . $row['secondAccountID'];
                                };
                                break;
                            case 2: {
                                    $account2 = mysqli_query($connectDB, "select name from users_Card where userCardID=" . $row['secondAccountID']);
                                    $account2 = mysqli_fetch_row($account2);
                                    $secondAccountSelect = "card, " . $row['secondAccountID'];
                                };
                                break;
                            case 3: {
                                    $account2 = mysqli_query($connectDB, "select name from users_Credit_Card where userCreditCardID=" . $row['secondAccountID']);
                                    $account2 = mysqli_fetch_row($account2);
                                    $secondAccountSelect = "creditCard, " . $row['secondAccountID'];
                                };
                                break;
                            case 4: {
                                    $account2 = mysqli_query($connectDB, "select name from users_bank_account where userBankAccountID=" . $row['secondAccountID']);
                                    $account2 = mysqli_fetch_row($account2);
                                    $secondAccountSelect = "bankAccount, " . $row['secondAccountID'];
                                };
                                break;
                            case 5: {
                                    $account2 = mysqli_query($connectDB, "select name from users_deposit where userDepositID=" . $row['secondAccountID']);
                                    $account2 = mysqli_fetch_row($account2);
                                    $secondAccountSelect = "deposit, " . $row['secondAccountID'];
                                };
                                break;
                            default: {
                                    echo json_encode(array('resultCode' => 2, 'message' => 'Использование неизвестного счета(2)'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                                    exit;
                                }
                        }
                    } else {
                        $secondAccountSelect = null;
                    }
                    $arr = array(
                        'transactionID' => $row['transactionID'], 'userID' => $row['userID'],
                        'firstTypeAccountID' => $row['firstTypeAccountID'], 'firstAccountID' => $row['firstAccountID'],
                        'secondTypeAccountID' => $row['secondTypeAccountID'], 'secondAccountID' => $row['secondAccountID'],
                        'firstAccountSelect' => $firstAccountSelect, 'secondAccountSelect' => $secondAccountSelect,
                        'amountMoney' => $row['amountMoney'], 'categoryID' => $row['categoryID'], 'dateTransaction' => $row['dateTransaction'], 'payer' => $row['payer'],
                        'commentID' => $row['commentID'], 'repeatOperation' => $row['repeatOperation'], 'repeatTransactionID' => $row['repeatTransactionID'],
                        'isIncome' => $row['isIncome'], 'isOutcome' => $row['isOutcome'], 'isTransfer' => $row['isTransfer'],
                        'date' => $date, 'nameCategory' => $nameCategory, 'nameAccount1' => $account1, 'nameAccount2' => $account2, 'comment' => $comment
                    );
                    /* $arr = array('array'=>$row, 'date'=>$date, 'nameCategory'=>$nameCategory, 
                    'nameAccount1'=>$account1, 'nameAccount2'=>$account2, 'comment'=>$comment); */
                    echo json_encode(array("items" => $arr, "resultCode" => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                }
            }
        };
        break;

        /* Этот метод запроса добавляет транзакцию в базу данных */
    case "POST": {
            $_POST = json_decode(file_get_contents('php://input'), true);
            $userid = $_POST['data']['userID'];
            $typeTransaction = $_POST['data']['typeTransaction'];
            $date = $_POST['data']['date'];
            $money = $_POST['data']['money'];
            $secondTypeAccountID = 'null';
            $secondAccountID = 'null';
            $payer = 'null';
            $categoryID = '1';
            $comment = $_POST['data']['comment'];
            $isIncome = 'false';
            $isOutcome = 'false';
            $isTransfer = 'false';

            switch ($typeTransaction) {
                case 'outcome': {
                        $firstAccountID = $_POST['data']['account'];
                        $firstAccountID = explode(', ', $firstAccountID);
                        $firstTypeAccountID = $firstAccountID[0];
                        $firstAccountID = $firstAccountID[1];
                        $payer = $_POST['data']['payer'];
                        $categoryID = $_POST['data']['category'];
                        $money = $money * (-1);
                        $isOutcome = 'true';
                    };
                    break;
                case 'income': {
                        $firstAccountID = $_POST['data']['account'];
                        $firstAccountID = explode(', ', $firstAccountID);
                        $firstTypeAccountID = $firstAccountID[0];
                        $firstAccountID = $firstAccountID[1];
                        $categoryID = $_POST['data']['category'];
                        $payer = $_POST['data']['payer'];
                        $isIncome = 'true';
                    };
                    break;
                case 'transfer': {
                        $firstAccountID = $_POST['data']['firstAccount'];
                        $firstAccountID = explode(', ', $firstAccountID);
                        $firstTypeAccountID = $firstAccountID[0];
                        $firstAccountID = $firstAccountID[1];
                        $secondAccountID = $_POST['data']['secondAccount'];
                        $secondAccountID = explode(', ', $secondAccountID);
                        $secondTypeAccountID = $secondAccountID[0];
                        $secondAccountID = $secondAccountID[1];
                        $isTransfer = 'true';
                        if (($firstTypeAccountID == $secondTypeAccountID) && ($firstAccountID == $secondAccountID)) {
                            /* Обработка одинаковых счетов в переводе*/
                            echo json_encode(array('resultCode' => 2, 'message' => 'Использование одинаковых счетов для перевода средств'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                            exit;
                        }
                    };
                    break;
                default: {
                        echo json_encode(array('resultCode' => 3, 'message' => 'При добавлении используется неизвестный тип транзакции'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }

            switch ($firstTypeAccountID) {
                case "cash":
                    $firstTypeAccountID = 1;
                    break;
                case "card":
                    $firstTypeAccountID = 2;
                    break;
                case "creditCard":
                    $firstTypeAccountID = 3;
                    break;
                case "bankAccount":
                    $firstTypeAccountID = 4;
                    break;
                case "deposit":
                    $firstTypeAccountID = 5;
                    break;

                default: {
                        echo json_encode(array('resultCode' => 4, 'message' => 'При добавлении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }
            switch ($secondTypeAccountID) {
                case "cash":
                    $secondTypeAccountID = 1;
                    break;
                case "card":
                    $secondTypeAccountID = 2;
                    break;
                case "creditCard":
                    $secondTypeAccountID = 3;
                    break;
                case "bankAccount":
                    $secondTypeAccountID = 4;
                    break;
                case "deposit":
                    $secondTypeAccountID = 5;
                    break;
                case 'null':
                    $secondTypeAccountID = 'null';
                    break;

                default: {
                        echo json_encode(array('resultCode' => 5, 'message' => 'При добавлении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }

            $transactionID = mysqli_query($connectDB, "select MAX(transactionID) from users_transaction");
            $transactionID = mysqli_fetch_array($transactionID);
            $transactionID = $transactionID[0] + 1;

            /* try
            { */
            if ($comment != null) {
                $comment = mysqli_query($connectDB, "insert into comments value (null, $transactionID, '$comment')");
                if ($comment) {
                    $commentID = mysqli_query($connectDB, "select max(commentID) from comments where transactionID=$transactionID");
                    $commentID = mysqli_fetch_array($commentID);
                    $commentID = $commentID[0];
                } else {
                    echo json_encode(array('resultCode' => 6, 'message' => 'Ошибка запроса данных с сервера'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                    exit;
                }
            } else {
                //echo 'Пустой коммент';
                $commentID = 'null';
            }

            $transaction = mysqli_query($connectDB, "insert into users_transaction value ($transactionID, $userid, $firstTypeAccountID, $firstAccountID, $secondTypeAccountID, $secondAccountID, $money, $categoryID, '$date', '$payer', $commentID, false, null, $isIncome, $isOutcome, $isTransfer)");
            if ($transaction) {
                if ($typeTransaction == 'income' || $typeTransaction == 'outcome') {
                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                    $result = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$money where $firstTypeAccountTableID=$firstAccountID");
                    if ($firstTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $firstAccountID, $date, $userid);
                }
                if ($typeTransaction == 'transfer') {
                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                    $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                    $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                    $secondTypeAccountTableID = $secondTypeAccountTable[1];
                    $secondTypeAccountTable = $secondTypeAccountTable[0];
                    $firstresult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$money where $firstTypeAccountTableID=$firstAccountID");
                    if ($firstresult) {
                        $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney+$money where $secondTypeAccountTableID=$secondAccountID");
                    }
                    if ($firstTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $firstAccountID, $date, $userid);
                    if ($secondTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $secondAccountID, $date, $userid);
                }
            }

            if ($result) {
                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(array('resultCode' => 7, 'message' => 'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
            /*  } 
            catch (Exception $e) {
                echo json_encode(array('resultCode'=>8, 'message'=>'Поймано исключение: '.$e->getMessage()), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            } */
        };
        break;


        /* Этот метод запроса используется для обновления информации на сервере */
    case "PUT": {
            $_PUT = json_decode(file_get_contents('php://input'), true);
            /* print_r($_PUT['data']['comment'][0]); */
            $amountMoney = $_PUT['data']['amountMoney'];
            $categoryID = $_PUT['data']['categoryID'];
            if (empty($_PUT['data']['comment'])) {
                $comment = null;
            } else {
                $comment = $_PUT['data']['comment'];
                if (is_array($comment)) {
                    $comment = $_PUT['data']['comment'][0];
                }
            }
            $oldCommentID = $_PUT['data']['commentID'];
            $date = $_PUT['data']['dateTransaction'];
            $firstAccountID = $_PUT['data']['firstAccountSelect'];
            $firstAccountID = explode(', ', $firstAccountID);
            $firstTypeAccountID = $firstAccountID[0];
            $firstAccountID = $firstAccountID[1];
            $secondTypeAccountID = 'null';
            $secondAccountID = 'null';
            $isIncome = $_PUT['data']['isIncome'];
            $isOutcome = $_PUT['data']['isOutcome'];
            $isTransfer = $_PUT['data']['isTransfer'];
            $payer = 'null';
            $typeTransaction = 'null';
            $transactionID = $_PUT['data']['transactionID'];
            $userID = $_PUT['data']['userID'];

            if ($isIncome)
                $typeTransaction = "income";
            else if ($isOutcome)
                $typeTransaction = "outcome";
            else if ($isTransfer)
                $typeTransaction = "transfer";
            //$commentID = mysqli_query($connectDB, "insert into comments value (null, ");

            $oldTransaction = mysqli_query($connectDB, "select firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID, amountMoney from users_transaction where transactionID=$transactionID");
            $oldTransaction = mysqli_fetch_array($oldTransaction);

            switch ($typeTransaction) {
                case 'outcome': {
                        $amountMoney = $amountMoney * (-1);
                        $categoryID = $_PUT['data']['categoryID'];
                        $payer = $_PUT['data']['payer'];
                    };
                    break;
                case 'income': {
                        $categoryID = $_PUT['data']['categoryID'];
                        $payer = $_PUT['data']['payer'];
                    };
                    break;
                case 'transfer': {
                        $secondAccountID = $_PUT['data']['secondAccountSelect'];
                        $secondAccountID = explode(', ', $secondAccountID);
                        $secondTypeAccountID = $secondAccountID[0];
                        $secondAccountID = $secondAccountID[1];
                        if (($firstTypeAccountID == $secondTypeAccountID) && ($firstAccountID == $secondAccountID)) {
                            /* Обработка одинаковых счетов в переводе*/
                            echo json_encode(array('resultCode' => 2, 'message' => 'Использование одинаковых счетов для перевода средств'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                            exit;
                        }
                    };
                    break;
                default: {
                        echo json_encode(array('resultCode' => 3, 'message' => 'При добавлении используется неизвестный тип транзакции'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        exit;
                    }
            }

            try {
                switch ($firstTypeAccountID) {
                    case "cash":
                        $firstTypeAccountID = 1;
                        break;
                    case "card":
                        $firstTypeAccountID = 2;
                        break;
                    case "creditCard":
                        $firstTypeAccountID = 3;
                        break;
                    case "bankAccount":
                        $firstTypeAccountID = 4;
                        break;
                    case "deposit":
                        $firstTypeAccountID = 5;
                        break;

                    default: {
                            echo json_encode(array('resultCode' => 4, 'message' => 'При добавлении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                            exit;
                        }
                }
                switch ($secondTypeAccountID) {
                    case "cash":
                        $secondTypeAccountID = 1;
                        break;
                    case "card":
                        $secondTypeAccountID = 2;
                        break;
                    case "creditCard":
                        $secondTypeAccountID = 3;
                        break;
                    case "bankAccount":
                        $secondTypeAccountID = 4;
                        break;
                    case "deposit":
                        $secondTypeAccountID = 5;
                        break;
                    case 'null':
                        $secondTypeAccountID = 'null';
                        break;

                    default: {
                            echo json_encode(array('resultCode' => 4, 'message' => 'При добавлении используется неизвестный тип счета'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                            exit;
                        }
                }
                if ($oldCommentID != null) {
                    if (!empty($comment)) {
                        $comment = mysqli_query($connectDB, "update comments set comment='$comment' where commentID=$oldCommentID and transactionID=$transactionID");
                        $commentID = $oldCommentID;
                    } else {
                        $comment = mysqli_query($connectDB, "delete from comments where commentID=$oldCommentID and transactionID=$transactionID");
                        if (!$comment) {
                            echo 'ОШИБКА СЕРВЕРА';
                            exit;
                        }
                        $commentID = 'null';
                    }
                } else {
                    if (!empty($comment)) {
                        $comment = mysqli_query($connectDB, "insert into comments value (null, $transactionID, '$comment')");
                        if ($comment) {
                            $commentID = mysqli_query($connectDB, "select commentID from comments where transactionID=$transactionID");
                            $commentID = mysqli_fetch_array($commentID);
                            $commentID = $commentID[0];
                        } else {
                            echo 'ОШИБКА СЕРВЕРА';
                            exit;
                        }
                    } else {
                        //echo 'Пустой коммент';
                        $commentID = 'null';
                    }
                }

                $transaction = mysqli_query($connectDB, "update users_transaction set firstTypeAccountID=$firstTypeAccountID, firstAccountID=$firstAccountID,
                    secondTypeAccountID=$secondTypeAccountID, secondAccountID=$secondAccountID, amountMoney=$amountMoney, 
                    categoryID=$categoryID, dateTransaction='$date', payer='$payer', commentID=$commentID 
                    where transactionID=$transactionID and userID=$userID");

                if ($transaction) {
                    $oldAmountMoney = $oldTransaction['amountMoney'];

                    if ($typeTransaction == 'income' || $typeTransaction == 'outcome') {
                        if ($firstTypeAccountID == $oldTransaction['firstTypeAccountID'] && $firstAccountID == $oldTransaction['firstAccountID']) {
                            $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                            $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                            $firstTypeAccountTableID = $firstTypeAccountTable[1];
                            $firstTypeAccountTable = $firstTypeAccountTable[0];
                            $result = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney+$amountMoney where $firstTypeAccountTableID=$firstAccountID");

                            if ($firstTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $firstAccountID, $date, $userid);
                            echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                        } else {
                            $oldFirstTypeAccountID = $oldTransaction['firstTypeAccountID'];
                            $oldFirstAccountID = $oldTransaction['firstAccountID'];
                            $oldFirstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldFirstTypeAccountID");
                            $oldFirstTypeAccountTable = mysqli_fetch_array($oldFirstTypeAccountTable);
                            $oldFirstTypeAccountTableID = $oldFirstTypeAccountTable[1];
                            $oldFirstTypeAccountTable = $oldFirstTypeAccountTable[0];
                            $oldResult = mysqli_query($connectDB, "update $oldFirstTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney where $oldFirstTypeAccountTableID=$oldFirstAccountID");
                            if ($oldResult) {
                                $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                $firstTypeAccountTable = $firstTypeAccountTable[0];
                                $result = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$amountMoney where $firstTypeAccountTableID=$firstAccountID");

                                if ($oldTransaction['firstTypeAccountID'] == 2)
                                    checkCardWithGracePeriod($connectDB, $oldTransaction['firstAccountID'], $date, $userid);

                                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                            }
                        }
                    }
                    if ($typeTransaction == 'transfer') {
                        if (($firstTypeAccountID == $oldTransaction['firstTypeAccountID'] && $firstAccountID == $oldTransaction['firstAccountID']) && ($secondTypeAccountID == $oldTransaction['secondTypeAccountID'] && $secondAccountID == $oldTransaction['secondAccountID'])) {
                            $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                            $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                            $firstTypeAccountTableID = $firstTypeAccountTable[1];
                            $firstTypeAccountTable = $firstTypeAccountTable[0];
                            $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                            $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                            $secondTypeAccountTableID = $secondTypeAccountTable[1];
                            $secondTypeAccountTable = $secondTypeAccountTable[0];
                            $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                            if ($firstResult) {
                                $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");

                                if ($firstTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $firstAccountID, $date, $userid);
                                if ($secondTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $secondAccountID, $date, $userid);

                                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                            }
                        } else {
                            if ($firstTypeAccountID == $oldTransaction['firstTypeAccountID'] && $firstAccountID == $oldTransaction['firstAccountID']) {
                                $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                $firstTypeAccountTable = $firstTypeAccountTable[0];
                                $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                                if ($firstResult) {
                                    $oldSecondTypeAccountID = $oldTransaction['secondTypeAccountID'];
                                    $oldSecondAccountID = $oldTransaction['secondAccountID'];
                                    $oldSecondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldSecondTypeAccountID");
                                    $oldSecondTypeAccountTable = mysqli_fetch_array($oldSecondTypeAccountTable);
                                    $oldSecondTypeAccountTableID = $oldSecondTypeAccountTable[1];
                                    $oldSecondTypeAccountTable = $oldSecondTypeAccountTable[0];
                                    $oldResult = mysqli_query($connectDB, "update $oldSecondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney where $oldSecondTypeAccountTableID=$oldSecondAccountID");
                                    if ($oldResult) {
                                        $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                                        $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                                        $secondTypeAccountTableID = $secondTypeAccountTable[1];
                                        $secondTypeAccountTable = $secondTypeAccountTable[0];
                                        $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");

                                        if ($oldTransaction['firstTypeAccountID'] == 2)
                                            checkCardWithGracePeriod($connectDB, $oldTransaction['firstAccountID'], $date, $userid);
                                        if ($oldTransaction['secondTypeAccountID'] == 2)
                                            checkCardWithGracePeriod($connectDB, $oldTransaction['secondAccountID'], $date, $userid);

                                        echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                                    }
                                }
                            } else if ($secondTypeAccountID == $oldTransaction['secondTypeAccountID'] && $secondAccountID == $oldTransaction['secondAccountID']) {
                                $oldFirstTypeAccountID = $oldTransaction['firstTypeAccountID'];
                                $oldFirstAccountID = $oldTransaction['firstAccountID'];
                                $oldFirstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldFirstTypeAccountID");
                                $oldFirstTypeAccountTable = mysqli_fetch_array($oldFirstTypeAccountTable);
                                $oldFirstTypeAccountTableID = $oldFirstTypeAccountTable[1];
                                $oldFirstTypeAccountTable = $oldFirstTypeAccountTable[0];
                                $oldResult = mysqli_query($connectDB, "update $oldFirstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney where $oldFirstTypeAccountTableID=$oldFirstAccountID");
                                if ($oldResult) {
                                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                                    $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                                    if ($firstResult) {
                                        $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                                        $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                                        $secondTypeAccountTableID = $secondTypeAccountTable[1];
                                        $secondTypeAccountTable = $secondTypeAccountTable[0];
                                        $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");

                                        if ($oldTransaction['firstTypeAccountID'] == 2)
                                            checkCardWithGracePeriod($connectDB, $oldTransaction['firstAccountID'], $date, $userid);
                                        if ($oldTransaction['secondTypeAccountID'] == 2)
                                            checkCardWithGracePeriod($connectDB, $oldTransaction['secondAccountID'], $date, $userid);

                                        echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                                    }
                                }
                            } else {
                                $oldFirstTypeAccountID = $oldTransaction['firstTypeAccountID'];
                                $oldFirstAccountID = $oldTransaction['firstAccountID'];
                                $oldFirstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldFirstTypeAccountID");
                                $oldFirstTypeAccountTable = mysqli_fetch_array($oldFirstTypeAccountTable);
                                $oldFirstTypeAccountTableID = $oldFirstTypeAccountTable[1];
                                $oldFirstTypeAccountTable = $oldFirstTypeAccountTable[0];
                                $oldFirstResult = mysqli_query($connectDB, "update $oldFirstTypeAccountTable set amountMoney=amountMoney+$oldAmountMoney where $oldFirstTypeAccountTableID=$oldFirstAccountID");
                                if ($oldFirstResult) {
                                    $firstTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID");
                                    $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
                                    $firstTypeAccountTableID = $firstTypeAccountTable[1];
                                    $firstTypeAccountTable = $firstTypeAccountTable[0];
                                    $firstResult = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                                    if ($firstResult) {
                                        $oldSecondTypeAccountID = $oldTransaction['secondTypeAccountID'];
                                        $oldSecondAccountID = $oldTransaction['secondAccountID'];
                                        $oldSecondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$oldSecondTypeAccountID");
                                        $oldSecondTypeAccountTable = mysqli_fetch_array($oldSecondTypeAccountTable);
                                        $oldSecondTypeAccountTableID = $oldSecondTypeAccountTable[1];
                                        $oldSecondTypeAccountTable = $oldSecondTypeAccountTable[0];
                                        $oldSecondResult = mysqli_query($connectDB, "update $oldSecondTypeAccountTable set amountMoney=amountMoney-$oldAmountMoney where $oldSecondTypeAccountTableID=$oldSecondAccountID");
                                        if ($oldSecondResult) {
                                            $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                                            $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                                            $secondTypeAccountTableID = $secondTypeAccountTable[1];
                                            $secondTypeAccountTable = $secondTypeAccountTable[0];
                                            $result = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney+$amountMoney where $secondTypeAccountTableID=$secondAccountID");

                                            if ($oldTransaction['firstTypeAccountID'] == 2)
                                                checkCardWithGracePeriod($connectDB, $oldTransaction['firstAccountID'], $date, $userid);
                                            if ($oldTransaction['secondTypeAccountID'] == 2)
                                                checkCardWithGracePeriod($connectDB, $oldTransaction['secondAccountID'], $date, $userid);

                                            echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (Exception $e) {
                echo json_encode(array('resultCode' => 4, 'message' => 'Поймано исключение: ' . $e->getMessage()), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break;


        /* Этот метод запроса используется для удаления информации на сервере */
    case "DELETE": {
            $transactionID = $_GET['transactionid'];
            $userID = $_GET['userID'];

            $transaction = mysqli_query(
                $connectDB,
                "select firstTypeAccountID, firstAccountID, secondTypeAccountID, secondAccountID, amountMoney, dateTransaction commentID, isIncome, isOutcome, isTransfer from users_transaction where transactionID=$transactionID and userID=$userID"
            );
            $transaction = mysqli_fetch_array($transaction);
            $firstTypeAccountID = $transaction['firstTypeAccountID'];
            $firstAccountID = $transaction['firstAccountID'];
            $amountMoney = $transaction['amountMoney'];
            $commentID = $transaction['commentID'];
            $firstTypeAccountTable = mysqli_query(
                $connectDB,
                "select useTable, useNameID from type_account where typeAccountID=$firstTypeAccountID"
            );
            $firstTypeAccountTable = mysqli_fetch_array($firstTypeAccountTable);
            $firstTypeAccountTableID = $firstTypeAccountTable[1];
            $firstTypeAccountTable = $firstTypeAccountTable[0];
            if ($transaction['isIncome'] || $transaction['isOutcome']) {
                $refund = mysqli_query(
                    $connectDB,
                    "update $firstTypeAccountTable set amountMoney=amountMoney-$amountMoney where $firstTypeAccountTableID=$firstAccountID"
                );
            }
            if ($transaction['isTransfer']) {
                $secondTypeAccountID = $transaction['secondTypeAccountID'];
                $secondAccountID = $transaction['secondAccountID'];
                $secondTypeAccountTable = mysqli_query($connectDB, "select useTable, useNameID from type_account where typeAccountID=$secondTypeAccountID");
                $secondTypeAccountTable = mysqli_fetch_array($secondTypeAccountTable);
                $secondTypeAccountTableID = $secondTypeAccountTable[1];
                $secondTypeAccountTable = $secondTypeAccountTable[0];
                $firstrefund = mysqli_query($connectDB, "update $firstTypeAccountTable set amountMoney=amountMoney+$amountMoney where $firstTypeAccountTableID=$firstAccountID");
                if ($firstrefund) {
                    $refund = mysqli_query($connectDB, "update $secondTypeAccountTable set amountMoney=amountMoney-$amountMoney where $secondTypeAccountTableID=$secondAccountID");
                }
                if ($secondTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $secondAccountID, $transaction['dateTransaction'], $userID);
            }
            if ($firstTypeAccountID == 2) checkCardWithGracePeriod($connectDB, $firstAccountID, $transaction['dateTransaction'], $userID);

            if ($commentID != null) {
                $delcomment = mysqli_query($connectDB, "delete from comments where commentID=$commentID and transactionID=$transactionID");
            }
            $result = mysqli_query($connectDB, "delete from users_transaction where transactionID=$transactionID");

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
