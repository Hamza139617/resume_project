const logoBtn = document.getElementById('logo-btn')
const sidebar = document.getElementById('sidebar')
const sidebarText = sidebar.querySelectorAll('.nav-text')
const sidebarOverlay = document.getElementById('sidebarOverlay')

logoBtn.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');

    sidebarText.forEach((sideText) => {
        sideText.classList.toggle('text-hidden');
    });
});


sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
    sidebarText.forEach((sideText) => {
        sideText.classList.add('text-hidden');
    });
});

