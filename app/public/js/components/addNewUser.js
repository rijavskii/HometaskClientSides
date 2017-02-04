/**
 * Created by aryzhavskij on 2/4/17.
 */
const request = require('./request');
const userActions = require('./form');

module.exports = function(){

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
        })
    });



});
};