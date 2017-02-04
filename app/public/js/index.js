"use strict";

function initialize(){
    console.log("hello world1");

    require('./components/addNewUser')();
    require('./components/form')();
    require('./components/table')();

    // (require('./components/showAllUsers'))();
}

initialize();