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

//Rechenart updates
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
    console.error('check Travelduration')
    return 'Travelduration per day is imposible'
  }

  if(pathLength.value <= 0 && calcType.value == 'percent'){
    console.error('There is no negative length')
    return 'The length of the way can\'t be'
  }

  if(travelSpeed.value == 'custom'){
    if(isNaN(parseInt(customSpeed.value))){
      console.error('Please enter a Travel Speed')
      return('Travel Speed can\'t be')
    }
  }

  let foo = 0;
  for(let i = 0; i < undergroundChecksbox.length; i++){
    if(undergroundChecksbox[i].checked && !isNaN(parseFloat(undergroundPercent[i].value))){
      if(undergroundPercent[i].value<0 && calcType.value === 'percent'){
        console.error('There are no negative Percent values')
        return 'There are no negative Percent values'
      }
      if(undergroundPercent[i].value<0 && calcType.value === 'km'){
        console.error('There are no negative Kilometre values')
        return 'There are no negative Kilometre values'
      }

      foo += parseFloat(undergroundPercent[i].value)
    }
  }
  if(foo!=100 && calcType.value == 'percent'){
    console.error('Underground has to add up to 100%')
    return 'Underground has to add up to 100%'
  }
  
  if(undergroundChecksbox[10].checked && customModifierInput.value <= 0){
    console.error('Modifier has to be bigger than 0%')
    return 'Modifier has to be bigger than 0%'
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
      undergroundHours[i].innerHTML = (' The duration of the journey on this underground:')
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
          undergroundHours[i].innerHTML = undergroundHours[i].innerHTML + (parseFloat((multipleSolutions[j]/travelDuration.value).toFixed(2)) + ' Days (' + parseFloat(multipleSolutions[j].toFixed(2)) + 'h)')
          if(j+1 < numbers.length){
            undergroundHours[i].innerHTML = undergroundHours[i].innerHTML + (' + ' )
          }
          
          foo += parseFloat(multipleSolutions[j])
        }
      }
      undergroundLength[i] = multipleSolutions.reduce((a, b) => a+b, 0)
      undergroundHours[i].innerHTML = undergroundHours[i].innerHTML + (' = ' + (multipleSolutions.reduce((a, b) => a+b, 0)/travelDuration.value).toFixed(2) + 'Days (' + multipleSolutions.reduce((a, b) => a+b, 0).toFixed(2) + 'h)');
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
      
        undergroundHours[i].innerHTML = (' The duration of the journey on this underground: ' + parseFloat((undergroundDuration[i]/travelDuration.value).toFixed(2)) + ' Days')
        foo += parseFloat(undergroundDuration[i])
      }
    }
  }
  let dcString = ''
  if(travelDuration.value > 8){
    for(let i = 1; i <= (travelDuration.value - 8); i++){
      if(i==1){
        dcString += 'For '+(i+8)+' hours of travel time, make a DC '+(i+10)+' Constitution saving throw or gain one level of exhaustion.<br>'
      }else{
        dcString += 'For '+(i+8)+' hours of travel time, make another DC '+(i+10)+' Constitution saving throw or gain another level of exhaustion.<br>'
      }
      
    }
  }
  return ('Total time for journey: ' + parseFloat(foo.toFixed(2)) + ' h, which are ' + parseFloat((foo/travelDuration.value).toFixed(2)) + ' Days. <br>'+dcString)
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