<?php
include_once("header.php");
include_once("configDB.php");

switch ($_SERVER['REQUEST_METHOD']) {
        /* Этот метод запроса получает транзакцию из базы данных */
    case "GET": {
            $userID = $_GET['userID'];
            $graceNotifyArray = array();
            $notifyArray = array();

            $query = "select userCardID, name, startDateGracePeriod, dateNotification, endDateGracePeriod from users_Card 
                where isGracePeriod=true and startDateGracePeriod is not null and userID=$userID";
            $result = mysqli_query($connectDB, $query);
            if (mysqli_num_rows($result)) {
                while ($row = mysqli_fetch_array($result)) {
                    $dateNotify = strtotime($row['dateNotification']);
                    $today = strtotime(date("Y-m-d"));
                    if ($dateNotify < $today) {
                        $arr = array(
                            'userCardID' => $row['userCardID'], 'name' => $row['name'],
                            'startDateGracePeriod' => $row['startDateGracePeriod'],
                            'dateNotification' => $row['dateNotification'], 'endDateGracePeriod' => $row['endDateGracePeriod']
                        );
                        array_push($graceNotifyArray, $arr);
                    }
                }
            }

            $query = "select notificationID, dateN, headerN, textN, isViewed from user_notification where userID=$userID";
            $result = mysqli_query($connectDB, $query);
            if (mysqli_num_rows($result)) {
                while ($row = mysqli_fetch_array($result)) {
                    $arr = array(
                        'notificationID' => $row['notificationID'], 'dateN' => $row['dateN'],
                        'headerN' => $row['headerN'], 'textN' => $row['textN'], 'isViewed' => $row['isViewed']
                    );
                    array_push($notifyArray, $arr);
                }
            }

            $arr = array('grace' => $graceNotifyArray, 'default' => $notifyArray);
            $arr = array('notify' => $arr, 'resultCode' => 0);
            echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        };
        break;

        /* Этот метод запроса добавляет транзакцию в базу данных */
        /* case "POST": {
            $_POST = json_decode(file_get_contents('php://input'), true);
            $userid = $_POST['data']['userID'];

            if ($result) {
                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(array('resultCode' => 7, 'message' => 'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break; */


        /* Этот метод запроса используется для обновления информации на сервере */
        /* case "PUT": {
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $userID = $_PUT['data']['userID'];
        };
        break; */


        /* Этот метод запроса используется для удаления информации на сервере */
        /* case "DELETE": {
            $transactionID = $_GET['transactionid'];
            $userID = $_GET['userID'];

            if ($result) {
                echo json_encode(array('resultCode' => 0, 'message' => 'Операция выполнена успешно'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(array('resultCode' => 2, 'message' => 'ОШИБКА СЕРВЕРА'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
                exit;
            }
        };
        break; */



    default: {
            echo json_encode(array('resultCode' => 1, 'message' => 'Неизвестный метод запроса'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
        }
}
