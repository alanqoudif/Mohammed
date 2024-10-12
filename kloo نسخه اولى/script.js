// script.js

// دالة لعرض رسالة ترحيبية ديناميكية
function displayWelcomeMessage() {
    var welcomeMessage = document.getElementById("welcome-message");
    var today = new Date();
    var hour = today.getHours();
    var greeting;
  
    if (hour < 12) {
      greeting = "صباح الخير!";
    } else if (hour < 18) {
      greeting = "مساء الخير!";
    } else {
      greeting = "مساء الخير!";
    }
  
    welcomeMessage.textContent = greeting + " نأمل أن تكون زيارتك للموقع مفيدة.";
  }
  
 // وظيفة لحجز الحصة الدراسية
function bookSession(button, day, time) {
  if (checkUserPrivileges()) {
      var confirmation = confirm("هل ترغب في حجز القاعة في يوم " + day + " من " + time + "?");

      if (confirmation) {
          alert("تم الحجز بنجاح!");
          button.disabled = true;
          button.textContent = "محجوز";
          saveBooking(day, time);
      }
  } else {
      alert("عذرًا، لا تمتلك الصلاحيات اللازمة لحجز القاعات.");
  }
}

// وظيفة للتحقق من صلاحيات المستخدم
function checkUserPrivileges() {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (loggedInUser && (loggedInUser.role === "مدرس" || loggedInUser.role === "إداري")) {
      return true;
  } else {
      return false;
  }
}

// وظيفة لتسجيل الخروج
function logout() {
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// وظيفة لحفظ الحجز في المخزن المحلي
function saveBooking(day, time) {
  var bookedSessions = JSON.parse(localStorage.getItem("bookedSessions")) || [];
  bookedSessions.push({ day: day, time: time });
  localStorage.setItem("bookedSessions", JSON.stringify(bookedSessions));
}

// وظيفة لتحقق من الحجوزات المخزنة وعرضها عند تحميل الصفحة
function checkBookedSessions() {
  var bookedSessions = JSON.parse(localStorage.getItem("bookedSessions")) || [];
  var tableButtons = document.querySelectorAll(".schedule-table button");

  tableButtons.forEach(function(button) {
      var day = button.parentNode.cellIndex;
      var time = button.parentNode.parentNode.firstChild.textContent.trim();
      var currentDay = document.querySelectorAll(".schedule-table th")[day].textContent.trim();

      bookedSessions.forEach(function(session) {
          if (session.day === currentDay && session.time === time) {
              button.disabled = true;
              button.textContent = "محجوز";
          }
      });
  });
}


// تسجيل الدخول وتحديد الصلاحيات
function login() {
  var username = document.getElementById("abmin ").value;
  var password = document.getElementById("112233").value;

  // تحقق من اسم المستخدم وكلمة المرور (مثال بسيط)
  if (username === "abmin" && password === "112233") {
      var user = { username: username, role: "مدرس" };
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html"; // إعادة توجيه إلى الصفحة الرئيسية
  } else if (username === "admin" && password === "112233") {
      var user = { username: username, role: "إداري" };
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html"; // إعادة توجيه إلى الصفحة الرئيسية
  } else {
      alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
}


// التحقق من الحجوزات عند تحميل الصفحة
window.onload = function() {
  checkBookedSessions();
};

  
  // وظيفة تحقق تسجيل الدخول
function validateLogin() {
    var username = document.getElementById("username ").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("login-error");

    // تحقق بسيط (يمكن استبداله بتطبيق حقيقي)
    if (username === "admin" && password === "112233") {
        localStorage.setItem("loggedIn", "true"); // تخزين حالة تسجيل الدخول
        window.location.href = "index.html"; // الانتقال إلى الصفحة الرئيسية
        return false;
    } else {
        errorMessage.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
        return false; // منع النموذج من الإرسال
    }
}

// وظيفة للتحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    var loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        window.location.href = "login.html"; // إعادة التوجيه إلى صفحة تسجيل الدخول
    }
}



// وظيفة لتسجيل الخروج
function logout() {
  // إزالة حالة تسجيل الدخول من المخزن المحلي أو الـ session
  localStorage.removeItem("loggedInUser"); // إذا كنت تستخدم localStorage لتخزين حالة المستخدم
  sessionStorage.removeItem("loggedInUser"); // إذا كنت تستخدم sessionStorage

  // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  window.location.href = "login.html";
}



// وظيفة تحقق تسجيل الدخول
function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMessage = document.getElementById("login-error");

  // تحقق بسيط (يمكن استبداله بتطبيق حقيقي)
  if (username === "admin" && password === "112233") 
  {
      localStorage.setItem("loggedIn", "true"); // تخزين حالة تسجيل الدخول
      window.location.href = "index.html"; // الانتقال إلى الصفحة الرئيسية
      return false;
  } else {
      errorMessage.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
      return false; // منع النموذج من الإرسال
  }
}

// وظيفة للتحقق من حالة تسجيل الدخول
function checkLoginStatus() {
  var loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
      window.location.href = "login.html"; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }
}


// تخزين الجداول الدراسية لكل مستخدم
var schedules = {
  "teacher1": {
      "الأحد": ["08:00 - 09:00", "رياضيات"],
      "الإثنين": ["09:00 - 10:00", "علوم"],
      // المزيد من الجداول هنا...
  },
  "student1": {
      "الأحد": ["08:00 - 09:00", "عربي"],
      "الإثنين": ["09:00 - 10:00", "تاريخ"],
      // المزيد من الجداول هنا...
  }
};

// تخزين البيانات في localStorage
localStorage.setItem("userSchedules", JSON.stringify(schedules));



// دالة لعرض الجدول الدراسي للمستخدم
function displayUserSchedule() {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  var schedules = JSON.parse(localStorage.getItem("userSchedules"));

  if (loggedInUser && schedules) {
      var userSchedule = schedules[loggedInUser.username];

      if (userSchedule) {
          var tableBody = document.querySelector(".schedule-table tbody");
          tableBody.innerHTML = ""; // تنظيف الجدول الحالي

          // إنشاء الجدول بناءً على جدول المستخدم
          for (var day in userSchedule) {
              var row = document.createElement("tr");

              // اليوم
              var dayCell = document.createElement("td");
              dayCell.textContent = day;
              row.appendChild(dayCell);

              // الحصص
              var classCell = document.createElement("td");
              classCell.textContent = userSchedule[day][1] + " (" + userSchedule[day][0] + ")";
              row.appendChild(classCell);

              tableBody.appendChild(row);
          }
      } else {
          alert("لم يتم العثور على جدول دراسي لهذا المستخدم.");
      }
  }
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = function() {
  displayUserSchedule();
};



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
