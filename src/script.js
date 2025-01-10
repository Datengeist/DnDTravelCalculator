const translations ={
    "en" : null,
    "de" : null
}
const images = Array.from(document.getElementsByClassName('image'));
const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
let lang = 'en';

function loadTranslations(lang){
    fetch(`../lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            translations[lang] = data; 
            updateContent(lang);
        });
}

function updateContent(lang){
    const translationKeys = Object.keys(translations[lang]);
    translationKeys.forEach(key => {
        const elements = document.querySelectorAll(`[id="${key}"]`);
        elements.forEach(element => {
            element.innerHTML = translations[lang][key];
        });
    });
}

function toggleDarkMode(){
    document.body.setAttribute('darkMode', document.body.getAttribute('darkMode') === 'false');
    
}

document.getElementById('langSelect').addEventListener('change', (event) => {
    lang = event.target.value;
    loadTranslations(lang);
});
//unitSelect
function updateUnits(unitType, lang) {
    const speedUnit = translations[lang][`${unitType}SpeedUnit`];
    const distanceUnit = translations[lang][`${unitType}DistanceUnit`];
    
    document.querySelectorAll('.unit').forEach(label => {
        label.textContent = distanceUnit;
    });
}

unitSelect.addEventListener('change', (event) => {
    const unitType = unitSelect.value;
    updateUnits(unitType, lang);
});
  


loadTranslations(lang);