var select = document.getElementById("dropdown");
var productFeatures = document.getElementById("product-features")
var productDescription = document.getElementById("Description")
var secondTitle = document.getElementById("second-card-title")
var workBalance = document.getElementById("work-balance")
var image = document.getElementById("image")
var priceOfLaptop = document.getElementById("price")
var workButton = document.getElementById("work-btn")
var bankButton = document.getElementById("bank-btn")
var piggy = document.getElementById("bankBalance") //piggy for piggy bank
var getLoan = document.getElementById("loan-btn")
var loanBal = document.getElementById("LoanBalance")
var debtField = document.getElementById("debt-balance-field")
var buyButton = document.getElementById("BUY")
var repayButton = document.getElementById("repay-btn")

loanBal.style.visibility = "hidden"
debtField.style.visibility = "hidden"
repayButton.style.visibility = "hidden"

let laptops = []
let workBalanceVariable = 0
let bankBalance = 200
let loanVar = 0
let loanTaken = false

fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then((response) => response.json() )
    .then(data => computers = data)
    .then(data => laptops = data)
    .then( computers => handleComputers(computers))

const handleComputers = (computers) => {
    computers.forEach(x => addCompToMenu(x)); //Adding menu
    // add default value
    populateLaptopInfo(computers[0])
}
const addCompToMenu = (eachComp) => {
    const compElement = document.createElement("option") //creating 1 element, like a placeholder
    compElement.value = eachComp.id //Assign each element an id
    compElement.appendChild(document.createTextNode(eachComp.title)) //then assign the title
    select.appendChild(compElement)
}

const populateLaptopInfo = (laptopInstance) => {

    list_of_speks = laptopInstance.specs
    string_of_speks = ""
    for(let i = 0; i < list_of_speks.length; i++){
        string_of_speks += "\n"+ "- "+list_of_speks[i]
    }

    productFeatures.innerText = string_of_speks
    //Product Description
    productDescription.innerText = laptopInstance.description



    //Second title
    secondTitle.textContent = laptopInstance.title
    // set image
    image.src = 'https://hickory-quilled-actress.glitch.me/computers'.replace('computers','') + laptopInstance.image
    //Price
    price.textContent = laptopInstance.price
}


const handleFeature = e => {
    /*
    * write comments: what is this function doing?
    * this function is getting the value of the dropdown menu and then using that value to find the matching computer in the array
    * then it is using the computer object to populate the product features section  */

    const selectedComp = laptops.find(x => x.id == e.target.value) //be carefull of this line

    populateLaptopInfo(selectedComp)
    //Price

}


select.addEventListener("change", handleFeature)

//add event lister for Get a Loan
getLoan.addEventListener("click",function (){
    /*TODO:
    *   [Done] Set piggy
    *   You cannot get two bank loans
    *   Outstadning Loan Field (Only visible after taking a loan)
    *
    * */

    let requestedLoanAmount = prompt("Enter Loan Amount?");

    if (! (parseInt(requestedLoanAmount)  > (bankBalance*2)) ) {
        console.log()
        alert("Accepted");
        //set loan amount
        loanVar = requestedLoanAmount
        //Balance
        loanBal.innerText = loanVar

        // set total balance
        bankBalance = parseInt(loanVar)+parseInt(bankBalance)
        piggy.innerText = bankBalance

        loanTaken = true //Loan Flag
        loanBal.style.visibility = "visible"
        debtField.style.visibility = "visible"
        repayButton.style.visibility = "visible"

    }


})

//add event lister for WORK
workButton.addEventListener("click", function (){
        var text = workBalance.textContent
        var number = Number(text)

        console.log(number)
        workBalance.innerText = number + 100
        workBalanceVariable = number + 100

})
//add event listener for bank button
        //move balance
bankButton.addEventListener("click", function (){

    //check if there is any outstanding loan
    if(loanTaken == true ){

        //if there is, reduce debt by 10%
        loan_is = Number(loanBal.textContent)
        reduced_loan = loan_is - (loan_is * 0.1)
        bankBalance = ( bankBalance  ) + (workBalanceVariable - (loan_is * 0.1))
        //workBalanceVariable = bankBalance
        //Display new loan amount
        loanVar = reduced_loan
        loanBal.innerText = loanVar

        if (loanVar == 0 ){
            loanTaken = false
            loanBal.style.visibility = "hidden"
            debtField.style.visibility = "hidden"
            repayButton.style.visibility = "visible"
        }





    } else {

        bankBalance += workBalanceVariable
    }

    //before setting the bank
    piggy.innerText = bankBalance

    //reset work balance
    workBalance.innerText = "0"

    //



})

//add buy button event listener which reduces bank amount
buyButton.addEventListener("click", function (){
    //get price of laptop
    /**
     *
     *
     */
    priceOfLaptop.innerText= Number(priceOfLaptop.textContent)
    //get the bank balance
    bankBalance = Number(piggy.textContent)
    //check if bank balance is greater than price of laptop
    if (bankBalance >= priceOfLaptop.innerText){
        //if it is, reduce bank balance by price of laptop
        bankBalance = bankBalance - priceOfLaptop.innerText
        //set bank balance
        piggy.innerText = bankBalance
        //display message
        alert( `You have bought the ${secondTitle.innerText} laptop`, priceOfLaptop.innerText, "has been deducted from your account")
    }else {
        alert("You're Broke")
    }

})



