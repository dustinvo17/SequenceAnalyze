

window.onload =init
function init(){

  const buttonStart = document.querySelector('.start')
  const buttonErase = document.querySelector('.erase')
  const input = document.querySelector('textarea')
  
  const render = document.querySelector('.render')
  buttonStart.addEventListener('click',function(){
    if(render.hasChildNodes() || !input.value){
     
      return
    }
    const list = document.createElement('ul')
    const results = sequence(input.value)
   
       results.forEach(str =>{
      let item = document.createElement("li");
      item.innerHTML += str
      list.appendChild(item);
    })
    render.append(list)
    
   
  })
  buttonErase.addEventListener('click',function(){
    render.innerHTML = '';
    input.value =''

  })
  
}



function sequence(seq){
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
  let part =''
  indexOfK = Object.values(indexOfK)
  let preIndex;

  indexOfK.forEach(pos =>{
    preIndex = pos - 6 >= 0 ? pos -6 : 0
    part = seq.slice(preIndex,pos+7)
    array.push(part)
     const numOfk =part.split('K').length
    
    part = part.split('')
    let indexToMutate =0
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

sequence('MARTKQTARKSTGGKAPRKQLATKAARKSAPATGGVKKPHRYRPGTVALREIRRYQKSTELLIRKLPFQRLVREIAQDFKTDLRFQSSAVMALQEASEAYLVGLFEDTNLCAIHAKRVTIMPKDIQLARRIRGERA')

//
