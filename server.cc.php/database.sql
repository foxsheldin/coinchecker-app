drop database coinCheckerDB;

create database coinCheckerDB;

use coinCheckerDB;

create table users (
    userID bigint unsigned not null auto_increment primary key,
    firstName varchar(200) not null,
    email varchar(100) not null,
    pass varchar(50) not null,
    vipStatus boolean not null,
    startPage varchar(255) not null
);

insert into users values
(1, 'Администратор', 'admin', sha1('admin'), true, 'browse'),
(2, 'Пользователь', 'user', sha1('user'), false, 'transaction');

create table users_Cash (
    userCashID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    name varchar(100) not null,
    amountMoney double not null,
    isSavingsAccount boolean not null,
    isTotalBalance boolean not null,
    isArchive boolean not null
);

insert into users_Cash values 
(1, 1, 'Наличный счёт 1', 1000.00, false, true, false),
(2, 1, 'Наличный счёт 2', 300000.00, true, true, false),
(3, 2, 'Наличный счёт 1', 5000.00, false, true, false);

create table users_Card (
    userCardID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    name varchar(100) not null,
    bankName varchar(100),
    creditLimit double not null,
    amountMoney double not null,
    isSavingsAccount boolean not null,
    isTotalBalance boolean not null,
    isArchive boolean not null
);

insert into users_Card values
(1, 1, 'Карта 1', 'Банк 1', 0, 15000.00, false, true, false),
(2, 2, 'Карта 1', 'Банк 1', 0, 400000.00, true, true, false),
(3, 2, 'Карта 2', 'Банк 1', 0, 5000.00, false, true, false);

create table payments_Credit_Card (
    paymentID int unsigned not null auto_increment primary key,
    name varchar(50) not null
);

insert into payments_Credit_Card values 
(1, 'Аннуитетные'),
(2, 'Дифференцированные');

create table users_Credit_Card (
    userCreditCardID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    name varchar(100) not null,
    bankName varchar(100),
    amountMoney double not null,
    dateOfReceipt date not null,
    creditPeriod date not null,
    interestRate float not null,
    paymentsCreditCardID int not null,
    isTotalBalance boolean not null,
    isArchive boolean not null
);

insert into users_Credit_Card values
(1, 1, 'Кредит', 'Банк 1', 1.00, '2021-05-06', '2021-12-30', 0.5, 1, true, false),
(2, 2, 'Кредит', 'Банк 1', 2.00, '2021-04-16', '2021-12-30', 0.5, 1, true, false);

/*Откуда creditLimit на Банковском счете?*/
create table users_bank_account (
    userBankAccountID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    name varchar(100) not null,
    bankName varchar(100),
    creditLimit double not null,
    amountMoney double not null,
    isSavingsAccount boolean not null,
    isTotalBalance boolean not null,
    isArchive boolean not null
);

insert into users_bank_account values
(1, 1, 'Банковский счёт', 'Банк 1', 0, 1000000.00, true, true, false),
(2, 2, 'Банковский счёт', 'Банк 1', 0, 2000000.00, true, true, false);

create table users_deposit (
    userDepositID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    name varchar(100) not null,
    bankName varchar(100),
    openingDate date not null,
    amountMoney double not null,
    periodDeposit date not null,
    interestRate float not null,
    capitalizationOfInterest boolean not null,
    /**/
    isTotalBalance boolean not null,
    isArchive boolean not null
);

insert into users_deposit values
(1, 1, 'Вклад 1', 'Банк 1', '2021-05-06', 100000.00, '2099-12-31', 5, false, true, false),
(2, 2, 'Вклад 1', 'Банк 1', '2021-05-06', 100000.00, '2099-12-31', 5, false, true, false);

create table categories (
    categoryID int unsigned not null primary key,
    name varchar(100) not null,
    inOutcome boolean not null,
    inIncome boolean not null
);

insert into categories values
(1, 'Без категории', true, true),
(2, 'Дети', true, false),
(3, 'Забота о себе', true, false),
(4, 'Зарплата', false, true),
(5, 'Здоровье и фитнес', true, false),
(6, 'Кафе и рестораны', true, false),
(7, 'Корректировка', true, true),
(8, 'Машина', true, false),
(9, 'Образование', true, false),
(10, 'Отдых и развлечения', true, false),
(11, 'Платежи, комиссии', true, false),
(12, 'Подарки', true, true),
(13, 'Покупки: одежда, техника', true, false),
(14, 'Продукты', true, false),
(15, 'Проезд', true, false);

create table comments (
    commentID bigint unsigned not null auto_increment primary key,
    transactionID bigint unsigned not null,
    comment text not null
);

insert into comments values
(1, 2, 'АЗС/АИ-95'),
(2, 3, 'Посиделки в кафе с друзьями'),
(3, 4, 'Пополнение счета'),
(4, 5, 'Пополнение счета'),
(5, 6, 'Покупка курсов на сайте');


create table repeat_transaction (
    repeatTransactionID bigint unsigned not null auto_increment primary key,
    transactionID bigint unsigned not null,
    repeatD boolean not null,
    repeatW boolean not null,
    repeatM boolean not null,
    repeatY boolean not null,
    repeatValue int not null,
    dayOfWeek varchar(255) 
);

insert into repeat_transaction values
(1, 1, false, true, false, false, 2, 'Mon');

create table type_account (
    typeAccountID int unsigned not null auto_increment primary key,
    nameAccount varchar(255) not null,
    useTable varchar(255) not null,
    useNameID varchar(255) not null,/*новое поле*/
    description text not null
);

insert into type_account values
(1, "Наличный счет", "users_cash", "userCashID", "Тип счета относяшийся к таблице user_cash"),
(2, "Дебетовая карта", "users_Card", "userCardID", "Тип счета относящийся к таблице users_Card"),
(3, "Кредитная карта", "users_Credit_Card", "userCreditCardID", "Тип счета относящийся к таблице users_Credit_Card"),
(4, "Банковский счет", "users_bank_account", "userBankAccountID", "Тип счета относящийся к таблице users_bank_account"),
(5, "Депозитный счет (вклад)", "users_deposit", "userDepositID", "Тип счета относящийся к таблице users_deposit");

create table users_transaction (
    transactionID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    firstTypeAccountID int unsigned not null,
    firstAccountID bigint unsigned not null,
    secondTypeAccountID int unsigned,
    secondAccountID bigint unsigned,
    amountMoney double not null,
    categoryID int unsigned not null,
    /* mainCategoryID bigint unsigned,
    secondaryCategoryID JSON, */
    dateTransaction date not null,
    payer varchar(200),
    commentID bigint unsigned,
    repeatOperation boolean not null,
    repeatTransactionID bigint unsigned,
    isIncome boolean not null,
    isOutcome boolean not null,
    isTransfer boolean not null
);

insert into users_transaction values
(1, 1, 1, 1, null, null, -1000.00, 6, '2021-10-01', '', null, true, 1, false, true, false),
(2, 1, 1, 1, null, null, -2000.00, 8, '2021-10-02', 'АЗС', 1, true, 1, false, true, false),
(3, 2, 1, 1, null, null, -3000.00, 6, '2021-10-02', '', 2, true, 1, false, true, false),
(4, 1, 1, 1, null, null, 4000.00, 4, '2021-10-05', 'МГУ им. Н.П. Огарева', 3, true, 1, true, false, false),
(5, 1, 1, 1, null, null, 5000.00, 4, '2021-10-10', 'Фриланс', 4, true, 1, true, false, false),
(6, 1, 1, 1, null, null, -6000.00, 9, '2021-10-11', 'Курсы 1С', 5, true, 1, false, true, false),
(7, 1, 1, 1, 1, 2, 10000.00, 6, '2021-10-15', null, null, true, 1, false, false, true),

(8, 2, 2, 3, null, null, -300.00, 13, '2021-11-11', '', null, true, 1, false, true, false),
(9, 2, 2, 3, null, null, -2000.00, 8, '2021-11-12', 'АЗС', null, true, 1, false, true, false),
(10, 2, 2, 1, 2, 3, 15000.00, 1, '2021-11-13', '', null, true, 1, false, false, true),
(11, 2, 2, 3, null, null, -300.00, 6, '2021-11-14', '', null, true, 1, false, true, false),
(12, 2, 2, 3, null, null, -2800.00, 13, '2021-11-15', '', null, true, 1, false, true, false),
(13, 2, 5, 2, null, null, 5000.00, 4, '2021-11-16', '', null, true, 1, true, false, false),
(14, 2, 1, 3, null, null, -300.00, 6, '2021-11-18', '', null, true, 1, false, true, false),
(15, 2, 1, 3, null, null, -200.00, 6, '2021-11-19', '', null, true, 1, false, true, false),
(16, 2, 2, 3, null, null, -1500.00, 8, '2021-11-24', 'АЗС', null, true, 1, false, true, false),
(17, 2, 2, 3, null, null, 4000.00, 4, '2021-11-25', '', null, true, 1, true, false, false),

(18, 1, 1, 1, null, null, -900.00, 6, '2021-10-01', '', null, true, 1, false, true, false),
(19, 1, 1, 1, null, null, -2100.00, 8, '2021-10-02', 'АЗС', 1, true, 1, false, true, false),
(20, 2, 1, 1, null, null, -4000.00, 6, '2021-10-02', '', 2, true, 1, false, true, false),
(21, 1, 1, 1, null, null, 5000.00, 4, '2021-10-05', 'МГУ им. Н.П. Огарева', 3, true, 1, true, false, false),
(22, 1, 1, 1, null, null, 5000.00, 4, '2021-10-10', 'Фриланс', 4, true, 1, true, false, false),
(23, 1, 1, 1, null, null, -5000.00, 9, '2021-10-11', 'Курсы 1С', 5, true, 1, false, true, false),
(24, 1, 1, 1, 1, 2, 10000.00, 6, '2021-10-15', null, null, true, 1, false, false, true),

(25, 1, 1, 1, null, null, -1000.00, 6, '2021-11-01', '', null, true, 1, false, true, false),
(26, 1, 1, 1, null, null, -2000.00, 8, '2021-11-02', 'АЗС', 1, true, 1, false, true, false),
(27, 2, 1, 1, null, null, -3000.00, 6, '2021-11-02', '', 2, true, 1, false, true, false),
(28, 1, 1, 1, null, null, 4000.00, 4, '2021-11-05', 'МГУ им. Н.П. Огарева', 3, true, 1, true, false, false),
(29, 1, 1, 1, null, null, 5000.00, 4, '2021-07-10', 'Фриланс', 4, true, 1, true, false, false),
(30, 1, 1, 1, null, null, -6000.00, 9, '2021-07-11', 'Курсы 1С', 5, true, 1, false, true, false),
(31, 1, 1, 1, 1, 2, 10000.00, 6, '2021-07-15', null, null, true, 1, false, false, true);

create table user_notification (
    notificationID bigint unsigned not null auto_increment primary key,
    userID bigint unsigned not null,
    dateN date not null,
    headerN text not null,
    textN text not null.
    isViewed boolean not null
);

insert into user_notification values
(1, 1, '2021-11-19', 'Заголовок', 'Текст уведомления', 0),
(2, 2, '2021-11-19', 'Заголовок', 'Текст уведомления', 0);

/* Вывод всех средств, которые пользователь решил включить в общий счет */
select sum(sum) as 'total' from (
    (select sum(amountMoney) as 'sum' from users_cash where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_Card where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_Credit_Card where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_bank_account where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_deposit where userid=1 and isTotalBalance=true and isArchive=false)
) as all_tables;

/* Вывод средств для графика Баланс фактический */
select sum(sum)-(select sum(amountMoney) from users_transaction where (dateTransaction between SUBDATE(curdate(), interval 30 day) and ADDDATE(curdate(), interval 1 day))) as 'total' from(
    (select sum(amountMoney) as 'sum' from users_cash where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_Card where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_Credit_Card where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_bank_account where userid=1 and isTotalBalance=true and isArchive=false) union all
    (select sum(amountMoney) as 'sum' from users_deposit where userid=1 and isTotalBalance=true and isArchive=false)
) as all_tables;
/* Определение дат транзакций для графика Баланс фаткический*/
select amountMoney from users_transaction where (dateTransaction between SUBDATE(curdate(), interval 30 day) and curdate()) and (isOutcome=true or isIncome=true);

/* Подсчет расходов/доходов за месяц */
select sum(amountMoney) as 'income' from users_transaction where userid=2 and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isIncome=true;
select sum(amountMoney) as 'outcome' from users_transaction where userid=2 and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isOutcome=true; 

select ifnull(tab_in.income,0) income, ifnull(tab_out.outcome,0) outcome from
    (select sum(amountMoney) income from users_transaction where userid=2 and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isIncome=true) tab_in,
    (select sum(amountMoney) outcome from users_transaction where userid=2 and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isOutcome=true) tab_out;

/* Подсчет расходов по категориям */
select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=2 and (dateTransaction between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') as DATE) and curdate()) and isOutcome=true GROUP BY categoryID;
/* Для тестирования в начале месяца */
select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=2 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 2) ,'%Y-%m-01') as DATE) and curdate()) and isOutcome=true GROUP BY categoryID;


/* Расчеты финансовой подушки */
/* Средний расход по категориям */
select categoryID, avg(allOutcome) as allOutcome from(
    (select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=1 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 30) ,'%Y-%m-01') as DATE) and last_day(subdate(NOW(), 30))) and isOutcome=true GROUP BY categoryID) union all
    (select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=1 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 60) ,'%Y-%m-01') as DATE) and last_day(subdate(NOW(), 60))) and isOutcome=true GROUP BY categoryID) union all
    (select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=1 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 90) ,'%Y-%m-01') as DATE) and last_day(subdate(NOW(), 90))) and isOutcome=true GROUP BY categoryID) union all
    (select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=1 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 120) ,'%Y-%m-01') as DATE) and last_day(subdate(NOW(), 120))) and isOutcome=true GROUP BY categoryID) union all
    (select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=1 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 150) ,'%Y-%m-01') as DATE) and last_day(subdate(NOW(), 150))) and isOutcome=true GROUP BY categoryID) union all
    (select categoryID, sum(amountMoney) as allOutcome from users_transaction where userid=1 and (dateTransaction between CAST(DATE_FORMAT(subdate(NOW(), 180) ,'%Y-%m-01') as DATE) and last_day(subdate(NOW(), 180))) and isOutcome=true GROUP BY categoryID)
) as all_tables GROUP BY categoryID;
