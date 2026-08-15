

// adding the side bar animation 

const logoBtn = document.getElementById('logo-btn')
const sidebar = document.getElementById('sidebar')
const sidebarText = sidebar.querySelectorAll('.nav-text')

//listen for clicks on the logo
logoBtn.addEventListener('click', () =>{
    sidebar.classList.toggle('is-open');
    
    sidebarText.forEach((sideText) => {
        sideText.classList.toggle('hidden');
    })

});


