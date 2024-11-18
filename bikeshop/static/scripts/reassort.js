let JSONdata

fetch('/reassort/JSON')
    .then(response => {
        return response.json()
    })
    .then(data => {
        JSONdata = data
        console.log(JSONdata)
        const newReassortINIT = initReassort(JSONdata);
        document.getElementById("tableau").innerHTML = initReassortHTML(newReassortINIT);
    })
    .catch(error => {
        console.error('Error:', error);
    })

function initReassort(JSONdata) {

    var newReassort = []
    console.log(JSONdata["data"])

    for (const [key, value] of Object.entries(JSONdata["descr"])) {
        newReassort.push({
            "code": key,
            "nom": JSONdata["descr"][`${key}`]["0"],
            "shortDescr": JSONdata["descr"][`${key}`]["1"],
            "longDescr": JSONdata["descr"][`${key}`]["2"],
            "quantite": JSONdata["invent"][`${key}`].length,
            "suppressed": false
        })
    }
    console.log(newReassort)
    return newReassort
}


function initReassortHTML(newReassort) {

    var newReassortHTML = "<table><tr><td> Code </td><td> Nom </td><td> Description </td><td> Détails </td><td> Photo </td><td> Ajouter </td><td> Quantité en magasin </td><td> Diminuer </td><td> Supprimer </td></tr>"

    for (const ligne of newReassort) {
        newReassortHTML += `<tr><td> ${ligne["code"]} </td><td> ${ligne["nom"]} </td><td> ${ligne["shortDescr"]} </td><td> ${ligne["longDescr"]} </td><td> Photo </td><td> <button onclick="increment(${ligne["code"]})"> + </button> </td><td id="${ligne["code"]}"> ${ligne["quantite"]} </td><td> <button onclick="decrement"> - </button> </td><td> Supprimer </td></tr>`
    }

    newReassortHTML += "</table>"

    return newReassortHTML
}

function increment(code) {
    add = document.getElementById(`${code}`)
    console.log("ouuu")
    var incr
    if (JSONdata["invent"][`${code}`].length == 0) { incr = 1 }
    else { incr = JSONdata["invent"][`${code}`][-1] + 1 }
    JSONdata["invent"][`${code}`].push(incr)
    add.innerHTML = JSONdata["invent"][`${code}`].length
}
/*
function decrement() {

}

function suppressed() {

}
function commit() {

}
*/