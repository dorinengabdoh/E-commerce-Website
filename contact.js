import { navbar } from './main.js'

const container1 = document.querySelector('.container1')

if (container1)container1.innerHTML += navbar()
console.log(container1)
