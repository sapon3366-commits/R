// DOM 元素
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// 顯示/隱藏密碼
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
});

// 表單驗證
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // 至少 6 個字元
    return password.length >= 6;
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}

// 輸入驗證
emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (email && !validateEmail(email)) {
        showError(emailError, '請輸入有效的電子郵件地址');
    } else {
        clearError(emailError);
    }
});

passwordInput.addEventListener('blur', () => {
    const password = passwordInput.value;
    if (password && !validatePassword(password)) {
        showError(passwordError, '密碼至少需要 6 個字元');
    } else {
        clearError(passwordError);
    }
});

// 清除錯誤訊息當使用者開始輸入時
emailInput.addEventListener('input', () => {
    clearError(emailError);
    messageDiv.style.display = 'none';
});

passwordInput.addEventListener('input', () => {
    clearError(passwordError);
    messageDiv.style.display = 'none';
});

// 表單提交處理
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 清除之前的錯誤訊息
    clearError(emailError);
    clearError(passwordError);
    messageDiv.style.display = 'none';
    
    // 獲取表單資料
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // 驗證
    let isValid = true;
    
    if (!email) {
        showError(emailError, '請輸入電子郵件');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailError, '請輸入有效的電子郵件地址');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordError, '請輸入密碼');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordError, '密碼至少需要 6 個字元');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // 顯示載入狀態
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // 模擬 API 請求（實際應用中應該連接到真實的後端 API）
    try {
        // 這裡模擬一個 API 請求延遲
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 模擬驗證邏輯（實際應用中應該由後端處理）
        // 這裡使用簡單的測試帳號：test@example.com / password123
        if (email === 'test@example.com' && password === 'password123') {
            // 如果選擇記住我，將資料存儲到 localStorage
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            showMessage('登入成功！正在跳轉...', 'success');
            
            // 實際應用中應該跳轉到主頁面
            setTimeout(() => {
                alert('登入成功！\n\n（這是示範頁面，實際應用中會跳轉到主頁面）');
                // window.location.href = '/dashboard';
            }, 1500);
        } else {
            showMessage('電子郵件或密碼錯誤，請重新輸入', 'error');
        }
    } catch (error) {
        showMessage('登入時發生錯誤，請稍後再試', 'error');
        console.error('Login error:', error);
    } finally {
        // 恢復按鈕狀態
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});

// 頁面載入時檢查是否有記住的電子郵件
window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

// 註冊連結點擊事件（示範用）
document.getElementById('signupLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('註冊功能尚未實作\n\n（這是示範頁面）');
});

// 忘記密碼連結點擊事件（示範用）
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('忘記密碼功能尚未實作\n\n（這是示範頁面）');
});

