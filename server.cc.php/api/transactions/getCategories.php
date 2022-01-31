<?php
    include_once("../header.php");
    include_once("../configDB.php");

    $typeCategory=$_GET['type'];
    switch ($typeCategory) {
        case 'income': {
            $query = "select categoryID, name from categories where inIncome=1";
        };break;
        case 'outcome': {
            $query = "select categoryID, name from categories where inOutcome=1";
        };break;

        default: {
            echo json_encode(array("resultCode"=>1, "message"=>"Неверный тип запроса или категории"), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
            exit;
        }
    }
    $categories=mysqli_query($connectDB, $query);
    if (mysqli_num_rows($categories)){
        $sumArr=array();
        while ($row=mysqli_fetch_array($categories)) {
            $arr=array("id"=>$row["categoryID"], "nameCategory"=>$row["name"]);
            array_push($sumArr, $arr);
        }
        echo json_encode(array("categories"=>$sumArr, "resultCode"=>0), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    }
?>