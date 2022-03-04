<?php
    include_once('../header.php');
    include_once('../configDB.php');
    $userid=$_GET['userID'];
    $query = "select ifnull(tab_in.income,0) income, ifnull(tab_out.outcome,0) outcome from
        (select sum(amountMoney) income from users_transaction where userid=$userid and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isIncome=true) tab_in,
        (select sum(amountMoney) outcome from users_transaction where userid=$userid and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isOutcome=true) tab_out";
    $result = mysqli_query($connectDB, $query);
    $result = mysqli_fetch_array($result);

    echo json_encode(array('income' => $result['income'], 'outcome' => $result['outcome'],
        'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | 
        JSON_NUMERIC_CHECK);
?>