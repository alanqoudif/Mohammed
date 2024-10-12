document.getElementById("loginButton").addEventListener("click", function() {
    // تأكد من أن المستخدم قد قام بتسجيل الدخول بنجاح
    // هنا يمكنك إضافة كود التحقق من بيانات الدخول
    var loginSuccessful = true; // قم بتغيير هذه القيم بناءً على حالة تسجيل الدخول

    if (loginSuccessful) {
        // إعادة توجيه إلى الصفحة الرئيسية
        window.location.href = "index.html"; // رابط الصفحة الرئيسية
    } else {
        alert("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }
});
