const translations ={
    "en" : null,
    "de" : null
}

function loadTranslations(lang){
    fetch(`lang/${lang}.json`)
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

loadTranslations('en');