const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI(){

list.innerHTML="";

let total=0;
let incomeTotal=0;
let expenseTotal=0;

transactions.forEach((t,index)=>{

const li=document.createElement("li");

li.innerHTML=`${t.text} <span>₹${t.amount}</span>`;

list.appendChild(li);

total += t.amount;

if(t.amount > 0){
incomeTotal += t.amount;
}else{
expenseTotal += t.amount;
}

});

balance.innerText = "₹"+total;
income.innerText = "₹"+incomeTotal;
expense.innerText = "₹"+Math.abs(expenseTotal);

updateChart();

}

form.addEventListener("submit",function(e){

e.preventDefault();

const transaction={
text:text.value,
amount:+amount.value
};

transactions.push(transaction);

localStorage.setItem("transactions",JSON.stringify(transactions));

text.value="";
amount.value="";

updateUI();

});

function updateChart(){

const incomeTotal = transactions
.filter(t=>t.amount>0)
.reduce((acc,t)=>acc+t.amount,0);

const expenseTotal = transactions
.filter(t=>t.amount<0)
.reduce((acc,t)=>acc+t.amount,0);

const ctx=document.getElementById("chart");

new Chart(ctx,{

type:"pie",

data:{
labels:["Income","Expense"],
datasets:[{
data:[incomeTotal,Math.abs(expenseTotal)]
}]
}

});

}

updateUI();
