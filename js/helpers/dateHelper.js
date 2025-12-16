export function getCurrentCycleWeek() {
  const startDate = new Date('2025-12-08T00:00:00');
  const today = new Date();
  
  // Reset hours to compare dates only
  today.setHours(0, 0, 0, 0);

  // If today is before start date, default to Week 1
  if (today < startDate) return 1;

  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Calculate weeks passed (0-indexed)
  // Day 1 (Diff 0) -> Week 0
  // Day 8 (Diff 7) -> Week 1
  const weeksPassed = Math.floor(diffDays / 7);
  
  // Modulo 3 to get cycle (0, 1, 2) and add 1 for display (1, 2, 3)
  return (weeksPassed % 3) + 1;
}

export function getFormattedDateTime() {
  const now = new Date();
  // Example: "lunes, 16:05"
  const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
  const str = now.toLocaleDateString('es-ES', options);
  // Capitalize: "Lunes, 16:05"
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getActiveMeal(horarios) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const [key, range] of Object.entries(horarios)) {
    const [startStr, endStr] = range.split(' - ');
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM] = endStr.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return key;
    }
  }
  return null;
}
