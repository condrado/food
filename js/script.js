import { navigateTo } from "./helpers/router.js";
import { renderMenus } from "./helpers/menuRenderer.js";
import { renderShoppingList } from "./helpers/shoppingListRenderer.js";

console.log("App ready");

// Initial Render
renderMenus('menus');
renderShoppingList('shopping-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Buttons (Bottom Nav)
  document.getElementById('nav-menus').addEventListener('click', () => {
    navigateTo('menus');
  });

  document.getElementById('nav-list').addEventListener('click', () => {
    navigateTo('shopping-list');
  });

  // Header Title Navigation (Home)
  document.getElementById('app-title').addEventListener('click', () => {
    navigateTo('home');
  });
  // Back Buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo('home');
    });
  });
});