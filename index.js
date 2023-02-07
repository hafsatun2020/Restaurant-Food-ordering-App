import { menuArray } from "./data.js"

const menuFeed = document.getElementById("menu-feed")
const orderfeed = document.getElementById("order-summary-inner")
const paymentDetails = document.querySelector('#payment-details')
const orderBtn = document.querySelector('#payment-btn')
const payBtn = document.querySelector('#pay')
const orderSummary = document.querySelector('#order-summary')
const paymentForm = document.getElementById('card-form')
let sumEl = document.getElementById("Total")
let quantity = 0
let sum = 0
let orderArr = []
let currentMenu = menuArray
let total = 0

document.addEventListener('click', function(e){
    let itemDataset = e.target.dataset.add

    let itemRemove = e.target.dataset.remove
    
    if (itemDataset){
        clickAddBtn(e.target.dataset.add)
        displayOrder(e.target.dataset.add)
        render()
    } else if (itemRemove){
        clickRemoveBtn(itemRemove)
        render()
    } else if (e.target.dataset.id){
        console.log(e.target)
        filterMenu(e.target.dataset.id)
        render()
    }
})

function displayOrder() {
    let orderHtml = ``
    orderArr.forEach(function(item){
        orderHtml += `
        <div id="order-item">
            <div class="left-div">
                <p>${item.name}</p>
                <button id="remove-btn" type="reset" data-remove="${item.id}">-</button>
            </div> 
            <p> x ${item.quantity}</p><br>
            <p> ${item.price}</p>
            </div>
        `
    })
    return orderHtml   
}

displayOrder()

function clickAddBtn(itemID) {
    const targetMenuObj = menuArray.filter(function(item){
        itemID = Number(itemID)
        return item.id === itemID
    })[0]
    
    let price = targetMenuObj.price
     //quantity = targetMenuObj.quantity
    
    
    if(targetMenuObj){
        if(!orderArr.includes(targetMenuObj)) {
            orderArr.push(targetMenuObj)
            sum += price
            sumEl.textContent = sum 
           targetMenuObj.quantity += 1
           //console.log(targetMenuObj.quantity)
        } else if(orderArr.includes(targetMenuObj)) {
           targetMenuObj.quantity++
            sum += price
            sumEl.textContent = sum 
        }
    }
}

function clickRemoveBtn(itemID){
    const targetMenuObj = menuArray.filter(function(item){
        itemID = Number(itemID)
        return item.id === itemID
        
    })[0]

    console.log(targetMenuObj)
    let price = targetMenuObj.price
    //quantity = targetMenuObj.quantity
   
    if(targetMenuObj){
       if(targetMenuObj.quantity > 1){
             targetMenuObj.quantity--
             sum -= price 
             sumEl.textContent = sum 
       }else if(targetMenuObj.quantity = 1){
         targetMenuObj.quantity = targetMenuObj.quantity - 1
           orderArr = orderArr.filter(function(item){
            itemID = Number(itemID)
            return item.id !== itemID
             })
              sum -= price
             sumEl.textContent = sum 
       }
    }
        
    
    
}

function displayMenu() {

    let menuHtml = ''
    
    currentMenu.forEach(function(item){        
        menuHtml += `
            <div id="menu-items" class="menu-items-container">
                <div class="item-container">
                    <div class="emoji">${item.emoji}</div>
                    <div id="item-inner"  id="${item.id}">
                        <h4 id="${item.id}">${item.name}</h4>
                        <p id="${item.id}">${item.ingredients}</p>
                        <p id="${item.id}">$${item.price}</p>
                    </div>
                </div>
                <button id="add" data-add="${item.id}">+</button>
            </div>
        `})
    return menuHtml 
}

function render() {
    menuFeed.innerHTML = displayMenu()
    orderfeed.innerHTML = displayOrder()
}

render()

function filterMenu(itemId){
    let newMenu = menuArray
    if (itemId != "all") {   
        newMenu.forEach(function(menuItem){
        newMenu =  newMenu.filter(function(item){
                return item.category === itemId
            })
        })
    }//else if(itemId = "all"){}
    console.log(itemId == "all")
    //console.log(newMenu)
    //console.log(currentMenu === newMenu)
     currentMenu = newMenu
    
    
}

payBtn.addEventListener('click', function(){
        const paymentFormData = new FormData(paymentForm)
        const name = paymentFormData.get("fullName")

        orderSummary.innerHTML = `<p id="final">Thanks, ${name}! Your order is on its way!</p>`

        //orderSummary.style.backgroundColor = 'green'
        paymentDetails.style.visibility = 'hidden'
})

orderBtn.addEventListener('click', function(){

    paymentDetails.style.visibility = 'visible'

})