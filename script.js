const travelDuration = document.getElementById('travelduration')
const pathLength = document.getElementById('pathlength')
const travelType = document.getElementById('traveltype')
const travelSpeed = document.getElementById('travelspeed')
const customSpeed = document.getElementById('customtravelspeed')

const undergroundChecksbox = [document.getElementById('checkroad'), document.getElementById('checkdirtroad'), document.getElementById('checkgras'), document.getElementById('checkforest'), document.getElementById('checkjungel'), document.getElementById('checkdesert'), document.getElementById('checkswamp'), document.getElementById('checksnow'), document.getElementById('checkmountain'), document.getElementById('checkextrememountain')]
const undergroundPercent = [document.getElementById('percentroad'), document.getElementById('percentdirtroad'), document.getElementById('percentgras'), document.getElementById('percentforest'), document.getElementById('percentjungel'), document.getElementById('percentdesert'), document.getElementById('percentswamp'), document.getElementById('percentsnow'), document.getElementById('percentmountain'), document.getElementById('percentextrememountain')]

const calculateButton = document.getElementById('buttoncalculate')

const solution = document.getElementById('solution')

//Nach Checkboxen Testen
for(let i = 0; i < undergroundChecksbox.length; i++){
  undergroundChecksbox[i].addEventListener('change', () => {
    if (undergroundChecksbox[i].checked) {
      undergroundPercent[i].removeAttribute('disabled');
    } else {
      undergroundPercent[i].setAttribute('disabled', true); 
    }
  });
}

//Nach Reise geschwindigkeit
travelSpeed.addEventListener('change', () =>{
  if(travelSpeed.value == 'custom'){
    document.getElementById('labelcustomspeed').style.display = 'inline';
  }else{
    document.getElementById('labelcustomspeed').style.display = 'none';
  }
})

//Input Test
function checkForInput(){
  if(travelDuration.value > 24 || travelDuration.value < 0 || !travelDuration.value){
    console.error('Reisedauer überprüfen')
    return 'Reisedauer pro Tag kann nicht sein'
  }
  if(pathLength.value <= 0){
    console.error('Es gibt keine negative Länge')
    return 'Länge der Weges kann nicht sein'
  }

  if(travelSpeed.value == 'custom'){
    if(isNaN(parseInt(customSpeed.value))){
      console.error('Gib ne Reisegschwindigkeit ein')
      return('Geschwindigkeit kann nicht sein')
    }
  }

  let foo = 0;
  for(let i = 0; i < undergroundChecksbox.length; i++){
    if(undergroundChecksbox[i].checked && !isNaN(parseInt(undergroundPercent[i].value))){
      if(undergroundPercent[i].value<0){
        console.error('kann keine -% geben')
        return 'kann keine -% geben'
      }
      foo += parseInt(undergroundPercent[i].value)
    }
  }
  if(foo!=100){
    console.error('Untergrund muss 100% sein')
    return 'Untergrund muss 100% sein'
  }
  return 'passt'
}

//Zusammenfügen aller funktionen
function berechnen(){
  let input = checkForInput()
  if(input !== 'passt'){
    solution.textContent = input
  }else{
    solution.textContent = 'richtig'
  }
}