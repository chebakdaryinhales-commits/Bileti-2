-- ============ 1 билет

DROP TABLE IF EXISTS UsersClients;

CREATE TABLE UsersClients (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    age INTEGER NOT NULL
);

INSERT INTO UsersClients (id, name, email, age) VALUES 
(1, 'Alex', 'AlAlAbal@gmail.com', 23),
(2, 'Dmitriy Value', 'values@gmail.com', 15);


-- ============ 2 билет


SELECT * FROM UsersClients WHERE UsersClients.age < 18;

-- ============ 3 билет

DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
    prodID INT PRIMARY KEY NOT NULL,
    prodName VARCHAR(100) NOT NULL,
    price REAL
);

INSERT INTO Products (prodID, prodName, price) VALUES
(1, 'Shkaf', 10000),
(2, 'Taburet', 15000);

-- ============ 4 билет


DROP TABLE IF EXISTS Orders;

CREATE TABLE Orders (
    orderID INT PRIMARY KEY NOT NULL,
    clientID INT NOT NULL,
    prodID INT NOT NULL
);

INSERT INTO Orders (orderID, clientID, prodID) VALUES 
(11, 1, 2),
(12, 2, 1);

SELECT 
    u.name AS [Имя Клиента],
    u.email AS [Email],
    p.prodName AS [Товар],
    p.price AS [Цена]
FROM Orders o
INNER JOIN UsersClients u ON o.clientID = u.id
INNER JOIN Products p ON o.prodID = p.prodID;

-- ============ 5 билет

CREATE UNIQUE INDEX idx_users_email_unique ON UsersClients (email);

-- ============ 6 билет

UPDATE TABLE Products SET price = 23000 WHERE prodID = 1;

-- ============ 7 билет

DROP TABLE IF EXISTS author
DROP TABLE IF EXISTS book

CREATE TABLE author
    author id PRIMARY KEY AUTOINCREMENT,
    author_name VARCHAR(100) NOTNULL,

A

CREATE TABLE book (
    book id INT PRIMARY KEY AUTOINCREMENT,
    book_name VARCHAR(100) NOTNULL,
    author id INT

FOREIGN KEY (author_id) REFERENCES author(author_id)

)

ALTER TABLE book
ADD CONSTRAINT fk_author_book
FOREIGN KEY (author_id) REFERENCES author (author_id)

SELECT book.book_name, author.author_name FROM book
INNER JOIN author ON books.author_id = author.author_id

-- ============ 8 билет

DELETE FROM users
WHERE is active = FALSE;

DELETE FROM users
WHERE is_active = 0;

DELETE FROM users
WHERE last_login < CURRENT_DATE - INTERVAL '1 year';

-- ============ 9 билет

CREATE TABLE Groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL UNIQUE,
    course INT NOT NULL
);

CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    department VARCHAR(100)
);

CREATE TABLE Subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE Classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL,
    building VARCHAR(50) NOT NULL,
    CONSTRAINT uq_classroom UNIQUE (room_number, building)
);

CREATE TABLE Time_Slots (
    slot_id INT PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);


CREATE TABLE Schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_date DATE NOT NULL,
    slot_id INT NOT NULL,
    group_id INT NOT NULL,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    classroom_id INT NOT NULL,
    lesson_type VARCHAR(50),
    
FOREIGN KEY (slot_id) REFERENCES Time_Slots(slot_id),
FOREIGN KEY (group_id) REFERENCES Groups(group_id),
FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
FOREIGN KEY (classroom_id) REFERENCES Classrooms(classroom_id),


-- ============ 10 билет


SELECT 
    category AS [Категория],
    COUNT(prodID) AS [Количество товаров]
FROM Products
GROUP BY category;


-- ============ 11 билет

INSERT INTO Schedule (lesson_date, slot_id, group_id, teacher_id, subject_id, classroom_id, lesson_type)
SELECT 
    '2026-09-14',                                      
    1,                                                 
    (SELECT group_id FROM Groups WHERE group_name = '999'), 
    (SELECT teacher_id FROM Teachers WHERE last_name = 'Капуста' AND first_name = 'Игнат'),
    (SELECT subject_id FROM Subjects WHERE subject_name = 'Теоретическая математика'),
    (SELECT classroom_id FROM Classrooms WHERE room_number = '42-А' AND building = 'Левое полушарие'),
    'Лекция';                                          -

-- ============ 12 билет

CREATE VIEW v_readable_schedule AS
SELECT 
    s.schedule_id,
    s.lesson_date AS "Дата",

    CASE DAYOFWEEK(s.lesson_date)
        WHEN 1 THEN 'Воскресенье'
        WHEN 2 THEN 'Понедельник'
        WHEN 3 THEN 'Вторник'
        WHEN 4 THEN 'Среда'
        WHEN 5 THEN 'Четверг'
        WHEN 6 THEN 'Пятница'
        WHEN 7 THEN 'Суббота'
    END AS "День недели",
    
    ts.slot_id AS "Номер пары",
    CONCAT(TIME_FORMAT(ts.start_time, '%H:%i'), ' - ', TIME_FORMAT(ts.end_time, '%H:%i')) AS "Время",
    g.group_name AS "Группа",
    sub.subject_name AS "Предмет",
    s.lesson_type AS "Тип занятия",
    
    CONCAT(t.last_name, ' ', LEFT(t.first_name, 1), '.', 
        IF(t.middle_name IS NOT NULL, CONCAT(LEFT(t.middle_name, 1), '.'), '')) AS "Преподаватель",
    CONCAT(c.room_number, ' (', c.building, ')') AS "Аудитория"

FROM Schedule s
JOIN Time_Slots ts ON s.slot_id = ts.slot_id
JOIN Groups g       ON s.group_id = g.group_id
JOIN Subjects sub   ON s.subject_id = sub.subject_id
JOIN Teachers t     ON s.teacher_id = t.teacher_id
JOIN Classrooms c   ON s.classroom_id = c.classroom_id;

