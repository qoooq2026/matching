const API_URL = "https://script.google.com/macros/s/AKfycbxna_AGF5BSmpJ2y8Z5ayp9_9HKHX1S5th9ilZEF5fj8aF3g2u-F44klv_A5M1aVHPkCQ/exec";

function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

function requireLogin() {
  const user = getUser();
  if (!user) { location.href = "login.html"; return null; }
  return user;
}

function logout() {
  localStorage.removeItem("user");
  location.href = "login.html";
}

// 在每個有 header 的頁面呼叫，把用戶資訊注入 header
function renderHeaderUser() {
  const user = getUser();
  const el = document.getElementById("header-user");
  if (!el) return;
  if (user) {
    const roleLabel = user.role === "brand" ? "品牌方" : "寫手";
    const roleClass = user.role === "brand" ? "tag-brand" : "tag-writer";
    el.innerHTML = `
      <span class="user-name">${user.name}</span>
      <span class="user-role ${roleClass}">${roleLabel}</span>
      <a href="#" onclick="logout()">LOGOUT</a>
    `;
  } else {
    el.innerHTML = `<a href="login.html">LOGIN</a>`;
  }
}
