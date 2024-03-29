const URL = "https://cat-fact.herokuapp.com/facts";

const b=document.querySelector("#btn");
const para=document.querySelector("#fact");

const getfacts = async ()=>{

    console.log('getting data ...');
    let response = await fetch(URL);
    console.log(response.status);
    let result = await response.json();
    para.innerText=result[3].text;
};

// function getfacts()
// {
//     fetch(URL).then((res)=>
//     {
//         return res.json();
//     })
//     .then((data)=>
//     {
//         para.innerHTML=data[4].text;
//     })
// }


b.addEventListener("click", getfacts);

