/**
 * Created by aryzhavskij on 2/4/17.
 */
const request = require('./request');
const userActions = require('./form');

module.exports = function(){

    function newUserRow(object) {
        return '<tr><td>' + object.id + '</td><td>' + object.name +
            '</td><td>' +
            '<a class="delete" id='+object.id+' href="#delete">Удалить</a> | ' +
            '<a class="update" href="#update">Изменить</a>' +
            '</td>' +
            '</tr>';
    };


    document.getElementById('add').addEventListener('click',function(){
        return new Promise(()=>{
        let newUserName = document.getElementById('name').value;
        let object= {
            method : "POST",
            url : '/users',
            headers : ['Content-Type', 'application/json'],
            body : JSON.stringify({name: newUserName})
        };
        request(object).then((response)=>{
            let user = {
                id : JSON.parse(response).id,
                name : newUserName
            };
            console.log(user.id);
            document.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeEnd', newUserRow(user));
        }).then(()=>{
            (function() {
                document.getElementsByClassName('delete')[document.getElementsByClassName('delete').length-1].
                addEventListener('click', userActions('delete'));

                document.getElementsByClassName('update')[document.getElementsByClassName('delete').length-1].
                addEventListener('click', userActions('update'));
            })
        })
    });



});
};