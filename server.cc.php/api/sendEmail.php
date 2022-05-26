<?php
include_once("header.php");
include_once("configDB.php");

$graceNotifyArray = array();
$overspendingNotifyArray = array();

$query = "select userCardID, c.userID, u.email, name, startDateGracePeriod, dateNotification, endDateGracePeriod 
        from users_Card c left join users u on c.userID=u.userID where isGracePeriod=true and startDateGracePeriod is not null and dateNotification<=NOW()";
$result = mysqli_query($connectDB, $query);
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_array($result)) {
        $arr = array(
            'userCardID' => $row['userCardID'], 'name' => $row['name'],
            'startDateGracePeriod' => $row['startDateGracePeriod'],
            'dateNotification' => $row['dateNotification'], 'endDateGracePeriod' => $row['endDateGracePeriod']
        );
        array_push($graceNotifyArray, $arr);

        mail(
            $row['email'],
            "Coinchecker - Пользовательское уведомление!",
            "Настало время погасить долг по карте \"" . $row['name'] . "\".\r\n\r\n--\r\nВаш финансовый помощник,\r\nCoincheker"
        );
    }
}

$query = "select userCardID, c.userID, u.email, name, startDateGracePeriod, dateNotification, endDateGracePeriod
        from users_Card c left join users u on c.userID=u.userID where isLimitOverspending=true and dateNotification<=NOW()";
$result = mysqli_query($connectDB, $query);
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_array($result)) {
        $arr = array(
            'userCardID' => $row['userCardID'], 'name' => $row['name'],
            'startDateGracePeriod' => $row['startDateGracePeriod'],
            'dateNotification' => $row['dateNotification'], 'endDateGracePeriod' => $row['endDateGracePeriod']
        );
        array_push($overspendingNotifyArray, $arr);

        mail(
            $row['email'],
            "CoinCheker - Предупреждение!",
            "Произошел перерасход по карте \"" . $row['name'] . "\". Рекомендуем не тратить средства на карте и погасить долг досрочно!\r\n\r\n--\r\nВаш финансовый помощник,\r\nCoincheker"
        );
    }
}

$arr = array('grace' => $graceNotifyArray, 'overspending' => $overspendingNotifyArray);
$arr = array('notify' => $arr, 'resultCode' => 0);
echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
