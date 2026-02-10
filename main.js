/* ===============================
   جلب العناصر
================================= */
const nameInput  = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const packageSel = document.getElementById("package");
const qtyInput   = document.getElementById("qty");
const totalBox   = document.getElementById("total");
const errorBox   = document.getElementById("error");

/* ===============================
   التحقق من الاسم
   - حروف عربية أو إنجليزية فقط
================================= */
function isValidName(name){
    return /^[A-Za-z\u0600-\u06FF\s]+$/.test(name);
}

/* ===============================
   التحقق من رقم الهاتف
   - يبدأ بـ 77 أو 78 أو 71 أو 73
   - 9 أرقام
================================= */
function isValidPhone(phone){
    return /^(77|78|71|73)[0-9]{7}$/.test(phone);
}

/* ===============================
   حساب السعر الإجمالي
================================= */
function calcTotal(){
    let price = Number(packageSel.value);
    let qty   = Number(qtyInput.value);

    if(price > 0 && qty > 0){
        let total = price * qty;
        totalBox.innerHTML = `السعر الإجمالي: ${total} ريال`;
        return total;
    }else{
        totalBox.innerHTML = "السعر الإجمالي: 0 ريال";
        return 0;
    }
}

packageSel.addEventListener("change", calcTotal);
qtyInput.addEventListener("input", calcTotal);

/* ===============================
   إرسال الطلب
================================= */
function sendOrder(){

    let name  = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let price = Number(packageSel.value);
    let qty   = Number(qtyInput.value);

    errorBox.innerHTML = "";

    /* ===== التحقق ===== */
    if(name === ""){
        errorBox.innerHTML = "❌ يرجى إدخال الاسم";
        return;
    }

    if(!isValidName(name)){
        errorBox.innerHTML = "❌ الاسم يجب أن يحتوي على حروف فقط";
        return;
    }

    if(!isValidPhone(phone)){
        errorBox.innerHTML = "❌ رقم الهاتف يجب أن يبدأ بـ 77 أو 78 أو 71 أو 73";
        return;
    }

    if(price <= 0){
        errorBox.innerHTML = "❌ يرجى اختيار الباقة";
        return;
    }

    if(qty <= 0){
        errorBox.innerHTML = "❌ الكمية غير صحيحة";
        return;
    }

    /* ===== الحساب ===== */
    let total   = calcTotal();
    let pkgText = packageSel.options[packageSel.selectedIndex].text;

    /* ===== رسالة واتساب ===== */
    let message =
`📡 طلب كرت إنترنت - شبكة لحظات
👤 الاسم: ${name}
📞 الهاتف: ${phone}
📦 الباقة: ${pkgText}
🔢 الكمية: ${qty}
💰 السعر الإجمالي: ${total} ريال`;

    let url = "https://wa.me/967736799518?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}
