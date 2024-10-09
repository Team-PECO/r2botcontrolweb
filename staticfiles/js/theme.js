document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    // Function to set the theme
    function setTheme(theme) {
        body.className = `theme-${theme}`;
        localStorage.setItem('theme', theme);
    }

    // Apply saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    themeSelect.value = savedTheme;

    // Theme change event listener
    themeSelect.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
});