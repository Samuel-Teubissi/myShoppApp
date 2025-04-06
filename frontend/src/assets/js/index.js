/*import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app";*/

const ETC = document.querySelector('.etc');
const line = document.querySelectorAll('.line');
const navL = document.querySelector('.nav-link');

ETC.addEventListener('click', () => {
    navL.classList.toggle('open');
    line.forEach(link => {
        link.classList.toggle('open');
    });
});


//ReactDOM.render(test, document.querySelector('#appJS'))