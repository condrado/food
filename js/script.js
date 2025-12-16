import { navigateTo } from "./helpers/router.js";
import { renderMenus } from "./helpers/menuRenderer.js";
import { renderShoppingList } from "./helpers/shoppingListRenderer.js";
import { getCurrentCycleWeek, getFormattedDateTime } from "./helpers/dateHelper.js";

console.log("App ready");

// Initial Render
renderMenus('menus');
renderShoppingList('shopping-list');

// Function to update header with current date/time
function updateAppHeader() {
  document.getElementById('header-date').textContent = getFormattedDateTime();
  document.getElementById('header-week').textContent = `${getCurrentCycleWeek()}ª Semana`;
}

// Initial Update
updateAppHeader();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Buttons (Bottom Nav)
  document.getElementById('nav-menus').addEventListener('click', () => {
    updateAppHeader();
    navigateTo('menus');
  });

  document.getElementById('nav-list').addEventListener('click', () => {
    updateAppHeader();
    navigateTo('shopping-list');
  });

  // Header Title Navigation (Home)
  document.getElementById('app-title').addEventListener('click', () => {
    updateAppHeader();
    navigateTo('home');
  });
  // Back Buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateAppHeader();
      navigateTo('home');
    });
  });
});