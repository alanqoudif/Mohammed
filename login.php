<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "school_db";

// إنشاء اتصال بقاعدة البيانات
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$user = $_POST['username'];
$pass = $_POST['password'];

// حماية من حقن SQL
$user = $conn->real_escape_string($user);
$pass = $conn->real_escape_string($pass);

// التحقق من صحة بيانات المستخدم
$sql = "SELECT id, user_type FROM users WHERE username='$user' AND password='$pass'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // حفظ بيانات المستخدم في الجلسة
    $row = $result->fetch_assoc();
    $_SESSION['username'] = $user;
    $_SESSION['user_type'] = $row['user_type'];
    $_SESSION['user_id'] = $row['id'];
    
    // الانتقال إلى الصفحة الرئيسية بعد نجاح تسجيل الدخول
    header("Location: home.html");
} else {
    echo "اسم المستخدم أو كلمة المرور غير صحيحة.";
}

$conn->close();
?>
