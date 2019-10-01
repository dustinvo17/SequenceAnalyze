
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
    let numberVIL = 0;
     input.val().toLowerCase().split('').map((char)=>{
      if(char ==='v' || char ==='i' || char ==='l'){
        numberVIL++
      }
    })

    
    
    console.log(input.val().toLowerCase())
    sequence(input.val())
     let indexofWT = []
     Object.keys(mutateObject).forEach((key,index) =>{
        if(key.includes('WT')){
          indexofWT.push(index)
        }
    })
    console.log(indexofWT)
    let listOfVIL =[]
    let listofNumK =[]
        // calculate number of VIL in each str
      Object.values(mutateObject).forEach(str =>{
           let numVIL = 0;
           let numK =0
          str.toLowerCase().split('').forEach(char =>{
            if(char ==='v' || char ==='i' || char ==='l'){
            numVIL++
            }
            if(char ==='k'){
              numK++
            }
      })
      listofNumK.push(numK)
      listOfVIL.push(numVIL)
      
    })
    function renderListOfVIL(list){
      
       
        return list.map((item,index) =>{
           
            if(indexofWT.includes(index)){
               return `<li class="number-vil">${item}</li>`
            }
            return `<li class="duplicate">Duplicate</li>`
           

          
         
        
          
        }).join('')
    }
    

   
    output.append(`<ul id="pos">${returnItem(Object.values(Kdetails))}</ul>`)

    output.append(`<ul id="pos">${returnItem(Object.keys(mutateObject))}</ul>`)
    output.append(`<ul>${returnItem(Object.values(mutateObject))}</ul>`)
    output.append(`<ul>${renderListOfVIL(listOfVIL)}</ul>`)
    output.append(`<ul>${renderListOfVIL(listofNumK)}</ul>`)
    output.append(`<ul>${returnLen(Object.values(mutateObject))}</ul>`)
     output.append(`<div class="title">${'Total number of K: ' + Object.keys(Kdetails).length}</div>`)
    output.append(`<div class="title">Total number of sequences: ${Object.values(mutateObject).length}</div>`)
   output.append(`<div class="title">Total number of V, I, L: ${numberVIL}</div>`)
  
   function returnLen(list){
     return list.map((item,index) =>{
       if(indexofWT.includes(index)){
           return `<li>${item.length}</li>`
       }
       return `<li class="duplicate">duplicate</li>`
      
     }).join('')
   }
   // turn charecter bold
   function boldChar(myStr){

   }
   function returnItem(list){
   
      return list.map(item =>{
        
        // return position of K
        if(list[0] === Object.values(Kdetails)[0]){
           return `<li>K${item+1}</li>`
        }
        // return mutate sq

        // validate sequnce N to C
        if(!/\d/.test(item)){
            /// hight middle K and R with color
          let len = item.split('').length
          return `<li>${item.split('').map((char,index) =>{
              if(index === (len -7)){
                return `<span class=${char === 'K'?'k':'r'}>${char}</span>`
                  
                 
                
              
              
              }
              if(char === 'r'){
                 return `<span class="r">${char}</span>`
              }
              return char
          }).join('')}</li>`
          
        }
        return `<li>${item}</li>`
      }).join('')
   }

  
    
    
   
  })

  buttonErase.on('click',function(){
    let pattern =`
         <div  class="title">Position of K</div>  
           <div class="title">Sequence ID</div>
           <div class="title">Sequence N' to C'</div>
           <div class="title">Number of V, I, L in each sequence</div> 
            <div class="title">Number of K in each sequence</div> 
          <div class="title">Length</div>    
          <div></div>
          <div></div> 
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
     const numOfk =part.split('K').length -1
      /// mutate and add label 
    console.log(numOfk)
    const label = 'K' + (pos+1)
   
    
    mutateObject[label+'_WT'] = part

    part = part.split('')
     let indexMiddle = part.length - 7
     middleIndex = part.length - 7
    part[indexMiddle] ='r'
    mutateObject[label+'_control-1'] = part.join('')
    
    // turn part into orignal K
     part[indexMiddle] ='K'


    //  working with control 2 and up
    
    if(numOfk >=2){
      let partControl = [...part]
      for(let i = 0;i<partControl.length;i++ ){
        if(partControl[i] === 'K' && i !== indexMiddle){
          partControl[i] = 'r'
           
 
        }
      
      }
      mutateObject[label+`_control-2`] = partControl.join('')
      let secondPart = [...part]
      for(let i = 0 ; i< secondPart.length;i++){
          if(partControl[i] === 'K'){
           partControl[i] = 'r'
           
 
        }
      }
      mutateObject[label+`_control-3`] = partControl.join('')
    }
     




      
    // working with control 3 and up
    // let control = 3
    // if(numOfk >=2){
    //    let partControl = [...part]
    //   for(let i = 0; i < partControl.length;i++){
    //     if(i !== indexMiddle && partControl[i] === 'K'){
    //       partControl[i] = 'R'
    //       mutateObject[label+`_control-${control}`] = partControl.join('')
    //       control++
    //     }
    //   }
    //   let newPart = [...part]
     
    //   let check = 0
    //   for(let i = newPart.length-1;i >= 0;i--){
    //     if(newPart[i] === 'K'){
    //       check++
    //     }
    //     if(check > 1 && newPart[i] ==='K'){
    //       newPart[i] = 'R'
    //     }
       
    //   }
    //   mutateObject[label+`_control-${control}`] = newPart.join('')
   
   
      
     
     
    
    // }
  

   
   
   
    
  })
 return array



  
 

     
    

  }

  // MARTKQTARKS



//
