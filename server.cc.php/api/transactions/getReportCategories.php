<?php
    include_once('../header.php');
    include_once('../configDB.php');
    $userid=$_GET['userID'];
    $sumArr = [];

    $reportCategory = mysqli_query($connectDB, 
    "select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=".$userid." and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isOutcome=true GROUP BY categoryID");
    if (mysqli_num_rows($reportCategory))
    {
        while ($row = mysqli_fetch_array($reportCategory)) {
            $categoryName = mysqli_query($connectDB, "select name from categories where categoryid=".$row['categoryID']);
            $categoryName = mysqli_fetch_array($categoryName);
            $categoryName = $categoryName['name'];
            $arr = array('categoryName' => $categoryName, 'outcomeMoney' => $row['allOutcome']);
            array_push($sumArr, $arr);
        }
    }
    echo json_encode(array('reportCategories' => $sumArr,
        'countReportCategories' => mysqli_num_rows($reportCategory),
        'resultCode' => 0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | 
        JSON_NUMERIC_CHECK);
?>