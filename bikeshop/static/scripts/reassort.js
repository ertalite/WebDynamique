let invent = JSON.parse("../../data/invent.json")
let descriptions = JSON.parse("../../data/descr.json")
let images = JSON.parse("../../data/images.json")

function initReassort() {

    var newReassort = []

    for (code in descriptions) {
        newReassort += {
            "code": code,
            "nom": descriptions[code][0],
            "shortDescr": descriptions[code][1],
            "longDescr": descriptions[code][2],
            "quantite": invent[code].length,
            "suppressed": false
        }
    }

    return newReassort
}

var newReassortINIT = initReassort()

function initReassortHTML() {

    var newReassortHTML = "<table><tr><td> Code </td><td> Nom </td><td> Description </td><td> Détails </td><td> Photo </td><td> Ajouter </td><td> Quantité en magasin </td><td> Diminuer </td><td> Supprimer </td></tr>"

    for (ligne in newReassortINIT) {
        newReassortHTML += `<tr><td> ${ligne["code"]} </td><td> ${ligne["nom"]} </td><td> ${ligne[shortDescr]} </td><td> ${ligne[longDescr]} </td><td> Photo </td><td> <button onclick="increment"> + </button> </td><td> ${ligne[quantite]} </td><td> <button onclick="decrement"> - </button> </td><td> Supprimer </td></tr>`
    }

    newReassortHTML += "</table>"

    return newReassortHTML
}

document.getElementById("tableau").innerHTML = initReassortHTML()

function increment() {
    add = document.getElementById(`${code}`)
    add.onclick = doSthElse
}

function decrement() {

}

function suppressed() {

}
