const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".tocon select");
const msg = document.querySelector(".msg");

// console.log(fromcurr.value);
// console.log(tocurr.value);


for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}

const updateflag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if (amountval === "" || amountval < 1) {
        amountval = 1;
        amount.value = "1";
    }
    
    // console.log(fromcurr.value);
    // console.log(tocurr.value);
    const url = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();

    // console.log(fromcurr.value.toLowerCase());

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    // console.log(rate);

    let finalamt = rate*amountval;

    msg.innerText = `${amountval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}


btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateexchangerate();

});



window.addEventListener("load",() =>{
    updateexchangerate();
});