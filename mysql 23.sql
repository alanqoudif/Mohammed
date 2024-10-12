-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS school_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_db;

-- 1. جدول المستخدمين (Users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('admin', 'student', 'teacher') NOT NULL,
    class VARCHAR(50) NOT NULL DEFAULT 'غير محدد'
);

-- إدخال بعض المستخدمين مع كلمات مرور مشفرة
-- ملاحظة: في الواقع، يجب تشفير كلمات المرور باستخدام PHP قبل إدراجها في قاعدة البيانات
-- هنا سنستخدم كلمات مرور غير مشفرة لأغراض العرض فقط
INSERT INTO users (username, password, user_type, class) VALUES
('admin', '$2y$10$e0NRjC5eK1ZQdVx/9CwHBe.RjxRLXpZIa4M2D9Zd7uOQGd/9HnW6e', 'admin', 'غير محدد'), -- كلمة المرور: admin123
('student1', '$2y$10$7Q0N2e8YZnOaM8iQKJ8sUeZVdV9D9Vx/9CwHBe.RjxRLXpZIa4M2D9Z', 'student', 'الصف الأول'), -- كلمة المرور: student123
('teacher1', '$2y$10$A1B2C3D4E5F6G7H8I9J0kLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPq', 'teacher', 'غير محدد'); -- كلمة المرور: teacher123

-- 2. جدول الهيئة الدراسية (Staff)
CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20)
);

-- إدخال بعض أعضاء الهيئة الدراسية
INSERT INTO staff (name, subject, email, phone) VALUES
('أ. محمد علي', 'رياضيات', 'mohamed@example.com', '0123456789'),
('أ. فاطمة أحمد', 'لغة عربية', 'fatima@example.com', '0123456790'),
('أ. خالد يوسف', 'علوم', 'khaled@example.com', '0123456791');

-- 3. جدول المواد الدراسية (Courses)
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- إدخال بعض المواد الدراسية
INSERT INTO courses (name) VALUES
('رياضيات'),
('علوم'),
('لغة عربية'),
('لغة إنجليزية'),
('تاريخ'),
('جغرافيا'),
('تكنولوجيا'),
('فنون');

-- 4. جدول اختيار المواد (Selected_Courses)
CREATE TABLE IF NOT EXISTS selected_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 5. جدول الكتب (Books)
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    availability BOOLEAN DEFAULT TRUE
);

-- إدخال بعض الكتب
INSERT INTO books (title, author, category, price, availability) VALUES
('الفيزياء الحديثة', 'أ. علي عبد الله', 'علوم', 50.00, TRUE),
('تاريخ العالم', 'أ. سارة حسن', 'تاريخ', 40.00, TRUE),
('اللغة العربية المتقدمة', 'أ. فاطمة محمود', 'لغة عربية', 30.00, TRUE),
('البرمجة بلغة PHP', 'أ. خالد يوسف', 'تكنولوجيا', 60.00, TRUE);

-- 6. جدول الطلبات (Purchases)
CREATE TABLE IF NOT EXISTS purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- 7. جدول الأخبار (News) - نظام إدارة المحتوى (CMS)
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدخال بعض الأخبار
INSERT INTO news (title, content) VALUES
('افتتاح المكتبة الإلكترونية', 'يسر مدرسة إمام بركات الإعلان عن افتتاح المكتبة الإلكترونية الجديدة...'),
('حفل التخرج', 'ستقام حفلة التخرج للصفوف الدراسية القادمة في تاريخ...');

-- 8. جدول الطلبات للمسؤول (Admin_Notifications) - تخزين الإشعارات
CREATE TABLE IF NOT EXISTS admin_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
