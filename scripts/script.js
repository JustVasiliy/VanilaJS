let wayTo = 'trending';
fetch(`https://content.guardianapis.com/search?q=${wayTo}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`)
.then((response) => response.json())
.then((data) => getNews(data.response.results, wayTo));
let countСoincidence = document.getElementById('countСoincidence');
let cards = document.getElementById('cardNews');
let importantNews = document.getElementById('importantNews');
let goTopBtn = document.getElementById('goTop');
let burgerMenu = document.getElementById('burgerMenu');
let navigation = document.querySelector('.navigation');
let categories = document.getElementById('Categories');
let dropdown = document.querySelector('.modalCategories');
let loader = `<div class="loader"></div>`;
    importantNews.innerHTML = loader;
let userScreen;
let timer;
let arrayNameForArt;


function getNews(data, wayTo){
    let arrayDates = [];
    data.forEach(item => {arrayDates.push(item.fields.firstPublicationDate)}) 
    cards.innerHTML ='';
    importantNews.innerHTML = '';
    showImportantNews(data[getFreshNews(arrayDates)], wayTo)
   console.log(wayTo)
    
    
    data.map(news => {
        
        let card = document.createElement('div');
        card.classList.add('card');
        let textP = '';
        if(news.fields.trailText.length >= 175){
            textP = `${news.fields.trailText.substr(0,175)}...`
        }else{
            textP = `${news.fields.trailText}...`;
        }
        card.innerHTML = `<a href="page2.html?${news.id}+${wayTo}" >
        <img src=${news.fields.thumbnail} alt="pictures">
        <article>
            <h3 class="nameForArt">${news.fields.headline}</h3>
            <p>${textP}</p>
            
        </article>
       <div class="bottomBox">
       <time datetime="${news.fields.firstPublicationDate}">${getTimePublication(news.fields.firstPublicationDate)} days ago</time>
            <a href="page2.html?${news.id}+${wayTo}">Read more</a>
       </div>
    </a>`
        cards.appendChild(card)
       
    })
    
    arrayNameForArt = document.querySelectorAll('.nameForArt');
    
    

    
}

// Функция высчитывает количество дней с даты публикации
function getTimePublication(publDate){
    publDate = Date.parse(publDate);
    let nowDate = new Date();
    
    let days = nowDate.getTime() - publDate;
    return Math.floor(days / 1000 / 60 /60 / 24)
    
}
// Функция генерирует главную новость в section
function showImportantNews(freshCard, wayTo){
    
    let imoprtantCard = document.createElement('div');
    imoprtantCard.classList.add('importantNews')
    imoprtantCard.innerHTML = `<div class="article">
        <h1><a href="page2.html?${freshCard.id}+${wayTo}">${freshCard.fields.headline}</a></h1>
        <p>${freshCard.fields.trailText}</p>
        <div class="underBox">
            <time datetime="${freshCard.fields.firstPublicationDate}">${getTimePublication(freshCard.fields.firstPublicationDate)} days ago</time>
            <a href="page2.html?${freshCard.id}+${wayTo}">Read more</a>
        </div>
        
    </div>

    <a href="page2.html?${freshCard.id}+${wayTo}"><img src=${freshCard.fields.thumbnail} alt="image"></a>`;
    importantNews.appendChild(imoprtantCard);
}

function getFreshNews(array){   
    let newArr = array.map(item => Date.parse(item));
    let minNumb = newArr.reduceRight((prev, item) => {
        if(prev < item){
            return item;
        }else{
            return prev;
        }
    })
    return newArr.indexOf(minNumb);
}


// Кнопка scrollTo
goTopBtn.onclick = function(){
    userScreen = window.pageYOffset;
    scrollToTop();
}
function scrollToTop(){
    if(userScreen > 0){
        window.scrollTo(0,userScreen);
        userScreen = userScreen - 200;
        timer = setTimeout(scrollToTop, 50)
    }else{
        clearTimeout(timer);
        window.scrollTo(0,0)
    }
}

// Бургер меню
burgerMenu.onclick = function(){
    navigation.classList.toggle('active');
    burgerMenu.classList.toggle('active');
}
categories.onmouseover = function(){
    dropdown.classList.remove('hide');
}
categories.onmouseout = function(){
    dropdown.classList.add('hide');
}


let ulCategories = document.querySelector('.categories')
ulCategories.onclick = function(event){
    let target = event.target;

    let wayTo = target.innerText.trim().toLowerCase();
    importantNews.innerHTML = loader;
    cards.innerHTML = loader;
    fetch(`https://content.guardianapis.com/search?q=${wayTo}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`)
.then((response) => response.json())
.then((data) => getNews(data.response.results, wayTo));
}

// let test = document.getElementsByClassName('headerContainer');
// console.log(test[0].closest('.container-wrapper'))
// Поиск по статье
countСoincidence.style.display = "none";
document.getElementById("search").onclick = function(){
    countСoincidence.style.display = 'block'
    let counter =0;
    let val = document.getElementById('inputSearch').value;
    
    for (let i = 0; i < arrayNameForArt.length; i++) {
        
        if(val != ''){
            
            let regExp = new RegExp(val, 'gi');
            arrayNameForArt[i].innerHTML = (arrayNameForArt[i].textContent).replace(regExp,'<mark class="count">$&</mark>');
           if( regExp == document.getElementsByTagName('mark').innerText){
            console.log(arrayNameForArt[i].closest('.card'))
           }
        }else{
            counter = 0;
        }
        
    }
    let count = document.querySelectorAll('.count').length;
    counter = count;
    countСoincidence.innerHTML = `<span class="countСoincidenceText">Совпадений:${counter}</span>`
}
// Закрывает окно с количеством совпадений
window.addEventListener('click', e =>{

    if(!e.target.closest('#countСoincidence')){
        countСoincidence.style.display = "none";

        let arrayMarks = document.getElementsByClassName('count');
        for (let index = 0; index < arrayMarks.length; index++) {
           arrayMarks[index].classList.add('bgcMarks')
            
        }

    }
   
    
})