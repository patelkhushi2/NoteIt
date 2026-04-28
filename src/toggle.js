
const themeToggleBtn = document.getElementById("themeToggle");
const settingsThemeBtn = document.getElementById("settingsThemeBtn");
const accentPresetButtons = Array.from(document.querySelectorAll(".accent-preset"));

function applyAccent(color, rgb, presetName) {
  document.documentElement.style.setProperty("--accent-color", color);
  document.documentElement.style.setProperty("--accent-rgb", rgb);
  accentPresetButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.accentName === presetName);
  });
}

function syncThemeLabels(isLight) {
  themeToggleBtn.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  if (settingsThemeBtn) {
    settingsThemeBtn.textContent = isLight ? "Dark Mode" : "Light Mode";
  }
}

themeToggleBtn.addEventListener("click", function() {
  const isLight = document.body.classList.toggle("light-mode");
  syncThemeLabels(isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  document.body.classList.add("light-mode");
}

syncThemeLabels(document.body.classList.contains("light-mode"));

accentPresetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { accentColor, accentRgb, accentName } = button.dataset;
    applyAccent(accentColor, accentRgb, accentName);
    localStorage.setItem("accentColor", accentColor);
    localStorage.setItem("accentRgb", accentRgb);
    localStorage.setItem("accentName", accentName);
  });
});

const storedAccentColor = localStorage.getItem("accentColor");
const storedAccentRgb = localStorage.getItem("accentRgb");
const storedAccentName = localStorage.getItem("accentName");

if (storedAccentColor && storedAccentRgb && storedAccentName) {
  applyAccent(storedAccentColor, storedAccentRgb, storedAccentName);
} else {
  const defaultPreset = accentPresetButtons.find((button) => button.classList.contains("active")) || accentPresetButtons[0];
  if (defaultPreset) {
    applyAccent(defaultPreset.dataset.accentColor, defaultPreset.dataset.accentRgb, defaultPreset.dataset.accentName);
  }
}
