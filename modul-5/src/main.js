import "./style.css";

const btn = document.getElementById("toggleDark");
const html = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  btn.textContent = "Light";
}

btn.addEventListener("click", () => {
  html.classList.toggle("dark");

  const isDark = html.classList.contains("dark");
  btn.textContent = isDark ? "Light" : "Dark";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});
