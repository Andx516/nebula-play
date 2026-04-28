const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();
  if (!response.ok) {
    throw new Error(data?.error || data || 'Ocurrió un error.');
  }
  return data;
}

function setActiveNav() {
  const current = window.location.pathname;
  $$('.nav-link[data-match]').forEach((link) => {
    if (current.includes(link.dataset.match)) link.classList.add('active');
  });
}

async function ensureAuth(allowed = []) {
  try {
    const { user } = await api('/api/auth/me');
    if (!user) {
      window.location.href = '/';
      return null;
    }
    if (allowed.length && !allowed.includes(user.tipo_usuario)) {
      window.location.href = user.tipo_usuario === 'empresa' ? '/pages/company.html' : user.tipo_usuario === 'admin' ? '/pages/admin.html' : '/pages/profile.html';
      return null;
    }
    return user;
  } catch {
    window.location.href = '/';
    return null;
  }
}

async function logout() {
  await api('/api/auth/logout', { method: 'POST' });
  window.location.href = '/';
}

function bindLogout() {
  $$('.js-logout').forEach((btn) => btn.addEventListener('click', logout));
}

function toast(target, message, type = 'notice') {
  if (!target) return;
  target.textContent = message;
  target.className = type;
}

function serializeForm(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    loginMessage.textContent = "";

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        loginMessage.textContent = data.error || "No se pudo iniciar sesión.";
        loginMessage.style.color = "#ff6b6b";
        return;
      }

      loginMessage.textContent = "Inicio de sesión correcto.";
      loginMessage.style.color = "#7CFFB2";

      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (error) {
      console.error("Error en login:", error);
      loginMessage.textContent = "Error de conexión con el servidor.";
      loginMessage.style.color = "#ff6b6b";
    }
  });
}

window.Nebula = { $, $$, api, ensureAuth, bindLogout, toast, serializeForm, setActiveNav };
