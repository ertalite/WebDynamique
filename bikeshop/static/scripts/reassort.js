let invent
let descriptions
let images

fetch('/reassort/JSON')
    .then(response => {
        return response.json()
    })
    .then(data => {
        descriptions = data
        const newReassortINIT = initReassort(descriptions);
        document.getElementById("tableau").innerHTML = initReassortHTML(newReassortINIT);
    })
    .catch(error => {
        console.error('Error:', error);
    })

function initReassort(descriptions) {

    var newReassort = []
    console.log(descriptions["data"])

    for (const [key, value] of Object.entries(descriptions["data"])) {
        newReassort.push({
            "code": key,
            "nom": descriptions["data"][`${key}`]["0"],
            "shortDescr": descriptions["data"][`${key}`]["1"],
            "longDescr": descriptions["data"][`${key}`]["2"],
            "quantite": descriptions["data"][`${key}`].length,
            "suppressed": false
        })
    }
    console.log(newReassort)
    return newReassort
}


function initReassortHTML(newReassort) {

    var newReassortHTML = "<table><tr><td> Code </td><td> Nom </td><td> Description </td><td> Détails </td><td> Photo </td><td> Ajouter </td><td> Quantité en magasin </td><td> Diminuer </td><td> Supprimer </td></tr>"

    for (const ligne of newReassort) {
        newReassortHTML += `<tr><td> ${ligne["code"]} </td><td> ${ligne["nom"]} </td><td> ${ligne["shortDescr"]} </td><td> ${ligne["longDescr"]} </td><td> Photo </td><td> <button onclick="increment"> + </button> </td><td> ${ligne["quantite"]} </td><td> <button onclick="decrement"> - </button> </td><td> Supprimer </td></tr>`
    }

    newReassortHTML += "</table>"

    return newReassortHTML
}
/*
function increment() {
    add = document.getElementById(`${code}`)
    add.onclick = doSthElse
}

function decrement() {

}

function suppressed() {

}
*/