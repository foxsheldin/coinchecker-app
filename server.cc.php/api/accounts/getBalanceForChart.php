<?php
    include_once('../header.php');
    include_once('../configDB.php');
    $userid=$_GET['userID'];
    $arr = [];

    $allmoney = mysqli_query($connectDB, "select sum(sum) as 'total' from(
        (select sum(amountMoney) as 'sum' from users_cash where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_Card where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_Credit_Card where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_bank_account where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_deposit where userid=$userid and isTotalBalance=true and isArchive=false)
    ) as all_tables");
    $allmoney = mysqli_fetch_array($allmoney);
    $allmoney = $allmoney[0];
    $sub = mysqli_query($connectDB, "select sum(amountMoney) from users_transaction where (dateTransaction between SUBDATE(curdate(), interval 29 day) and curdate()) and (isOutcome=true or isIncome=true)");
    $sub = mysqli_fetch_array($sub);
    $sub = $sub[0];
    array_push($arr, $allmoney-$sub);
    for ($i=28; $i>-1; $i--)
    {
        $sub = mysqli_query($connectDB, "select sum(amountMoney) from users_transaction where (dateTransaction between SUBDATE(curdate(), interval $i day) and ADDDATE(curdate(), interval 0 day)) and (isOutcome=true or isIncome=true)");
        $sub = mysqli_fetch_array($sub);
        $sub = $sub[0];
        array_push($arr, $allmoney-$sub);
    }
    array_push($arr, $allmoney);
    echo json_encode(array('balanceDatasets'=>$arr, 'resultCode'=>0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
?>