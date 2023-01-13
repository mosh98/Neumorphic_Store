var select = document.getElementById("dropdown");
var productFeatures = document.getElementById("product-features")
var productDescription = document.getElementById("Description")
var secondTitle = document.getElementById("second-card-title")

var image = document.getElementById("image")

let laptops = []

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

    productFeatures.innerText = laptopInstance.specs
    //Product Description
    productDescription.innerText = laptopInstance.description
    //Second title
    secondTitle.textContent = laptopInstance.title
    // set image
    image.src = 'https://hickory-quilled-actress.glitch.me/computers'.replace('computers','') + laptopInstance.image

    //Price
}

const handleFeature = e => {
    /*
    * write comments: what is this function doing?
    * this function is getting the value of the dropdown menu and then using that value to find the matching computer in the array
    * then it is using the computer object to populate the product features section  */

    const selectedComp = laptops.find(x => x.id == e.target.value) //be carefull of this line

    productFeatures.innerText = selectedComp.specs
    //Product Description
    productDescription.innerText = selectedComp.description
    //Second title
    secondTitle.textContent = selectedComp.title
    // set image
    image.src = 'https://hickory-quilled-actress.glitch.me/computers'.replace('computers','') + selectedComp.image

    //Price

}

select.addEventListener("change", handleFeature)

//add event lister for Get a Loan
//add event lister for WORK
    //add event listerne for bank button
        //move balance





