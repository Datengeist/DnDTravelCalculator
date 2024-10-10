const darkMode = document.getElementById('darkMode')
const darkElements = Array.from(document.getElementsByClassName('darkMode'))

const travelDuration = document.getElementById('travelduration')
const pathLength = document.getElementById('pathlength')
const pathlengthBlock = document.getElementById('pathlengthBlock')
const travelType = document.getElementById('traveltype')
const travelSpeed = document.getElementById('travelspeed')
const customSpeed = document.getElementById('customtravelspeed')

const unit = document.querySelectorAll('.unit')
const calcType = document.getElementById('calctype')
const customModifierInput = document.getElementById('custommodifier')
const undergroundChecksbox = [document.getElementById('checkroad'), document.getElementById('checkdirtroad'), document.getElementById('checkgras'), document.getElementById('checkforest'), document.getElementById('checkjungel'), document.getElementById('checkdesert'), document.getElementById('checkswamp'), document.getElementById('checksnow'), document.getElementById('checkmountain'), document.getElementById('checkextrememountain'), document.getElementById('checkcustom')]
const undergroundPercent = [document.getElementById('percentroad'), document.getElementById('percentdirtroad'), document.getElementById('percentgras'), document.getElementById('percentforest'), document.getElementById('percentjungel'), document.getElementById('percentdesert'), document.getElementById('percentswamp'), document.getElementById('percentsnow'), document.getElementById('percentmountain'), document.getElementById('percentextrememountain'), document.getElementById('percentcustom')]
const undergroundPercentvalue = [1, 0.85, 0.75, 0.65, 0.45, 0.55, 0.35, 0.45, 0.65, 0.25, 1]
const undergroundHours = [document.getElementById('undergroundtimeroad'), document.getElementById('undergroundtimedirtroad'), document.getElementById('undergroundtimegras'), document.getElementById('undergroundtimeforest'), document.getElementById('undergroundtimejungel'), document.getElementById('undergroundtimedesert'), document.getElementById('undergroundtimeswamp'), document.getElementById('undergroundtimesnow'), document.getElementById('undergroundtimemountain'), document.getElementById('undergroundtimeextrememountain'), document.getElementById('undergroundtimecustom')]

const calculateButton = document.getElementById('buttoncalculate')

const solution = document.getElementById('solution')

window.onload = function() {
  alert("Willommen beim DnD Travel Calculator\nFür die genauen Modifier informationen bitte einmal über das jeweilige Element hovern");
}

//Nach Checkboxen Testen
darkMode.addEventListener("change", function(){
  darkElements.forEach(e => {
    e.classList.toggle('darkMode')
  });
})

travelType.addEventListener("change", function(){
  travelType.title = "Modifier x"
  switch(travelType.value){
    case 'fuss_leicht' : travelType.title+="1"; break;
    case 'fuss_schwer' : travelType.title+="0.9";break;
    case 'pferd_leicht' : travelType.title+="2.5";break;
    case 'pferd_schwer' : travelType.title+="1.9";break;
    case 'kutsche_klein' : travelType.title+="1.5";break;
    case 'kutsche_gross' : travelType.title+="1.2";break;
  }
  
})

for(let i = 0; i < undergroundChecksbox.length; i++){
  undergroundChecksbox[i].addEventListener('change', () => {
    if (undergroundChecksbox[i].checked) {
      undergroundPercent[i].removeAttribute('disabled');
      switch(calcType.value){
        case 'percent':
          unit[i].innerHTML = "%"
          break
        case 'km':
          unit[i].innerHTML = "km"
          break
      }
    } else {
      undergroundPercent[i].setAttribute('disabled', true); 
      unit[i].innerHTML = ""
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

calcType.addEventListener('change', () => {
  switch(calcType.value){
    case 'percent':
      pathLength.removeAttribute('disabled')
      pathlengthBlock.style.display = "flex"
      unit.forEach((element)=>{
        element.textContent = element.textContent==="km" ? "%" : ""
      })
      break;
    case 'km':
      pathLength.setAttribute('disabled', true)
      pathlengthBlock.style.display = "none"
      unit.forEach((element)=>{
        element.textContent = element.textContent==="%" ? "km" : ""
      })
      break;
  }
})

//Input Test
function checkForInput(){
  if(travelDuration.value > 24 || travelDuration.value < 0 || !travelDuration.value){
    console.error('Reisedauer überprüfen')
    return 'Reisedauer pro Tag kann nicht sein'
  }

  if(pathLength.value <= 0 && calcType.value == 'percent'){
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
    if(undergroundChecksbox[i].checked && !isNaN(parseFloat(undergroundPercent[i].value))){
      if(undergroundPercent[i].value<0 && calcType.value === 'percent'){
        console.error('kann keine -% geben')
        return 'kann keine -% geben'
      }
      if(undergroundPercent[i].value<0 && calcType.value === 'km'){
        console.error('kann keine -km geben')
        return 'kann keine -km geben'
      }

      foo += parseFloat(undergroundPercent[i].value)
    }
  }
  if(foo!=100 && calcType.value == 'percent'){
    console.error('Untergrund muss 100% sein')
    return 'Untergrund muss 100% sein'
  }
  
  if(undergroundChecksbox[10].checked && customModifierInput.value <= 0){
    console.error('Modifier muss größer als 0% sein')
    return 'Modifier muss größer als 0% sein'
  }
  return 'passt'
}

function calculate(){
  let speed
  switch(travelSpeed.value){
    case 'slow':  speed= parseFloat(3.2); break;
    case 'normal': speed = parseFloat(4.8); break;
    case 'fast': speed = parseFloat(6.4); break;
    case 'custom': speed= parseFloat(customSpeed.value); break;
  }

  switch(travelType.value){
    case 'fuss_leicht':  speed *= 1; break;
    case 'fuss_schwer': speed *= 0.9; break;
    case 'pferd_leicht': speed *= 2.5; break;
    case 'pferd_schwer': speed *= 1.9; break;
    case 'kutsche_klein': speed *= 1.5; break;
    case 'kutsche_gross': speed *= 1.2; break;
  }
  
  let undergroundSpeeds = []
  let undergroundLength = []
  let undergroundDuration = []
  let foo = 0;
  for(let i = 0; i < undergroundChecksbox.length; i++){
    if(undergroundChecksbox[i].getAttribute('id') === 'checkcustom'){
      undergroundSpeeds[i] = speed * parseFloat(customModifierInput.value/100)
    }else{
      undergroundSpeeds[i] = speed * undergroundPercentvalue[i]
    }
    

    undergroundHours[i].innerHTML = ''

    let numbers = undergroundPercent[i].value.split('+')
    console.log(numbers)

    if(numbers.length > 1){
      let multipleSolutions =[];
      undergroundHours[i].innerHTML = (' Dauer der Reise auf diesem Unergrund beträgt:')
      for(let j = 0; j < numbers.length; j++){
        if(undergroundChecksbox[i].checked && !isNaN(parseFloat(numbers[j]))){
          switch(calcType.value){
            case 'percent':
              undergroundLength[i] = parseFloat(pathLength.value * (numbers[j]/100))
              multipleSolutions[j] = undergroundLength[i] / undergroundSpeeds[i]
              break;
            case 'km':
              multipleSolutions[j]= numbers[j] / undergroundSpeeds[i]
              break;
          }
          undergroundHours[i].innerHTML = undergroundHours[i].innerHTML + (parseFloat((multipleSolutions[j]/travelDuration.value).toFixed(2)) + ' Tage (' + parseFloat(multipleSolutions[j].toFixed(2)) + 'h)')
          if(j+1 < numbers.length){
            undergroundHours[i].innerHTML = undergroundHours[i].innerHTML + (' + ' )
          }
          
          foo += parseFloat(multipleSolutions[j])
        }
      }
      undergroundLength[i] = multipleSolutions.reduce((a, b) => a+b, 0)
      undergroundHours[i].innerHTML = undergroundHours[i].innerHTML + (' = ' + (multipleSolutions.reduce((a, b) => a+b, 0)/travelDuration.value).toFixed(2) + 'Tage (' + multipleSolutions.reduce((a, b) => a+b, 0).toFixed(2) + 'h)');
    }else{
      if(undergroundChecksbox[i].checked && !isNaN(parseFloat(undergroundPercent[i].value))){
        switch(calcType.value){
          case 'percent':
            undergroundLength[i] = parseFloat(pathLength.value * (undergroundPercent[i].value/100))
            undergroundDuration[i] = undergroundLength[i] / undergroundSpeeds[i]
            break;
          case 'km':
            undergroundDuration[i]= undergroundPercent[i].value / undergroundSpeeds[i]
            break;
        }
      
        undergroundHours[i].innerHTML = (' Dauer der Reise auf diesem Unergrund beträgt: ' + parseFloat((undergroundDuration[i]/travelDuration.value).toFixed(2)) + ' Tage')
        foo += parseFloat(undergroundDuration[i])
      }
    }
  }
  let dcString = ''
  if(travelDuration.value > 8){
    for(let i = 1; i <= (travelDuration.value - 8); i++){
      if(i==1){
        dcString += 'Für '+(i+8)+' Stunden an Reisezeit mach ein DC '+(i+10)+' Con rettungswurf oder erhalte einen Punkt Erschöpfung.<br>'
      }else{
        dcString += 'Für '+(i+8)+' Stunden an Reisezeit mach ein weiteren DC '+(i+10)+' Con rettungswurf oder erhalte ein weiteren Punkt Erschöpfung.<br>'
      }
      
    }
  }
  return ('Gesamtdauer der Reise: ' + parseFloat(foo.toFixed(2)) + ' h, was ' + parseFloat((foo/travelDuration.value).toFixed(2)) + ' Tage sind. <br>'+dcString)
}

//Zusammenfügen aller funktionen
function berechnen(){
  let input = checkForInput()
  if(input !== 'passt'){
    solution.innerHTML = input
  }else{
    solution.innerHTML = calculate()
  }
}