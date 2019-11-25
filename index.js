var form = document.getElementsByTagName('form')[0]
var tableBody = document.getElementById("contact_table_body")
var imgSrcs = ["profile.svg","cancel.svg"]
var addOrEdit = false;
var editedId
var Contact = function (id,name,email,phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
}



var Contacts = function () {
    this.data = [];

}

Contacts.prototype.addContact = function (contact) {
    contact.id = this.data.length
    this.data.push(contact);
}

Contacts.prototype.removeContact = function (id) {
    for(let i = 0;i<this.data.length;++i)
    {
        if(this.data[i].id==id)
        {
            this.data.splice(i,1);
            break
        }
    }
    this.displayContacts()
}


Contacts.prototype.editContact = function (id,newContact) {
    for(let i = 0;i<this.data.length;++i)
    {
        if(this.data[i].id==id)
        {
            this.data[i] = newContact
            break
        }
    }
}

Contacts.prototype.getContact = function (id) {
    return this.data[id]
}

Contacts.prototype.getAllContacts = function () {
    return this.data
}

Contacts.prototype.displayContacts = function () {
    tableBody.innerText=''

    for(var i=0;i<this.data.length;++i)
    {
        var edit = document.createElement('img')

        edit.src = imgSrcs[0]
        edit.addEventListener("click",function (e) {
            var id = e.path[2].id
            var item =contacts.getContact(id)
            var inputs = document.getElementsByTagName("input")
            inputs[0].value = item.name
            inputs[1].value = item.email
            inputs[2].value = item.phone
            addOrEdit = true
            editedId = item.id

        })

        var deleteImg = document.createElement('img')
        deleteImg.src = imgSrcs[1]
        deleteImg.addEventListener("click",function (e) {
           contacts.removeContact(e.path[2].id)
        })
        var tr = document.createElement('tr');
        tr.setAttribute("id",this.data[i].id)
        var tdName = document.createElement('td');
        var tdEmail = document.createElement('td');
        var tdPhone = document.createElement('td');
        var tdEdit = document.createElement('td');
        var tdDelete = document.createElement('td');
        tdEdit.appendChild(edit)
        tdDelete.appendChild(deleteImg)
        tdName.textContent = this.data[i].name
        tdEmail.textContent = this.data[i].email
        tdPhone.textContent = this.data[i].phone
        tr.appendChild(tdName)
        tr.appendChild(tdEmail)
        tr.appendChild(tdPhone)
        tr.appendChild(tdEdit)
        tr.appendChild(tdDelete)
        tableBody.appendChild(tr)

    }
}


var contacts = new Contacts();

form.addEventListener('submit',function (e) {
    e.preventDefault()
    var inputs = document.getElementsByTagName("input")
    var name = inputs[0].value
    var email = inputs[1].value
    var phone = inputs[2].value

    if(addOrEdit)
    {
       contacts.editContact(editedId,new Contact(editedId,name,email,phone))
        addOrEdit = false

    }
    else
    {
       contacts.addContact(new Contact(-1,name,email,phone))
    }
   contacts.displayContacts()
    inputs[0].value=""
    inputs[1].value=""
    inputs[2].value=""
})







