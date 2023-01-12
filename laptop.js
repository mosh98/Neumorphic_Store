/*
fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then((response) => response.json())
    .then((json) => console.log(json));
*/

async function fetchData(){
    const response = await fetch('https://hickory-quilled-actress.glitch.me/computers')
    const data = await response.json()
    const titles = data.map(post => post.title)
    const description = data.map(post => post.description)
    const specs = data.map(post => post.specs)
    const price = data.map(post => post.specs)
    const active = data.map(post => post.active)
    const image = data.map(post => post.image)



    return [titles, data, titles, description, specs,price,active,image]
}

let dropdown = document.getElementById("dropdown-content")
let dropbtn = document.getElementById("dropbtn")

dropbtn.addEventListener("click", function(){
    dropdown.classList.toggle("show");
    stuff = fetchData() //first one is titles
    stuff[0].forEach(x => addTitleToMenu(x))
    //dropdown.app
    //console.log(fetchData())
});
const addTitleToMenu = (x) => {
    const titleElement = document.createElement("option")
    titleElement.value = x
    titleElement.appendChild(document.createTextNode(x))
}
