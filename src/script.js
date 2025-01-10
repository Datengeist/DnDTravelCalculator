const translations ={
    "en" : null,
    "de" : null
}
const images = Array.from(document.getElementsByClassName('image'));
const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
let lang = 'en';


//Language Updater
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
document.getElementById('langSelect').addEventListener('change', (event) => {
    lang = event.target.value;
    loadTranslations(lang);
    updateUnits(unitSelect.value, lang);
});
loadTranslations(lang);

//Dark Mode
function toggleDarkMode(){
    document.body.setAttribute('darkMode', document.body.getAttribute('darkMode') === 'false');
    
}

//Units Update
function updateUnits(unitType, lang) {
    loadTranslations(lang);
    if (!translations[lang]) return;
    const speedUnit = translations[lang][`${unitType}SpeedUnit`];
    const distanceUnit = translations[lang][`${unitType}DistanceUnit`];
    
    document.querySelectorAll('.unitLength').forEach(label => {
        label.textContent = distanceUnit;
    });
    document.querySelectorAll('.unitSpeed').forEach(label => {
        label.textContent = speedUnit;
    });

    const slowElement = document.querySelector('[value="speedSlow"]');
    slowElement.setAttribute('id', `${unitType}SpeedSlow`);
    slowElement.setAttribute('speed', translations[lang][`${unitType}SpeedSlowValue`]);

    const normalElement = document.querySelector('[value="speedNormal"]');
    normalElement.setAttribute('id', `${unitType}SpeedNormal`);
    normalElement.setAttribute('speed', translations[lang][`${unitType}SpeedNormalValue`]);

    const fastElement = document.querySelector('[value="speedFast"]');
    fastElement.setAttribute('id', `${unitType}SpeedFast`);
    fastElement.setAttribute('speed', translations[lang][`${unitType}SpeedFastValue`]);
}
unitSelect.addEventListener('change', (event) => {
    updateUnits(unitSelect.value, lang);
});

//activate CustomSpeed
document.getElementById('travelSpeed').addEventListener('change', (event) => {
    const customSpeedElements = document.querySelectorAll('[customSpeed]');
    if (event.target.value === 'speedCustom') {
        customSpeedElements.forEach(element => {
            element.removeAttribute('hidden');
        });
    } else {
        customSpeedElements.forEach(element => {
            element.setAttribute('hidden', '');
        });
    }
});

//Gather Values
function gatherValues(){
    let travelDuration = document.getElementById('travelDuration').value;
    let travelTypeMultiplicator = parseFloat(document.getElementById('travelType').value);
    let customSpeed = 0;
    if(document.getElementById('travelSpeed').value === 'speedCustom'){
        customSpeed = parseFloat(document.getElementById('customSpeed').value);
    }else{
        let SpeedSelector = document.getElementById('travelSpeed').value;
        customSpeed = parseFloat(document.querySelector(`[value="${SpeedSelector}"]`).getAttribute('speed'));
    }
    let underGroundArray = Array.from(document.querySelectorAll('.checkbox')).map(checkbox => checkbox.checked);
    let undergroundLength = Array.from(document.querySelectorAll('.number')).map(number => splitExpression(number.value));
    return {travelDuration, travelTypeMultiplicator, customSpeed, underGroundArray, undergroundLength};
}

function splitExpression(expression) { 
    return expression.split('+').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
}

function testValues(values){
    console.log("Testing values");
    if(values.travelDuration === '' || isNaN(values.travelDuration) || parseFloat(values.travelDuration) <= 0 || parseFloat(values.travelDuration) > 24){
        throw new Error('Please enter a valid travel duration');
    }
    if(isNaN(values.customSpeed)){
        throw new Error('Please enter a valid custom speed');
    }

}

function calculate(){
    let values = gatherValues();
    try{
        testValues(values);
    }catch(error){
        alert(error);
    }
}

