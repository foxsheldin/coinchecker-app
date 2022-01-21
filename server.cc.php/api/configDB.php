<?
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $connectDB = mysqli_connect("localhost","root","root","coincheckerDB");
    
    if (!$connectDB)
    {
        echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
        echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
?>