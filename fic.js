const clients = [
    {
        id: 1, nom: "Ndiaye", prenom: "Aissata", number: "771111111", mail: "aissata@gmail.com",
        image: "https://images.unsplash.com/photo-1674574124649-778f9afc0e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8ZmVtbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        transactions: {
            sens: [1],
            montants: [14000],
        }
    },
    {
        id: 2, nom: "Diop", prenom: "Nanette", number: "781111111", mail: "diopgmail.com",
        image: "https://images.unsplash.com/photo-1590649880765-91b1956b8276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        transactions: {
            sens: [1],
            montants: [12500]
        }
    },
    {
        id: 3, nom: "Ndiaye", prenom: "Maimouna", number: "708764534", mail: "ndiaye@gmail.com",
        image: "https://media.istockphoto.com/id/1412652081/fr/photo/propri%C3%A9taire-dune-petite-entreprise-ethnique-souriant-joyeusement-dans-son-magasin.jpg?b=1&s=170667a&w=0&k=20&c=_CkUGLuqyLt5sjQZuXF3ZT2uobErqHT54dI86HvROJ4=",
        transactions: {
            sens: [1],
            montants: [500]
        }
    },
    {
        id: 4, nom: "Niang", prenom: "May", number: "708764534", mail: "niang@gmail.com",
        image: "https://media.istockphoto.com/id/1412652081/fr/photo/propri%C3%A9taire-dune-petite-entreprise-ethnique-souriant-joyeusement-dans-son-magasin.jpg?b=1&s=170667a&w=0&k=20&c=_CkUGLuqyLt5sjQZuXF3ZT2uobErqHT54dI86HvROJ4=",
        transactions: {
            sens: [-1, 1],
            montants: [500, 4000]
        }
    }
];
let telephone = document.querySelector('#telephone')
const lastname = document.querySelector('#lastname');
const firstname = document.querySelector('#firstname');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const photo = document.querySelector('img');
const tbody = document.querySelector('tbody');
const transactions = document.querySelector(".transactions tbody");
const count = document.querySelector("code");
const btn = document.getElementById("btnDetail");
const next = document.querySelector(".navigation .next");
let solde = document.querySelector('#solde');
let form = document.querySelector('.form')
let save = form.lastElementChild
let select = document.querySelector('#trans')
let input = document.querySelector('#mnt')
const saveClient = document.querySelector('.save')
const closeModal = document.querySelector('.cancel')
const openModal = document.querySelector('.open-modal')
const addClientModal = document.querySelector('.modal-add-client')
const nom = document.querySelector('#nom')
const prenom = document.querySelector('#prenom')
const mail = document.querySelector('#mail')
const newPhone = document.querySelector('#new-tel')
const image = document.querySelector('#photom')
const searchResult = document.querySelector('.search-results')
const inputTel = document.querySelector('#tel')

let date = new Date().toLocaleDateString();
let i = Math.floor(Math.random() * clients.length);

openModal.addEventListener('click', () => addClientModal.style.display = 'block')
closeModal.addEventListener('click', () => addClientModal.style.display = 'none')

saveClient.addEventListener('click', () => {
    const firstName = prenom.value.trim();
    const lastName = nom.value.trim();
    const telephone = newPhone.value.trim();
    const email = mail.value.trim();
    const imageUrl = image.value.trim();

    if (firstName === '' || lastName === '' || telephone === '' || email === '' || imageUrl === '') {
        notification('Veuillez remplir tous les champs.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        notification('Veuillez entrer une adresse e-mail valide.');
    } else if (!/^[\d()+\-\s]*$/.test(telephone)) {
        notification('Veuillez entrer un numéro de téléphone valide.');
    } else if (telephone.length < 9 || telephone.length > 12) {
        notification('Le numéro de téléphone doit contenir entre 9 et 12 chiffres.');
    } else if (!/(https?:\/\/.*\.)/i.test(imageUrl)) {
        notification('Veuillez entrer une URL d\'image valide .');
    } else {
        const newUser = {
            id: clients[clients.length - 1].id + 1,
            nom: lastName,
            prenom: firstName,
            number: telephone,
            mail: email,
            image: imageUrl,
            transactions: {
                sens: [],
                montants: []
            }
        };
        clients.push(newUser);
        addClientModal.style.display = 'none';
        photo.src = imageUrl;
    }
});

createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
solde.innerText = getSoldeByClient(clients[i]);
creerClients(clients[i])

function creerClients(client) {
    lastname.innerHTML = client.nom
    firstname.innerHTML = client.prenom
    phone.innerHTML = client.number
    email.innerHTML = client.mail
    photo.src = client.image;
}
next.addEventListener('click', () => {
    i = Math.floor(Math.random() * clients.length);
    if (clients.length > i) {
        creerClients(clients[i])
        createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date)
        solde.innerText = getSoldeByClient(clients[i])
    }
})

btn.addEventListener('click', () => {
    if (form.style.display === 'none') {
        form.style.display = 'block'
    } else {
        form.style.display = 'none'
    }
})
let td4;
function createTransaction(montants, sens, date) {
    tbody.innerHTML = '';
    count.innerHTML = montants.length
    for (let i = 0; i < montants.length; i++) {
        let icon = document.createElement("i");
        icon.className = "fa-duotone fa-minus io"
        let trans = document.createElement("tr");
        trans.className = "trans"
        trans.setAttribute("data-id", i);
        tbody.appendChild(trans)
        let td1 = document.createElement("td");
        td1.className = "td1"
        td1.innerText = i
        let td2 = document.createElement("td");
        td2.className = "td2"
        td2.innerText = date
        let td3 = document.createElement("td");
        td3.className = "td3"
        if (sens[i] == 1) {
            td3.innerText = "depot"
            td3.style.color = "blue"
            icon.style.opacity = 0
        } else if (sens[i] == -1) {
            td3.innerText = "retrait"
            td3.style.color = "red"
            icon.style.opacity = 1
        } else {
            td3.innerText = "annulé"
            trans.classList.add("active")
        }
        let td4 = document.createElement("td");
        td4.className = "td4"
        td4.innerText = montants[i];
        td1.appendChild(icon)
        trans.append(td1, td2, td3, td4)
    }
}

function names() {
    let trans = document.querySelectorAll("tbody>tr");

    trans.forEach(trans => {
        trans.addEventListener("click", () => {
            let td1 = trans.children[0];
            let td2 = trans.children[1];
            let td3 = trans.children[2];
            let td4 = trans.children[3];
            let st = trans.dataset.id;
            if (clients[i].transactions.sens[st] == -1) {
                td1.style.textDecoration = "line-through";
                td2.style.textDecoration = "line-through";
                td3.style.textDecoration = "line-through";
                td4.style.textDecoration = "line-through";
            }
            let clienta = clients[i];
            let clientb = clients.find(client => client.number === inputTel.value);

            td4Value = parseFloat(td4.innerText);

            annulerTransfer(clienta, clientb, td4);
            if (clienta) {
                let a = solde.innerText
                a = getSoldeByClient(clienta) + td4Value;
                solde.innerText = a
            }
        })
    });
}

function annulerTransfer(client1, client2, amount) {
    console.log(amount.parentElement);
    const indice = amount.parentElement.dataset.id
    console.log(indice);
    client1.transactions.sens[indice] = 2;
    client2.transactions.sens[indice] = 2;
    solde.innerText = parseFloat(solde.innerText) - (+amount.innerText);
}

let recipient;
save.addEventListener('click', () => {
    if (input.value === '') {
        notification("Veuillez saisir un montant");
    } else if (input.value < 500) {
        notification("Le montant minimum pour un retrait est de 500 FCFA.");
    } else if (select.value == 'd') {
        if (inputTel.value === "") {
            clients[i].transactions.montants.push(parseFloat(input.value));
            clients[i].transactions.sens.push(1);
            solde.innerText = getSoldeByClient(clients[i]);
            createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
            input.value = "";
        } else {
            if (solde.innerText < parseInt(input.value)) {
                notification("Le montant minimum pour un retrait est de 500 FCFA.");
            } else {
                console.log(solde.innerText);

                let recipient = clients.find(client => client.number === inputTel.value);
                if (recipient) {
                    transfer(clients[i], recipient, parseFloat(input.value));
                    names()
                    input.value = "";
                }
                else {
                    const client = clients[i];
                    const inputValue = parseFloat(input.value);
                    client.transactions.sens.push(2);
                    client.transactions.montants.push(inputValue);
                    solde.innerText = getSoldeByClient(client) 
                    createTransaction(client.transactions.montants, client.transactions.sens, date);
                    setTimeout(() => {
                        let trans = document.querySelector("tbody>tr:last-child");
                        let td5 = trans.children[2]
                        let td6 = trans.children[3]
                        td5.style.color = "green";
                        td5.innerText = "annulé";
                        td6.style.textDecoration = "line-through";
                        solde.innerText = getSoldeByClient(client)+ inputValue  
                    }, 3000);

                }
            }
            input.value = "";
        }
    } else if (select.value == 'r') {
        if (getSoldeByClient(clients[i]) < input.value) {
            notification("Solde insuffisant pour effectuer le retrait.");
        } else {
            clients[i].transactions.montants.push(parseFloat(input.value));
            clients[i].transactions.sens.push(-1);
            input.value = "";
        }
        solde.innerText = getSoldeByClient(clients[i]);
        createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
    }
});
// let recipient;
// save.addEventListener('click', () => {
//     if (input.value === '') {
//         notification("Veuillez saisir un montant");
//     } else if (input.value < 500) {
//         notification("Le montant minimum pour un retrait est de 500 FCFA.");
//     } else if (select.value == 'd') {
//         if (inputTel.value === "") {
//             clients[i].transactions.montants.push(parseFloat(input.value));
//             clients[i].transactions.sens.push(1);
//             solde.innerText = getSoldeByClient(clients[i]);
//             createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
//             input.value = "";
//         } else {
//             if (solde.innerText < parseInt(input.value)) {
//                 notification("Le montant minimum pour un retrait est de 500 FCFA.");
//             } else {
//                 console.log(solde.innerText);

//                 let recipient = clients.find(client => client.number === inputTel.value);
//                 if (recipient) {
//                     transfer(clients[i], recipient, parseFloat(input.value));
//                     names()
//                     input.value = "";
//                 }
//                 else {
//                     const client = clients[i];
//                     const inputValue = parseFloat(input.value);
//                     // client.transactions.sens.push(-1);
//                     client.transactions.montants.push(inputValue);
//                     solde.innerText = getSoldeByClient(client) - inputValue
//                     createTransaction(client.transactions.montants, client.transactions.sens, date);
//                     setTimeout(() => {
//                         const client = clients[i];
//                         let trans = document.querySelector("tbody>tr:last-child");
//                         let st = trans.dataset.id;
//                         console.log(st);
//                         let td5 = trans.children[2]
//                         // let td6 = trans.children[3]
//                         // td5.style.color = "green";
//                         // td5.innerText = "annulé";
//                         // td6.style.textDecoration = "line-through";
//                         solde.innerText = getSoldeByClient(client)

//                         console.log(td5.parentElement);
//                         const indice = td5.parentElement.dataset.id
//                         console.log(indice);
//                         client.transactions.sens[indice] = 2;

//                     }, 3000);

//                 }
//             }
//             input.value = "";
//         }
//     } else if (select.value == 'r') {
//         if (getSoldeByClient(clients[i]) < input.value) {
//             notification("Solde insuffisant pour effectuer le retrait.");
//         } else {
//             clients[i].transactions.montants.push(parseFloat(input.value));
//             clients[i].transactions.sens.push(-1);
//             input.value = "";
//         }
//         solde.innerText = getSoldeByClient(clients[i]);
//         createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
//     }
// });

function transfer(client1, client2, amount) {
    client1.transactions.montants.push(amount);
    client1.transactions.sens.push(-1);
    client2.transactions.montants.push(amount);
    client2.transactions.sens.push(1);
    createTransaction(client1.transactions.montants, client1.transactions.sens, date);
    solde.innerText = parseFloat(solde.innerText) - amount;
}

function getSoldeByClient(client) {
    let solde = 0;
    for (let i = 0; i < client.transactions.montants.length; i++) {
        if (client.transactions.sens[i] == 1) {
            solde += client.transactions.montants[i];
        } else if (client.transactions.sens[i] == -1 || client.transactions.sens[i] == 2) {
            solde -= client.transactions.montants[i];
        }
    }
    return solde;
}
/*-------------------------------------------------------------------------*/
let container = document.querySelector('.container')
function notification(text) {
    let notifi = document.createElement("div");
    notifi.textContent = text;
    notifi.classList.add("notification");
    container.appendChild(notifi);
    setTimeout(() => {
        container.removeChild(notifi);
    }, 2000);
}

let a = document.querySelector('.a')
function showResultItem(number) {
    for (const client of clients) {
        if (deleteSpace(client.number).startsWith(deleteSpace(number))) {
            const li = createSearchItem(deleteSpace(client.number))
            searchResult.appendChild(li)
            li.addEventListener('click', () => {
                inputTel.value = client.number
                searchResult.innerHTML = ''
            })
        }
    }
}

function getnumberclients(telval) {
    let client = clients.find(u => deleteSpace(u.number) == telval)
    return client
}

function deleteSpace(tel) {
    let numero = "";
    for (const char of tel) {
        if (char != " ") {
            numero += char
        }
    }
    return numero
}

inputTel.addEventListener('input', () => {
    const searchPhone = inputTel.value
    searchResult.innerHTML = ''
    if (searchPhone != '') {
        showResultItem(deleteSpace(searchPhone))
    }
})

function createElement(tagName, attributes = {}, content = '') {
    const element = document.createElement(tagName)
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    element.innerText = content
    return element
}

function createSearchItem(number) {
    return createElement('li', { class: 'result-item' }, number)
}

const inputRecherche = document.querySelector('#inputrecherche')
const barreInfo = document.querySelector('.barre-info')
function barreClient(prenom, nom, img) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const image = document.createElement('img');
    li.classList.add('infoClientRec');
    span.classList.add('nom');
    span.textContent = `${prenom} ${nom}`;
    image.classList.add('img');
    image.src = img;
    li.appendChild(span);
    li.appendChild(image);
    return li;
}

inputRecherche.addEventListener('input', () => {
    const motCherche = inputRecherche.value
    barreInfo.innerHTML = ''
    if (motCherche != '') {
        RechercheUser(motCherche)
    }
})

function RechercheUser(motCherche) {
    for (let client of clients) {
        if (client.nom.toLowerCase().includes(motCherche.toLowerCase()) || client.prenom.toLowerCase().includes(motCherche.toLowerCase()) || client.number.includes(motCherche)) {
            const li = barreClient(client.prenom, client.nom, client.image)
            barreInfo.appendChild(li)
            li.addEventListener('click', () => {
                i = clients.indexOf(client)
                creerClients(clients[i])
                createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
                solde.innerText = getSoldeByClient(clients[i]);
                barreInfo.innerHTML = '';
            })
        }
    }
}
/*------------------------------------------------------------------------*/
const icon = document.querySelector('.a')
const icon2 = document.querySelector('.b')
icon.addEventListener("click", () => {
    let recipient = clients.find(client => client.number === inputTel.value);
    creerClients(recipient)
    createTransaction(recipient.transactions.montants, recipient.transactions.sens, date)
    solde.innerText = getSoldeByClient(recipient)
})

const mod = document.querySelector(".mod")
icon2.addEventListener("click", () => {
    mod.style.display = "block"
    const textsup = document.querySelector('.textsup')
    // i = clients.indexOf(client)
    textsup.innerText = clients[i].nom + " " + clients[i].prenom
})

const confirmer = document.querySelector('.ba')
const annule = document.querySelector(".bb")

confirmer.addEventListener("click", () => {
    clients.splice(i, 1)
    mod.style.display = "none"
    if (clients.length < i) {
        solde.innerText = getSoldeByClient(clients[i]);
        creerClients(clients[i])
        createTransaction(clients[i].transactions.montants, clients[i].transactions.sens, date);
    }
    else {
        const user = {
            id: "",
            nom: "",
            prenom: "",
            number: "",
            mail: "",
            image: "",
            transactions: {
                sens: [],
                montants: [],
            }
        };
        solde.innerText = getSoldeByClient(user);
        creerClients(user)
        tbody.innerHTML = "";
        count.innerText = ""
    }
})

annule.addEventListener("click", () => {
    mod.style.display = "none"
})

/*------------------------------------------------------------------------*/
select.addEventListener("click", () => {
    if (select.value === "r") {
        inputTel.disabled = true
        inputTel.value = " ";
    } else {
        inputTel.disabled = false
    }
})
/*------------------------------------------------------------------------*/
