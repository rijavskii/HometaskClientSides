"use strict";
const request = require('./request');

module.exports = function(action){
    // console.log(">> form component <<");
    //
    switch (action){
        case "update": updateUser();
            break;
        case "delete": deleteUser();
            break;
    }

    function newUserRow(object) {
        return '<tr><td>' + object.id + '</td><td>' + object.name +
            '</td><td>' +
            '<a class="delete" id='+object.id+' href="#delete">Удалить</a> | ' +
            '<a class="update" href="#update">Изменить</a>' +
            '</td>' +
            '</tr>';
    };

    function deleteUser() {

        console.log(this);
        let id = this.getAttribute('id');
        // console.log(this.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].nodeValue);
        console.log(id);

        let object= {
            method : "DELETE",
            url : '/users/'+id,
            headers : ['Content-Type', 'application/json'],
            body : ""
        };

        request(object).then((response)=>{
            this.parentNode.parentNode.remove();
        });
    };

    function updateUser(){
        let changeNameForm = '<td>'+
            '<form action="" class="form-inline">'+
                '<div class="form-group">'+
                    '<label for="updateName" class="sr-only">Имя</label>' +
                    '<input class="form-control" type="text" placeholder="Вася">' +
                '</div>'+
                '&nbsp;'+
                '<button type="submit" class="changeName" class="btn btn-primary">Изменить</button>' +
            '</form>'+
            '</td>';
        this.parentNode.parentNode.insertAdjacentHTML('beforeEnd', changeNameForm);
        this.parentNode.remove();

        (function(){
            let changeName = document.getElementsByClassName('changeName');

            Array.from(changeName).forEach(function (element) {
                element.addEventListener('click', changeNameUser);
            });
        })()
    };

    function changeNameUser(){
        let newName = this.parentNode.childNodes[0].childNodes[1].value;
        console.log(newName, "Put user")
        let id = this.parentNode.parentNode.parentNode.childNodes[0].innerText;
        let oldName = this.parentNode.parentNode.parentNode.childNodes[1].innerText;

        let object= {
            method : "PUT",
            url : '/users/'+id,
            headers : ['Content-Type', 'application/json'],
            body : JSON.stringify({name: newName})
        };
        request(object).then((response)=>{
            let user = {
                id:id,
                name: newName
            };
            let updateDeleteHtml = '<a class="delete" id='+id+' href="#delete">Удалить</a> | ' +
                '<a class="update" href="#update">Изменить</a>' +
                '</td>';
            location.reload();
            console.log(this.parentNode.parentNode.parentNode.childNodes[1].innerTex = newName);
            //this.parentNode.parentNode.parentNode.childNodes[2].remove();
            console.log(this.parentNode.parentNode.childNodes[0]);
            //this.parentNode.parentNode.parentNode.insertAdjacentHTML('beforeEnd', newUserRow(updateDeleteHtml));

        })
    }
    let object= {
        method : "GET",
        url : '/users',
        headers : ['Content-Type', 'application/json'],
        body : ""
    };

    request(object).then((response)=> {
        let lastDelBtn = document.getElementsByClassName('delete').length;

        let users = JSON.parse(response);
        for (let i in users) {
            if (users[i]) {
                let tmp = {
                    name: users[i].name,
                    id: i
                };

                document.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeEnd', newUserRow(tmp));

            }
        }
    }).then(()=>{
        let delBtn = document.getElementsByClassName('delete');

        Array.from(delBtn).forEach(function (element) {
            element.addEventListener('click', deleteUser);
        });

        let updateBtn = document.getElementsByClassName('update');

        Array.from(updateBtn).forEach(function (element) {
            element.addEventListener('click', updateUser);
        });
    });
};