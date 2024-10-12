



// وظيفة تسجيل الدخول
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // تحقق من اسم المستخدم وكلمة المرور (مثال بسيط)
    if (username === "teacher" && password === "1234") {
        var user = { username: username, role: "مدرس" }; // تعيين صلاحيات المدرس
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "index.html"; // إعادة توجيه إلى الصفحة الرئيسية
    } else if (username === "admin" && password === "admin") {
        var user = { username: username, role: "إداري" }; // تعيين صلاحيات الإداري
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "index.html"; // إعادة توجيه إلى الصفحة الرئيسية
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
}
