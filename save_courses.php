<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "school_db";

// إنشاء اتصال بقاعدة البيانات
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

$subject1 = $_POST['subject1'];
$subject2 = $_POST['subject2'];

// حفظ المواد المختارة في قاعدة البيانات
$sql = "INSERT INTO selected_courses (subject1, subject2) VALUES ('$subject1', '$subject2')";
if ($conn->query($sql) === TRUE) {
    echo "تم حفظ المواد بنجاح!";
} else {
    echo "حدث خطأ أثناء حفظ البيانات: " . $conn->error;
}

$conn->close();
?>


<?php
session_start();

// التحقق من تسجيل الدخول ونوع المستخدم
if(!isset($_SESSION['username']) || ($_SESSION['user_type'] != 'admin' && $_SESSION['user_type'] != 'student')) {
    header("Location: home.html");
    exit();
}

// التحقق من البيانات المرسلة
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['courses'])) {
    $selected_courses = $_POST['courses'];
    $user_id = $_SESSION['user_id'];

    // الاتصال بقاعدة البيانات
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "school_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
    }

    // حذف الاختيارات السابقة
    $delete_sql = "DELETE FROM selected_courses WHERE user_id = '$user_id'";
    if ($conn->query($delete_sql) !== TRUE) {
        echo "خطأ في حذف الاختيارات السابقة: " . $conn->error;
        exit();
    }

    // إدراج الاختيارات الجديدة
    $stmt = $conn->prepare("INSERT INTO selected_courses (user_id, course_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $course_id);

    foreach ($selected_courses as $course_id) {
        $stmt->execute();
    }

    $stmt->close();
    $conn->close();

    header("Location: courses.php?success=1");
    exit();
} else {
    header("Location: courses.php?error=1");
    exit();
}
?>
