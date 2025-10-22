const box = document.getElementById("box");
const controls = document.getElementById("controlsBox");
const closeControls = document.getElementById("closeControls");
const controlsIcon = document.getElementById("controlsIcon");
const body = document.body; 

const boxText = document.getElementById("boxText");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");
const boxWidth = document.getElementById("boxWidth");
const borderRadius = document.getElementById("borderRadius");
const blur = document.getElementById("blur");
const transparency = document.getElementById("transparency");
const resetBtn = document.getElementById("resetBtn");

const panelBg = document.getElementById("panelBg");
const panelText = document.getElementById("panelText");
const panelWidth = document.getElementById("panelWidth");
const panelRadius = document.getElementById("panelRadius");
const panelBlur = document.getElementById("panelBlur");
const panelTransparency = document.getElementById("panelTransparency");
const resetPanelBtn = document.getElementById("resetPanelBtn");

const tabGeneralBtn = document.getElementById("tabGeneral");
const tabBoxBtn = document.getElementById("tabBox");
const tabControlsBtn = document.getElementById("tabControls");
const tabIconBtn = document.getElementById("tabIcon");

const generalSettings = document.getElementById("generalSettings");
const boxSettings = document.getElementById("boxSettings");
const panelSettings = document.getElementById("panelSettings");
const iconSettings = document.getElementById("iconSettings");

const iconColor = document.getElementById("iconColor");
const iconBg = document.getElementById("iconBg");
const iconTransparency = document.getElementById("iconTransparency");
const iconBlur = document.getElementById("iconBlur");
const icon = document.getElementById("controlsIcon");
const iconRadius = document.getElementById("iconRadius");
const resetIconBtn = document.getElementById("resetIconBtn");

const lightModeBtn = document.getElementById("lightModeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

function hexToRgb(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `${r}, ${g}, ${b}`;
}

const sliders = document.querySelectorAll('input[type="range"]');
function updateSliderFill(slider) {
  const min = Number(slider.min || 0);
  const max = Number(slider.max || 100);
  const val = Number(slider.value || 0);
  const percent = ((val - min) / (max - min)) * 100;
  slider.style.setProperty("--value", `${percent}%`);
}
function syncSliders() {
  sliders.forEach(updateSliderFill);
}

function setActiveTab(btn) {
  [tabGeneralBtn, tabBoxBtn, tabControlsBtn, tabIconBtn].forEach(b => b && b.classList.remove("active"));
  btn && btn.classList.add("active");
}

function showOnly(elToShow) {
  const allTabs = [generalSettings, boxSettings, panelSettings, iconSettings];

  allTabs.filter(el => el !== elToShow).forEach(el => {
    if (!el) return;
    if (el.style.display !== "none") {
      el.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
      el.style.maxHeight = "0";
      el.style.opacity = "0";
      setTimeout(() => { el.style.display = "none"; }, 300);
    }
  });

  if (elToShow) {
    elToShow.style.display = "block";
    elToShow.style.maxHeight = "0";
    elToShow.style.opacity = "0";
    requestAnimationFrame(() => {
      elToShow.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
      elToShow.style.maxHeight = elToShow.scrollHeight + "px";
      elToShow.style.opacity = "1";
    });
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    lightModeBtn.classList.remove('active');
    darkModeBtn.classList.add('active');

    panelBg.value = '#222222';
    panelText.value = '#ffffff';

    bgColor.value = '#111111';
    textColor.value = '#eeeeee';
    iconBg.value = '#111111';
    iconColor.value = '#ffffff';
  } else {
    body.classList.remove('dark');
    lightModeBtn.classList.add('active');
    darkModeBtn.classList.remove('active');

    panelBg.value = '#ffffff';
    panelText.value = '#000000';

    bgColor.value = '#ffffff';
    textColor.value = '#ffffff';
    iconBg.value = '#ffffff';
    iconColor.value = '#ffffff';
  }

  updateBox();
  updatePanel();
  updateIcon();
  syncSliders();
}

if (lightModeBtn && darkModeBtn) {
  lightModeBtn.addEventListener('click', () => applyTheme('light'));
  darkModeBtn.addEventListener('click', () => applyTheme('dark'));
}

function updateBox() {
  box.textContent = boxText.value;

  box.style.setProperty('--color-box-bg-base', hexToRgb(bgColor.value)); 
  box.style.backgroundColor = `rgba(${hexToRgb(bgColor.value)}, ${transparency.value / 100})`;

  box.style.color = textColor.value;
  box.style.width = boxWidth.value + "px";
  box.style.borderRadius = borderRadius.value + "px";
  box.style.backdropFilter = `blur(${blur.value}px)`;
}

[boxText, bgColor, textColor, boxWidth, borderRadius, blur, transparency].forEach(input => {
  input.addEventListener("input", () => {
    updateBox();
    updateSliderFill(input);
  });
});

resetBtn.addEventListener("click", () => {

  boxText.value = "Cool Button"; 
  bgColor.value = "#ffffff";
  textColor.value = "#ffffff";
  boxWidth.value = 200;
  borderRadius.value = 8;
  blur.value = 3;
  transparency.value = 5; 
  updateBox();
  syncSliders();
});

function updatePanel() {

  controls.style.setProperty('--color-panel-bg-base', hexToRgb(panelBg.value));
  controls.style.backgroundColor = `rgba(${hexToRgb(panelBg.value)}, ${panelTransparency.value / 100})`;

  controls.style.color = panelText.value;
  controls.style.width = panelWidth.value + "px";
  controls.style.borderRadius = panelRadius.value + "px";
  controls.style.backdropFilter = `blur(${panelBlur.value}px)`;
}

[panelBg, panelText, panelWidth, panelRadius, panelBlur, panelTransparency].forEach(input => {
  input.addEventListener("input", () => {
    updatePanel();
    updateSliderFill(input);
  });
});

resetPanelBtn.addEventListener("click", () => {

  panelBg.value = "#ffffff";
  panelText.value = "#000000";
  panelWidth.value = 300;
  panelRadius.value = 12;
  panelBlur.value = 100;
  panelTransparency.value = 80; 
  updatePanel();
  syncSliders();
});

const iconSvg = controlsIcon ? controlsIcon.querySelector("svg") : null;

function updateIcon() {
  if (iconSvg && iconColor) iconSvg.style.color = iconColor.value;

  if (controlsIcon && iconBg) {
    controlsIcon.style.setProperty('--color-icon-bg-base', hexToRgb(iconBg.value));
    controlsIcon.style.backgroundColor = `rgba(${hexToRgb(iconBg.value)}, ${iconTransparency.value / 100})`;
  }

  if (controlsIcon && iconBlur) controlsIcon.style.backdropFilter = `blur(${iconBlur.value}px)`;
  if (controlsIcon && iconRadius) controlsIcon.style.borderRadius = iconRadius.value + "px"; 
}

if (iconColor && iconBg && iconTransparency && iconBlur && iconRadius) {
  [iconColor, iconBg, iconTransparency, iconBlur, iconRadius].forEach(input => {
    input.addEventListener("input", () => {
      updateIcon();
      updateSliderFill(input);
    });
  });
}

if (resetIconBtn) {
  resetIconBtn.addEventListener("click", () => {

    if (iconColor) iconColor.value = "#ffffff";
    if (iconBg) iconBg.value = "#ffffff"; 
    if (iconTransparency) iconTransparency.value = 5; 
    if (iconBlur) iconBlur.value = 3; 
    if (iconRadius) iconRadius.value = 50; 
    updateIcon();
    syncSliders();
  });
}

if (controlsIcon && controls) {

  function setTransformOriginToIcon() {
    const iconRect = controlsIcon.getBoundingClientRect();
    const panelRect = controls.getBoundingClientRect();

    const originX = ((iconRect.left + iconRect.width / 2) - panelRect.left) / panelRect.width * 100;
    const originY = ((iconRect.top + iconRect.height / 2) - panelRect.top) / panelRect.height * 100;

    controls.style.transformOrigin = `${originX}% ${originY}%`;
  }

  function openPanel() {
    setTransformOriginToIcon();

    controls.style.display = "block"; 

    requestAnimationFrame(() => {
      controls.classList.add("open");
      controls.style.opacity = "1";
      controls.style.transform = "scale(1)";
    });

    controlsIcon.style.transition = "transform 0.35s cubic-bezier(0.25,1,0.5,1), opacity 0.25s ease";
    controlsIcon.style.transform = "scale(0.7) rotate(45deg)";
    controlsIcon.style.opacity = "0";
    controlsIcon.style.pointerEvents = "none";
  }

  function closePanel() {
    setTransformOriginToIcon();

    controls.classList.remove("open");
    controls.style.opacity = "0";
    controls.style.transform = "scale(0.4)";

    setTimeout(() => {
      controls.style.display = "none";
    }, 350);

    controlsIcon.style.pointerEvents = "auto";
    controlsIcon.style.transform = "scale(1) rotate(0deg)";
    controlsIcon.style.opacity = "1";
  }

  controlsIcon.addEventListener("click", openPanel);
  closeControls.addEventListener("click", closePanel);
}

function makeDraggable(el) {
  let isDragging = false, offsetX, offsetY;
  let isPanelDrag = false;
  const isControlsPanel = el.id === 'controlsBox';

  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start, { passive: false });

  function start(e) {
    const target = e.target;

    if (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "BUTTON" || target.closest('.controls-content-wrapper')) return;

    if (isControlsPanel) {
      const header = el.querySelector('.controls-header');
      if (!header || !header.contains(target)) {
        isPanelDrag = false;
        return; 
      }
      isPanelDrag = true;
    }

    isDragging = true;
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", end);
  }

  function move(e) {
    if (!isDragging) return;

    if (isControlsPanel && !isPanelDrag) return; 

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    el.style.left = clientX - offsetX + "px";
    el.style.top = clientY - offsetY + "px";
    el.style.transform = "none";
    e.preventDefault();
  }

  function end() {
    isDragging = false;
    isPanelDrag = false; 
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", end);
  }
}

makeDraggable(box);
makeDraggable(controlsIcon);
makeDraggable(controls); 

function switchTab(showEl, ...hideEls) {
  showOnly(showEl, ...hideEls);
}

setActiveTab(tabGeneralBtn);
switchTab(generalSettings, boxSettings, panelSettings, iconSettings);

if (tabGeneralBtn && generalSettings) {
  tabGeneralBtn.addEventListener("click", () => {
    setActiveTab(tabGeneralBtn);
    switchTab(generalSettings, boxSettings, panelSettings, iconSettings);
  });
}

tabBoxBtn.addEventListener("click", () => {
  setActiveTab(tabBoxBtn);
  switchTab(boxSettings, generalSettings, panelSettings, iconSettings);
});

tabControlsBtn.addEventListener("click", () => {
  setActiveTab(tabControlsBtn);
  switchTab(panelSettings, generalSettings, boxSettings, iconSettings);
});

if (tabIconBtn && iconSettings) {
  tabIconBtn.addEventListener("click", () => {
    setActiveTab(tabIconBtn);
    switchTab(iconSettings, generalSettings, boxSettings, panelSettings);
  });
}

resetBtn.click();
resetPanelBtn.click();
if (resetIconBtn) resetIconBtn.click();
applyTheme(body.classList.contains('dark') ? 'dark' : 'light');