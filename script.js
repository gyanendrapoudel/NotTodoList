const taskName = document.querySelector('.js-task-input')
const button = document.querySelector('.js-addTaskButton')
const hour = document.querySelector('.js-hours')
const list = document.querySelector('.js-enter-lists')
const totalHour = document.querySelector('.js-total-hour')
// for total hour calculation
let allocatedHour = 0;

//to add html for entry lists
let btnHtml = ''

//  to push each entry list on array
let btnContainer=[]

// initial html of Entry list 
const initialHtml = list.innerHTML

// displaying allocated hour
displayAllocatedHour(allocatedHour)


button.addEventListener('click',()=>{
 
 
   let task = taskName.value
   let hourPerTask = hour.value
 
  if (allocatedHour > 167) {
    alert('maximum hour reached')
    allocatedHour -= parseInt(hourPerTask)
    setDefault()
    return
  }
  btnContainer.push({ task, hourPerTask })

  // calculating total hours
  allocatedHour += parseInt(hourPerTask)

    
  displayEntryLists(btnContainer)
})

function displayAllocatedHour(allocatedHour){
 totalHour.innerHTML = `You could have allocated = ${allocatedHour} hours`

}

function setDefault(){
    taskName.value =''
    hour.value = ''
}

function deleteHandler(e){
  let i
  console.log(btnContainer)
  btnContainer.forEach((btn ,index)=>{
    if (btn.task===e.currentTarget.dataset.task){
        i =index
        
    }
   
  })
  btnContainer.splice(i,1)
  
  displayEntryLists(btnContainer)
  let sum=0
  btnContainer.forEach((btn)=>{
     sum+=parseInt(btn.hourPerTask)
  })
  allocatedHour=sum;
  // displaying total hours on allocated hour section
  displayAllocatedHour(allocatedHour)
}

function displayEntryLists(btnContainer){
     btnHtml = ''
      list.innerHTML = initialHtml
    btnContainer.forEach((btn, i) => {
      btnHtml += `<tr class="btn-container">
        <td>${i + 1}</td>
        <td>${btn.task}</td>
        <td>${btn.hourPerTask} hours</td>
        <td class="text-end">
            <span class="js-delete-icon" data-id="${
              btn.hourPerTask
            }" data-task="${btn.task}">
            <i class="fa-solid fa-trash text-danger  me-4"></i>
            </span>
            <span data-id="">
            <i class="fa-solid fa-arrow-right text-danger me-2 "></i>
            </span>
        </td>
        </tr>`
    })
    list.innerHTML += btnHtml
    //    btnContainer = list.querySelectorAll('.btn-container')
    //  listening event on  delete icon

    const deleteIcon = list.querySelectorAll('.js-delete-icon')
    deleteIcon.forEach((icon) => {
      icon.addEventListener('click', deleteHandler)
    })

    
    // displaying total hours on allocated hour section
    displayAllocatedHour(allocatedHour)

    // setting back input form to default state
    setDefault()
}