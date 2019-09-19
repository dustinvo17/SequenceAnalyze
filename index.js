
let Kdetails;
let original =[];
let mutateObject = {}
window.onload =init
function init(){

  const buttonStart = $('.start')
  const buttonErase = $('.erase')
  const input = $('textarea')
  

  const output =$('.output')
  
  buttonStart.on('click',function(){
 
    if(!input.val() || $('#pos').length > 0){
     
      return
    }
    console.log(input.val())
    sequence(input.val())
    console.log(Kdetails)
    output.append(`<div class="title">${'Number of K: ' + Object.keys(Kdetails).length}</div>`)
    output.append(`<ul id="pos">${returnItem(Object.values(Kdetails))}</ul>`)
    output.append(`<ul>${returnItem(original)}</ul>`)
    output.append(`<ul id="pos">${returnItem(Object.keys(mutateObject))}</ul>`)
    output.append(`<ul>${returnItem(Object.values(mutateObject))}</ul>`)
    output.append(`<ul>${returnLen(Object.values(mutateObject))}</ul>`)
    output.append(`<div class="title">Total number of sequences: ${Object.values(mutateObject).length}</div>`)
   
        
   function returnLen(list){
     return list.map(item =>{
       return `<li>${item.length}</li>`
     }).join('')
   }
   function returnItem(list){
      return list.map(item =>{
        if(list[0] === Object.values(Kdetails)[0]){
           return `<li>K${item+1}</li>`
        }
        return `<li>${item}</li>`
      }).join('')
   }

  
    
    
   
  })

  buttonErase.on('click',function(){
    let pattern =`<div></div>
         <div class="title">Position of K</div>
           <div class="title"> Sequence N' to C'</div>
           <div class="title">Sequence ID</div>
           <div class="title">Sequence N' to C'</div>
          <div class="title">Length</div>    
        <div></div>`
    output.text('') 
    input.val('')
    output.append(pattern)

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
      /// mutate and add label 
    const label = 'K' + (pos+1)
    
    
    mutateObject[label+'_WT'] = part

    part = part.split('')
     let indexMiddle = part.length - 7
     part[indexMiddle] = 'A'
    mutateObject[label+'_control-1'] = part.join('')
    part[indexMiddle] ='R'
    mutateObject[label+'_control-2'] = part.join('')
    
    // turn part into orignal K
     part[indexMiddle] ='K'
    

      
    // working with control 3 and up
    let control = 3
    if(numOfk >=2){
       let partControl = [...part]
      for(let i = 0; i < partControl.length;i++){
        if(i !== indexMiddle && partControl[i] === 'K'){
          partControl[i] = 'R'
          mutateObject[label+`_control-${control}`] = partControl.join('')
          control++
        }
      }
      let newPart = [...part]
     
      let check = 0
      for(let i = newPart.length-1;i >= 0;i--){
        if(newPart[i] === 'K'){
          check++
        }
        if(check > 1 && newPart[i] ==='K'){
          newPart[i] = 'R'
        }
       
      }
      mutateObject[label+`_control-${control}`] = newPart.join('')
   
   
      
     
     
    
    }
  

   
   
   
    
  })
 return array



  
 

     
    

  }

  // MARTKQTARKS



//
