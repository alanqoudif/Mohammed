<?php
// استلام البيانات من النموذج
$student_name = $_POST['student_name'];
$class_grade = $_POST['class_grade'];
$subject = $_POST['subject'];

// هنا يمكنك إضافة كود لحفظ البيانات في قاعدة البيانات
// أو أي عملية أخرى مثل إرسال رسالة تأكيد

echo "تم اختيار المادة: " . $subject . " للطالب: " . $student_name . " في الصف: " . $class_grade;
?>
