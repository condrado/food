import { compra } from "../data.js";

export function renderShoppingList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // Clear existing content

  const header = document.createElement('h2');
  header.textContent = 'Mi Lista de Compra';
  container.appendChild(header);

  const listContainer = document.createElement('div');
  listContainer.className = 'shopping-list-container';

  if (!compra || compra.length === 0) {
    listContainer.innerHTML = '<p class="empty-msg">No hay elementos en la lista.</p>';
    container.appendChild(listContainer);
    return;
  }

  compra.forEach((itemText, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'shopping-item';
    
    // Create Checkbox UI
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox';
    checkbox.innerHTML = '✔';

    const text = document.createElement('span');
    text.className = 'item-text';
    text.textContent = itemText;

    itemEl.appendChild(checkbox);
    itemEl.appendChild(text);

    // Toggle interaction
    itemEl.addEventListener('click', () => {
      itemEl.classList.toggle('checked');
    });

    listContainer.appendChild(itemEl);
  });

  container.appendChild(listContainer);
}
