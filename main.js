const themeBtn = document.getElementById('theme-selector');
const body = document.body;
// apply the cached theme on reload
const theme = localStorage.getItem('theme');
const themeIcon = localStorage.getItem('theme-icon')
if(theme) body.classList.add(theme);
if(themeIcon) themeBtn.innerText = themeIcon;

// add event listener - theme toggler
themeBtn.addEventListener('click', ()=> {    
    if(body.classList.contains('light')){
        body.classList.replace('light', 'dark');
        themeBtn.innerText = "🌞";
        localStorage.setItem('theme','dark');
        localStorage.setItem('theme-icon', '🌞');
    }else{
        body.classList.replace('dark', 'light');
        themeBtn.innerText = "🌚";
        localStorage.setItem('theme','light')
        localStorage.setItem('theme-icon', '🌚');
    }
})
