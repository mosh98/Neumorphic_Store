var select = document.getElementById("dropdown");
var productFeatures = document.getElementById("product-features")


let laptops = []

fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then((response) => response.json() )
    .then(data => computers = data)
    .then(data => laptops = data)
    .then( computers => handleComputers(computers))

const handleComputers = (computers) => {
    computers.forEach(x => addCompToMenu(x)); //Adding menu
}
const addCompToMenu = (eachComp) => {
    const compElement = document.createElement("option") //creating 1 element, like a placeholder
    compElement.value = eachComp.id //Assign each element an id
    compElement.appendChild(document.createTextNode(eachComp.title)) //then assign the title
    select.appendChild(compElement)
}


const handleFeature = e => {
    const selectedComp = laptops.find(x => x.id == e.target.value) //be carefull of this line
    productFeatures.innerText = selectedComp.specs
}

select.addEventListener("change", handleFeature)





