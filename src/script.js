document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#custom1 .multiplicatorLabel').setAttribute('style', 'display: block');
    document.querySelector('#custom2 .multiplicatorLabel').setAttribute('style', 'display: block');
    document.querySelector('#custom1 .multiplicator').setAttribute('style', 'display: block; height: 2em;');
    document.querySelector('#custom2 .multiplicator').setAttribute('style', 'display: block; height: 2em;');
    document.querySelector('#custom1 .percentLabel').setAttribute('style', 'display: block');
    document.querySelector('#custom2 .percentLabel').setAttribute('style', 'display: block');

    const urlParams = new URLSearchParams(window.location.search); 
    const langTag = urlParams.get('lang'); 
    const unitTag = urlParams.get('unit');
    const smallTag = urlParams.get('small');
    if (langTag) { 
        lang = langTag;
        document.getElementById('langSelect').value = langTag;
        loadTranslations(langTag);
    }
    if (unitTag) { 
        unitSelect.value = unitTag;
        if(langTag){
            updateUnits(unitTag, langTag);
        }else{
            updateUnits(unitTag, 'en');
        }
    }else{
        unitSelect.value = 'imperial';
        if(langTag){
            updateUnits('imperial', langTag);
        }else{
            updateUnits('imperial', 'en');
        }
    }
    if(smallTag){
        noImage();
        console.log('small');
        
    }
    
});

const translations ={
    "en" : null,
    "de" : null
}
const images = Array.from(document.getElementsByClassName('image'));
const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
let lang = document.getElementById('langSelect').value;


//Language Updater
async function loadTranslations(lang){
    await fetch(`../lang/${lang}.json`)
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
async function updateUnits(unitType, lang) {
    
    await loadTranslations(lang);
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
    await loadTranslations(lang);
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
    let undergroundArray = Array.from(document.querySelectorAll('.checkbox')).map(checkbox => checkbox.checked);
    let undergroundLength = Array.from(document.querySelectorAll('.number')).map(number => splitExpression(number.value));
    let undergroundMultiplicator = Array.from(document.querySelectorAll('.multiplicator')).map(multiplicator => parseFloat(multiplicator.value));
    return {travelDuration, travelTypeMultiplicator, customSpeed, undergroundArray, undergroundLength, undergroundMultiplicator};
}

function splitExpression(expression) { 
    return expression.split('+').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
}

function noImage(){
    const images = Array.from(document.getElementsByClassName('image'));
    const lowerUndergrounds = Array.from(document.getElementsByClassName('lowerUnderground'));
    const lowerSettings = document.getElementById('lowerSettings');
    const content = document.getElementById('content');
    const body = document.body;


    images.forEach(image => {
        if(image.getAttribute('style') !== 'display: none'){
            image.setAttribute('style', 'display: none');
        }else{
            image.setAttribute('style', 'display: block');
        }
    });


    lowerUndergrounds.forEach(lowerUnderground => {
        if(lowerUnderground.getAttribute('style') !== 'border-radius: 15px 15px 15px 15px;'){
            lowerUnderground.setAttribute('style', 'border-radius: 15px 15px 15px 15px;');
        }else{
            lowerUnderground.setAttribute('style', 'border-radius: 0px 0px 15px 15px;');
        }
    });


    if(lowerSettings.getAttribute('style') !== `grid-template-areas: 
  "roadPaved roadUnpaved grassland"
  "forest jungle desert"
  "swamp snow mountains"
  "extremeMountains custom1 custom2";`){
        lowerSettings.setAttribute('style',`grid-template-areas: 
  "roadPaved roadUnpaved grassland"
  "forest jungle desert"
  "swamp snow mountains"
  "extremeMountains custom1 custom2";`);
    }else{
        lowerSettings.setAttribute('style', `grid-template-areas: 
  "roadPaved roadUnpaved"
  "grassland forest"
  "jungle desert"
  "swamp snow"
  "mountains extremeMountains"
  "custom1 custom2";`);
    }

    
    if(content.getAttribute('style') !== `margin-left: 5%; width: 90%;`){
        content.setAttribute('style', `margin-left: 5%; width: 90%;`);
    }else{
        content.setAttribute('style', `margin-left: 12.5%; width: 75%;`);
    }
}


//Test Values
function testValues(values){
    //Test Travel Duration
    if(values.travelDuration === '' || isNaN(values.travelDuration) || parseFloat(values.travelDuration) <= 0 || parseFloat(values.travelDuration) > 24){
        throw new Error(translations[lang].travelDurationErr);
    }
    //Test Travel Type Multiplicator
    if(isNaN(values.customSpeed) || values.customSpeed <= 0){
        throw new Error(translations[lang].customSpeedErr);
    }

    //Test Underground
    let oneTrue = false;
    for(let i = 0; i < values.undergroundArray.length; i++){
        if(values.undergroundArray[i]){
            //test if one underground is selected
            oneTrue = true;

            //test if underground length is valid
            if (!values.undergroundLength[i] || values.undergroundLength[i].length === 0) {
                throw new Error(translations[lang].everyFieldErr);
            }
            values.undergroundLength[i].forEach(item => {
                if(isNaN(item) || item <= 0){
                    throw new Error(translations[lang].validUndergroundLengthErr);
                }
            });

            //test if underground multiplicator is valid
            if(isNaN(values.undergroundMultiplicator[i]) || values.undergroundMultiplicator[i] <= 0){
                throw new Error(translations[lang].validUndergroundMultiplicatorErr);
            }
        }
    }
    if(!oneTrue){
        throw new Error(translations[lang].validUndergroundTypeErr);
    }

    return true;
}

function calculateResults(values){
    let result = new Array(values.undergroundArray.length);
    let totalHours = 0;
    for(let i = 0; i < values.undergroundArray.length; i++){
        if(values.undergroundArray[i]){
            result[i] = new Array(values.undergroundLength[i].length);
            for(let j = 0; j < values.undergroundLength[i].length; j++){
                let allHours = (values.undergroundLength[i][j]/(values.customSpeed*values.travelTypeMultiplicator))*(1/(values.undergroundMultiplicator[i]/100));
                totalHours += allHours;
                let days = Math.floor(allHours/values.travelDuration);
                let hours = (allHours - days*values.travelDuration).toFixed(2);
                if(days == 1){
                    if(hours == 1){
                        result[i][j] = `${days} ${translations[lang].day} ${hours} ${translations[lang].hour}`;
                    }else{
                        result[i][j] = `${days} ${translations[lang].day} ${hours} ${translations[lang].hours}`;
                    }
                }else{
                    result[i][j] = `${days} ${translations[lang].days} ${hours} ${translations[lang].hours}`;
                }
            }
            document.querySelectorAll('.underground .result')[i].setAttribute('style', 'display: block');

        }else{
            result[i] = '';
            document.querySelectorAll('.underground .result')[i].setAttribute('style', 'display: none');
        }
    }
    let totalDays = Math.floor(totalHours/values.travelDuration);
    totalHours = (totalHours - totalDays * values.travelDuration).toFixed(2);
    const resultDisplay = document.getElementById('resultDisplay')
    if(totalDays == 1){
        if(totalHours == 1){
            resultDisplay.innerText = `${totalDays} ${translations[lang].day} ${totalHours} ${translations[lang].hour}`;
        }else{
            resultDisplay.innerText = `${totalDays} ${translations[lang].day} ${totalHours} ${translations[lang].hours}`;
        }
    }else{
        resultDisplay.innerText = `${totalDays} ${translations[lang].days} ${totalHours} ${translations[lang].hours}`;
    }

    let noteDisplays = document.querySelectorAll('.DCInfo')
    noteDisplays.forEach(noteDisplay => {
    noteDisplay.setAttribute('hidden', '');
    });
    if(values.travelDuration >= 9){
        if(totalHours >= 9 || totalDays >= 1){
            if(totalDays >= 1){
                for(let i = 0; i < values.travelDuration-8; i++){
                    noteDisplays[i].removeAttribute('hidden');
                }
            }else{
                for(let i = 0; i < totalHours-8; i++){
                    noteDisplays[i].removeAttribute('hidden');
                }
            }

        }
        
    }

    for(let i = 0; i < result.length; i++){
        document.querySelectorAll('.result')[i].innerHTML = result[i];
    }
}

function calculate(){
    let values = gatherValues();
    try{
        if(testValues(values)){
            calculateResults(values);
        }
    }catch(error){
        alert(error);
    }

}

