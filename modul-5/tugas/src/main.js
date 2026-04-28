// DARK MODE
function toggleDark() {
  document.documentElement.classList.toggle("dark");

  const theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem("theme", theme);
}

// LOAD THEME SAAT REFRESH
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

// MOBILE MENU
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

// Biar bisa dipakai di HTML onclick
window.toggleDark = toggleDark;
window.toggleMenu = toggleMenu;

// INIT
loadTheme();
