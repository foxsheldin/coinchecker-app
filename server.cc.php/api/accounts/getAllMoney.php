<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    $userid=$_GET['userid'];
    include_once('../configDB.php');
    
    $allmoney=mysqli_query($connectDB, "select sum(sum) as 'total' from(
        (select sum(amountMoney) as 'sum' from users_cash where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_Card where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_Credit_Card where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_bank_account where userid=$userid and isTotalBalance=true and isArchive=false) union all
        (select sum(amountMoney) as 'sum' from users_deposit where userid=$userid and isTotalBalance=true and isArchive=false)
    ) as all_tables");
    $allmoney=mysqli_fetch_array($allmoney);

    echo json_encode(array('allMoney'=>$allmoney, 'resultCode'=>0));
?>