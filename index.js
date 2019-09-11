
let Kdetails;
let original =[];

window.onload =init
function init(){

  const buttonStart = document.querySelector('.start')
  const buttonErase = document.querySelector('.erase')
  const input = document.querySelector('textarea')
  
  const render = document.querySelector('.render')
  const output = document.querySelector('.output')
  
  buttonStart.addEventListener('click',function(){
    if(render.hasChildNodes() || !input.value){
     
      return
    }
  
  
    const list = document.createElement('ul')
    const listK =document.createElement('ul')
    const mutateArr = sequence(input.value.toUpperCase())
 
    document.querySelector('.number-k').innerHTML = 'Number of K: ' + Object.keys(Kdetails).length
    Object.values(Kdetails).forEach(key =>{
      let keyLi = document.createElement("li");
      keyLi.innerHTML += 'K' + (key+1)
   
      listK.appendChild(keyLi)

    })
    output.append(listK)
    
       original.forEach(str =>{
      let item = document.createElement("li");
      item.innerHTML += str
      list.appendChild(item);
    })
    output.append(list)


    const listLen =document.createElement('ul')
    original.forEach(str =>{
      let item2 = document.createElement("li");
      item2.innerHTML += `Length: ${str.length}` 
      listLen.appendChild(item2);
    })
    output.append(listLen)
    
        let lineList = document.createElement('ul')
       mutateArr.forEach(str =>{
      let elem = document.createElement("li");
    
      elem.innerHTML += str
      lineList.appendChild(elem);
    })
    render.append(lineList)
    
   
  })

  buttonErase.addEventListener('click',function(){
    render.innerHTML = '';
    input.value =''

  })
  
}



function sequence(seq){
 

  if(seq.includes('\n')){
    seq = seq.replace(/(\r\n|\n|\r)/gm, "")
   
  }
  if(seq.length <= 1){
    return
  }
  let indexOfK = {}
  let numK = 1
  let array = []
  // loop throguht sequence to find indexes of K
  for (let i = 0 ; i < seq.length;i++){
    if(seq[i] === 'K'){
      indexOfK['K'+numK] = i
      numK++
    }
    
  }

  Kdetails = Object.assign({},indexOfK)
  
  let part =''
  indexOfK = Object.values(indexOfK)
  let preIndex;

  indexOfK.forEach(pos =>{
    preIndex = pos - 6 >= 0 ? pos -6 : 0
    part = seq.slice(preIndex,pos+7)
    array.push(part)
    original.push(part)
     const numOfk =part.split('K').length
    
    part = part.split('')
 
    
    if(numOfk >2){
       for(let j = part.length-1; j >=0;j--){
      if(part[j] === 'K'){
        part[j] = 'A'
        indexToMutate = j
        break;
        }
      }
    part = part.join('')
    array.push(part)
    part = part.split('')
    part[indexToMutate] = 'R'
     part = part.join('')
    array.push(part)

     
    
    }
   
   
    
  })
 return array



  
 

     
    

  }

  // MARTKQTARKS



//
