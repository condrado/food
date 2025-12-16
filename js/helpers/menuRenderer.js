import { menu, horarios_diarios } from "../data.js";
import { getActiveMeal } from "./dateHelper.js";

const SECTION_TITLES = {
  "desayuno": "Desayuno",
  "media_manana": "Media Mañana",
  "comida_principal_tupper": "Comida",
  "merienda": "Merienda",
  "cena_ligera": "Cena"
};

const TIME_TO_MENU_MAP = {
  "desayuno": "desayuno",
  "media_manana": "media_manana",
  "comida": "comida_principal_tupper",
  "merienda": "merienda",
  "cena": "cena_ligera"
};

export function renderMenus(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // Clear existing content

  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  // Determine active meal based on time
  const activeTimeKey = getActiveMeal(horarios_diarios);
  const activeMenuKey = activeTimeKey ? TIME_TO_MENU_MAP[activeTimeKey] : null;

  Object.keys(menu).forEach(key => {
    const sectionTitle = SECTION_TITLES[key] || key;
    const items = menu[key];
    
    // Check if this section should be expanded
    const isExpanded = (key === activeMenuKey);

    // Accordion Item
    const itemEl = document.createElement('div');
    itemEl.className = `accordion-item ${isExpanded ? 'open' : ''}`;

    // Header
    const headerBtn = document.createElement('button');
    headerBtn.className = 'accordion-header';
    headerBtn.innerHTML = `
      <span>${sectionTitle}</span>
      <span class="icon">${isExpanded ? '-' : '+'}</span>
    `;
    
    // Content Container
    const contentEl = document.createElement('div');
    contentEl.className = 'accordion-content';
    
    // Render list of options/dishes
    const optionsList = document.createElement('div');
    optionsList.className = 'menu-options';

    items.forEach(option => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      
      // Determine what to show based on available fields
      const title = option.opcion || option.plato || 'Opción';
      const description = option.descripcion ? `<p class="menu-desc">${option.descripcion}</p>` : '';
      const ingredients = option.ingredientes_necesarios ? 
        `<p class="menu-ingredients"><small>📝 ${option.ingredientes_necesarios.join(', ')}</small></p>` : '';

      card.innerHTML = `
        <h3>${title}</h3>
        ${description}
        ${ingredients}
      `;
      
      // Toggle "Used/Eaten" state
      card.addEventListener('click', (e) => {
        // Prevent toggling if selecting text (optional, but good UX)
        // For simplicity, just toggle
        card.classList.toggle('used');
      });

      optionsList.appendChild(card);
    });

    contentEl.appendChild(optionsList);

    // Toggle logic
    headerBtn.addEventListener('click', () => {
      const isOpen = itemEl.classList.contains('open');
      
      // Close all others (optional, but good for mobile)
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.icon').textContent = '+';
      });

      if (!isOpen) {
        itemEl.classList.add('open');
        headerBtn.querySelector('.icon').textContent = '-';
      }
    });

    itemEl.appendChild(headerBtn);
    itemEl.appendChild(contentEl);
    accordionContainer.appendChild(itemEl);
  });

  container.innerHTML = '<h2>Menús Semanales</h2>';
  container.appendChild(accordionContainer);
}
