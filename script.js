const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector('.remove-btn')
const modalCont = document.querySelector(".modal-cont");
const taskArea = document.querySelector(".textArea-cont");
const mainCont = document.querySelector('.main-cont')
const allpriorityColors = document.querySelectorAll('.priority-color')
// priority colors array 
let colors = ['lightpink' , 'lightgreen' , 'lightblue' , 'black']

// console.log(allpriorityColors)

let addBtnFlag = false;
let removeBtnFlag = false
let modalColorForTicket = 'lightpink'

// Lock Classes

let lockClose = 'fa-lock';
let lockOpen = 'fa-lock-open';

// Modal pop up Event

addBtn.addEventListener("click", function () {
  addBtnFlag = !addBtnFlag;
  if (addBtnFlag === true) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

// Delete button activation and deactivation
removeBtn.addEventListener('click' , function(){
    removeBtnFlag = !removeBtnFlag

    if(removeBtnFlag){
        alert('Delete button Activated')
        removeBtn.style.color = 'red'
    }
    else{
          removeBtn.style.color = 'white'
    }
})

function handleRemoval(ticket){
  ticket.addEventListener('click' , function(){
    if(removeBtnFlag==true){
        ticket.remove()
    }
  })
}


// change priority color of tickets
function handleColor(ticket){
  let ticketColorBand = ticket.querySelector('.ticket-color')
  ticketColorBand.addEventListener('click' , function(){
     let currentColor = ticketColorBand.style.backgroundColor

     let currentColorIdx = colors.findIndex(function(color){
        return color === currentColor
     })
     
     currentColorIdx++

     let newColorIdx = currentColorIdx % colors.length
      // 1 // 2 // 3 // 4->0
     let newColor = colors[newColorIdx]

     ticketColorBand.style.backgroundColor = newColor

   


  })
}

// handle Lock for content Edit

function handleLock(ticket){
    let ticketLockcont = ticket.querySelector('.ticket-lock');
    let ticketLockIcon = ticketLockcont.children[0];
    let ticketTaskArea = ticket.querySelector('.task-area')
    ticketLockIcon.addEventListener('click' , function(){
        if(ticketLockIcon.classList.contains(lockClose)){
            ticketLockIcon.classList.replace(lockClose, lockOpen);
            //edit the task
            ticketTaskArea.setAttribute('contenteditable' , true);
        }
        else{
            ticketLockIcon.classList.replace(lockOpen, lockClose);
            //should not allow to edit
            ticketTaskArea.setAttribute('contenteditable' , false);
        }
    })
}


// Create a ticket
let ticketsArr = JSON.parse(localStorage.getItem('appTickets')) || [];

function init(){
  if(localStorage.getItem('appTickets')){
    ticketsArr.forEach(function(ticket){
      createTicket(ticket.color, ticket.task, ticket.id)
    })
  }
}

init()

function createTicket(ticketColor , ticketTask , ticketId) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
             <div class="ticket-color" style="background-color:${ticketColor}"></div>
             <div class="ticket-id">${ticketId}</div>
             <div class="task-area">${ticketTask}</div>
              <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
              </div>`;

              mainCont.appendChild(ticketCont)

              handleRemoval(ticketCont)
              handleColor(ticketCont)
              handleLock(ticketCont)
              
              
            }

// add a task

modalCont.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const task = taskArea.value;
    const id = shortid();
    console.log(task + " -> " + id);
    createTicket(modalColorForTicket , task , id)
    modalCont.style.display = 'none'
    taskArea.value = ''
    addBtnFlag = false

    ticketsArr.push({color:modalColorForTicket,task:task,id:id});
    updateLocalStorage();
  }
});


// moving the active class on priority color boxes

allpriorityColors.forEach(function(colorElem){
    colorElem.addEventListener('click' , function(){
        
       allpriorityColors.forEach(function(priorityColor){
        priorityColor.classList.remove('active')
       })

       colorElem.classList.add('active')
       modalColorForTicket = colorElem.classList[0] 
    })
})

// Filter tasks by selected priority color
let toolboxColors = document.querySelectorAll('.color');

toolboxColors.forEach(function(color){
    color.addEventListener('click' , function(){
        let selectedColor = color.classList[0]
        let tickets = document.querySelectorAll('.ticket-cont')
        tickets.forEach(function(ticket){
            let ticketColor = ticket.querySelector('.ticket-color')
            if(ticketColor.style.backgroundColor === selectedColor){
                ticket.style.display = 'block'
            }
            else{
                ticket.style.display = 'none'
            }
        })
    })
})


//HW-1 : Show all button functionality.

let showAllBtn = document.querySelector('.show-all-btn');
showAllBtn.addEventListener('click', function() {
  let tickets = document.querySelectorAll('.ticket-cont');
  tickets.forEach(function(ticket) {
    ticket.style.display = 'block';
  });
})
//HW-2 : Read about JSON and Local Storage and try to implement them in this project.

function updateLocalStorage(){
  localStorage.setItem("appTickets",JSON.stringify(ticketsArr));
}

function getIndex(ticket){
  let ticketIdx = ticketsArr.findIndex(function(ticketContainers){
    return ticketContainers.id == ticket.id
  });
  return 
}