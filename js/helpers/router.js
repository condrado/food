/**
 * Simple Router/View Switcher
 * @param {string} viewId - The ID of the view to show (e.g., 'home', 'menus')
 */
export function navigateTo(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // Show target view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  } else {
    console.warn(`View with ID "${viewId}" not found.`);
  }
}
