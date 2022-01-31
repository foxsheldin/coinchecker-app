<?php
    include_once('../header.php');
    include_once('../configDB.php');
    $userid=$_GET['userID'];
    
    $allmoney=mysqli_query($connectDB, "select sum(sum) as 'total' from(
        (select sum(amountMoney) as 'sum' from users_cash where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_Card where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_Credit_Card where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_bank_account where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_deposit where userid=$userid and isTotalBalance=true and isArchive=false)
    ) as all_tables");
    $allmoney=mysqli_fetch_array($allmoney);
    $allmoney=$allmoney['total'];

    echo json_encode(array('allMoney'=>$allmoney, 'resultCode'=>0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
?>