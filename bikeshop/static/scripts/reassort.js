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
            "img": JSONdata["img"][`${key}`],
            "quantite": JSONdata["invent"][`${key}`].length,
            "suppressed": false
        })
    }
    console.log(newReassort)
    return newReassort
}

function initReassortHTML(newReassort) {

    var newReassortHTML =
        `<table>
        <tr>
            <td> Code </td>
            <td> Nom </td>
            <td> Description </td>
            <td> Détails </td>
            <td> Photo </td>
            <td> Ajouter </td>
            <td> Quantité en magasin </td>
            <td> Diminuer </td>
            <td> Supprimer </td></tr>`

    for (const ligne of newReassort) {
        newReassortHTML +=
            `<tr id="velo_${ligne["code"]}">
            <td> ${ligne["code"]} </td>
            <td> ${ligne["nom"]} </td>
            <td> ${ligne["shortDescr"]} </td>
            <td> <details> <summary> Détails </summary>
                    <p>${ligne["longDescr"]}</p>
                </details>
            </td>
            <td> <img src="${ligne["img"]}" alt="Image non disponible" height="125" width="125"/> </td>
            <td> <button onclick="increment(${ligne["code"]})"> + </button></td>    
            <td id="quantite_${ligne["code"]}"> ${ligne["quantite"]} </td>
            <td> <button onclick="decrement(${ligne["code"]})"> - </button> </td>
            <td> <button onclick="suppressed(${ligne["code"]})"> Supprimer </button> </td>
        </tr>`
    }

    newReassortHTML += `</br><<button onclick="commit()"> Commit </button>></table>`

    return newReassortHTML
}

function increment(code) {
    add = document.getElementById(`quantite_${code}`)
    var incr
    if (JSONdata["invent"][`${code}`].length == 0) { incr = 1 }
    else { incr = JSONdata["invent"][`${code}`][JSONdata["invent"][`${code}`].length - 1] + 1 }
    JSONdata["invent"][`${code}`].push(incr)
    add.innerHTML = JSONdata["invent"][`${code}`].length
}

function decrement(code) {
    sub = document.getElementById(`quantite_${code}`)
    JSONdata["invent"][`${code}`].pop()
    sub.innerHTML = JSONdata["invent"][`${code}`].length
}
function suppressed(code) {
    sup = document.getElementById(`velo_${code}`)
    sup.style.opacity = 0.33
    sup.innerHTML
}
function commit() {
    const suppresed = confirm("Souhaitez-vous confirmer le réassort ?")
    if (suppressed) {
        fetch('/reassort', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(JSONdata)
        })
            .then(response => {

                if (response.ok) {
                    console.log(response);
                }
                else {
                    throw Error('Something went wrong');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
