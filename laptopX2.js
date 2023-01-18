var select = document.getElementById("dropdown"); //dropdown menu
var productFeatures = document.getElementById("product-features") //Product Features
var productDescription = document.getElementById("Description") //Product Description
var secondTitle = document.getElementById("second-card-title") //Second title
var workBalance = document.getElementById("work-balance") //Work Balance-Earned amount field
var image = document.getElementById("image") //Image
var priceOfLaptop = document.getElementById("price") //Price
var workButton = document.getElementById("work-btn") //Work Button
var bankButton = document.getElementById("bank-btn") //Bank Button
var piggy = document.getElementById("bankBalance") //piggy for piggy bank
var getLoan = document.getElementById("loan-btn") //Loan Button
var loanBal = document.getElementById("LoanBalance") //Loan Balance
var debtField = document.getElementById("debt-balance-field") //Debt Balance
var buyButton = document.getElementById("BUY") //Buy Button
var repayButton = document.getElementById("repay-btn") //Repay Button

// Loan informations...Setting these to hidden
loanBal.style.visibility = "hidden"
debtField.style.visibility = "hidden"
repayButton.style.visibility = "hidden"


let laptops = []
let workBalanceVariable = 0
let bankBalance = 200
let loanVar = 0
let loanTaken = false
let repay = false

/**
 * Featching info from the API
 * */
fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then((response) => response.json() )
    .then(data => computers = data)
    .then(data => laptops = data)
    .then( computers => handleComputers(computers))

//add event listener for dropdown menu
const handleComputers = (computers) => {
    computers.forEach(x => addCompToMenu(x)); //Adding menu
    // add default value
    populateLaptopInfo(computers[0])
}
const addCompToMenu = (eachComp) => {
    /**
     * this function is adding the computers to the dropdown menu
     * */
    const compElement = document.createElement("option") //creating 1 element, like a placeholder
    compElement.value = eachComp.id //Assign each element an id
    compElement.appendChild(document.createTextNode(eachComp.title)) //then assign the title
    select.appendChild(compElement)
}

const populateLaptopInfo = (laptopInstance) => {
    /**
     * this function is populating the product features section, image, price, and title
     * also takes care of png and jpeg images
     * */
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


    if(laptopInstance.title == "The Visor"){
        image.src = 'https://hickory-quilled-actress.glitch.me/computers'.replace('computers','') + laptopInstance.image.replace('.jpg','.png')

    }else {
        image.src = 'https://hickory-quilled-actress.glitch.me/computers'.replace('computers','') + laptopInstance.image
    }


    //Price
    price.textContent = laptopInstance.price
}


const handleFeature = e => {
    /**
    * what is this function doing?
    * this function is getting the value of the dropdown menu and then using that value to find the matching computer in the array
    * then it is using the computer object to populate the product features section  */

    const selectedComp = laptops.find(x => x.id == e.target.value) //be carefull of this line

    populateLaptopInfo(selectedComp)
    //Price

}



select.addEventListener("change", handleFeature) //dropdown menu listener

//add event lister for Get a Loan
getLoan.addEventListener("click",function (){
    /**
    * event listerner to get loan.
     * if loan is taken, then the repay button is enabled
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
        visibility_flag("visible")
        getLoan.style.visibility = "hidden"
    }


})

//add event lister for WORK
workButton.addEventListener("click", function (){
    /**
     * event listerner to work.
     *
     */
        var text = workBalance.textContent
        var number = Number(text)

        console.log(number)
        workBalance.innerText = number + 100
        workBalanceVariable = number + 100

})
//add event listener for bank button
function visibility_flag(flag) {
    loanBal.style.visibility = flag
    debtField.style.visibility = flag
    repayButton.style.visibility = flag
}

//move balance
bankButton.addEventListener("click", function (){
    /**
     * bank button event listener
     *
     * */
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
            visibility_flag();
        }
    } else {
        bankBalance += workBalanceVariable
    }

    //before setting the bank
    piggy.innerText = bankBalance

    //reset work balance
    workBalance.innerText = "0"

})
repayButton.addEventListener("click", function (){
        //take away outstanding loan from the work balance
        //set the work balance to 0
        //set the outstanding loan to 0
        //set the bank balance to the work balance(after loan deduction)
        //set the loan taken flag to false
    //set flag_visible to "hidden"

    loan_is = Number(loanBal.textContent)
    console.log(loan_is)
    //                        100                    81
    remainding_work_balance = workBalanceVariable - loan_is
    //Still buys
    if(remainding_work_balance >= 0){
        /**
        * This if statement takes away work balance (i.e setting it to 0)
         * taking away debt & putting the remaining amount to the bank. (i.e debt is fully paid)
         *
         * */
        newValue = remainding_work_balance
        bankBalance += newValue
        piggy.innerText = bankBalance
        loanVar = 0
        loanBal.innerText = loanVar

        //reset work balance
        workBalance.innerText = 0
        workBalanceVariable = 0
        repayButton.style.visibility = "hidden"
        debtField.style.visibility = "hidden"
        loanBal.style.visibility = "hidden"
        getLoan.style.visibility = "visible"


    }else {
        /**
         * if debt is bigger than the work amount
         * it deducts the debt according to the work balance (i.e the debt is not fully paid) */

        loanVar = Math.abs(remainding_work_balance)
        loanBal.innerText = loanVar

        //reset work balance
        workBalance.innerText = 0
        workBalanceVariable = 0
    }


})

//add buy button event listener which reduces bank amount
buyButton.addEventListener("click", function (){
    /**
     * event listener for buy button
     * 
     */
    //get price of laptop
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



