document.addEventListener("deviceready", loadContacts, false);

function loadContacts() {
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ['name'];

    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts) {
    console.log(contacts);
    let code = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (contact.name && contact.name.formatted && contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            code += `
            <li>
                <a href="#">
                    <img src="./img/utilisateur.png" alt="photo du contact">
                    <h1>${contact.name.formatted}</h1>
                    <p>${contact.phoneNumbers[0].value}</p>
                </a>
            </li>
            `;
        }
    }

    contactList.innerHTML = code;
    $(contactList).listview('refresh');
}

function handleError(error) {
    console.log(error);
}

function saveContact() {
    let contact = navigator.contacts.create();

    let name = new ContactName();
    name.givenName = document.getElementById("firstname").value;
    name.familyName = document.getElementById("lastname").value;
    contact.name = name;

    let phoneNumbers = [];
    let mobile = document.getElementById("numberPhone").value;

    if (mobile) {
        phoneNumbers.push(new ContactField('mobile', mobile, true));
    }
    contact.phoneNumbers = phoneNumbers;
    contact.save(onSuccess, onError);
}

function onSuccess(contact) {
    alert("Sauvegarde du contact avec succès");
    window.history.back();
    loadContacts();
}

function onError(error) {
    alert(error);
    window.history.back();
}