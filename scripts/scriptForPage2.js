let locat = window.location.search.substring(1);
const specialSimbol = /[\\[{().+*?|^$]/g;
let wayTo = locat.substring(+locat.indexOf('+') + 1 );
let idVisibleNews =  locat.slice(0, locat.indexOf('+'));
console.log(idVisibleNews)
console.log(wayTo)
let articleNews = document.getElementById('articleNews');
let countСoincidence = document.getElementById('countСoincidence');

let burgerMenu = document.getElementById('burgerMenu');
let navigation = document.querySelector('.navigation');
let categories = document.getElementById('Categories');
let dropdown = document.querySelector('.modalCategories');
fetch(`https://content.guardianapis.com/search?q=${wayTo}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`)
.then((response) => response.json())
.then((data) => showNews(data.response.results));



let arrayParagraphs;


function showNews(data){
    


    let actualNews = data.filter(obj => {
        if(idVisibleNews == obj.id){
            return obj;
        }
    });
    actualNews = actualNews[0];
    let visibleNews = document.createElement('div');
    visibleNews.innerHTML = `<img src=${actualNews.fields.thumbnail} alt="pictures" class="topPictures">
    <div class="containerPage2" >
        <h1 class="captionPage2">${actualNews.fields.headline}</h1>
        <div class="underCaption">
            <strong>Written ${actualNews.fields.byline}</strong>
            <time datetime="20021-07-07">${getTimePublication(actualNews.fields.firstPublicationDate)} days ago</time>
        </div>
        
        <p class="paragraphPage2" id="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ad cum laboriosam et veniam excepturi repellendus molestias, libero, quam maxime esse nemo, culpa eveniet. Ad adipisci perspiciatis maxime libero ab cumque omnis quae neque fuga voluptatibus at architecto necessitatibus accusantium veniam similique quibusdam blanditiis quos, sunt ex voluptatem aperiam eos quia deserunt repudiandae. Iure enim magnam voluptatem ea explicabo cum id? A architecto sunt perspiciatis reiciendis, cupiditate excepturi assumenda ea consectetur necessitatibus fugiat quisquam fuga. Quidem excepturi rerum ex ipsum obcaecati labore accusantium tempore, maiores error dolore recusandae eaque aut consectetur a cumque repudiandae cupiditate ut. Aliquid, rerum inventore delectus, voluptatibus autem ullam laborum quod tempore est nisi expedita repellat a? Voluptates porro natus, mollitia deserunt aliquid illo cum itaque repudiandae esse possimus vero, at corporis. Dolorum porro culpa incidunt ratione sit eum! Et eveniet, possimus illum quisquam sapiente, veniam similique ex qui recusandae vel autem sed sequi provident. Incidunt.</p>
        <p class="paragraphPage2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ad cum laboriosam et veniam excepturi repellendus molestias, libero, quam maxime esse nemo, culpa eveniet. Ad adipisci perspiciatis maxime libero ab cumque omnis quae neque fuga voluptatibus at architecto necessitatibus accusantium veniam similique quibusdam blanditiis quos, sunt ex voluptatem aperiam eos quia deserunt repudiandae. Iure enim magnam voluptatem ea explicabo cum id? A architecto sunt perspiciatis reiciendis, cupiditate excepturi assumenda ea consectetur necessitatibus fugiat quisquam fuga. Quidem excepturi rerum ex ipsum obcaecati labore accusantium tempore, maiores error dolore recusandae eaque aut consectetur a cumque repudiandae cupiditate ut. Aliquid, rerum inventore delectus, voluptatibus autem ullam laborum quod tempore est nisi expedita repellat a? Voluptates porro natus, mollitia deserunt aliquid illo cum itaque repudiandae esse possimus vero, at corporis. Dolorum porro culpa incidunt ratione sit eum! Et eveniet, possimus illum quisquam sapiente, veniam similique ex qui recusandae vel autem sed sequi provident. Incidunt.</p>
        <h4>Section</h4>
        <p class="paragraphPage2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, porro asperiores molestiae placeat animi qui nesciunt? Magni inventore doloremque similique debitis delectus, vitae dicta alias dolor voluptates sint maiores suscipit nobis praesentium quo in aliquid optio porro cumque dolores officiis esse vel consequuntur? Nemo id voluptatum, quos laborum blanditiis culpa quaerat doloribus eius corporis non explicabo libero omnis animi fugit quas quisquam voluptates quidem consequatur eligendi at quasi accusantium quibusdam odit magni. Sapiente ipsum totam molestiae hic consectetur ipsa eos aut impedit ratione, tempora fuga necessitatibus autem aperiam qui, laudantium eius aliquid ut voluptatum, odit veritatis. Ipsum vitae cum nisi?</p>
        <h4>Sectoin 1.10.33</h4>
        <p class="paragraphPage2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repudiandae sapiente, quam accusamus impedit quis earum eum unde natus, recusandae labore saepe distinctio, doloribus voluptatem est amet dolorum. Modi nam rerum non dolore vel doloribus qui quia quas quos nostrum vitae earum at asperiores minus laborum temporibus odio perspiciatis cupiditate ducimus, ipsa ipsum consequatur nemo, eum cum. Quia facilis cupiditate eius architecto. Dolor, quia officia! Est similique non soluta delectus eaque error iste temporibus numquam nostrum aliquid accusantium molestiae, cum at, rem earum sit aliquam, alias itaque quasi natus? Quae, porro accusantium. Itaque culpa molestiae libero quod. Sapiente saepe reprehenderit, magni tenetur beatae quia. Nesciunt quibusdam modi doloremque quidem iusto error, nobis exercitationem quasi aliquid vero? Dolores, eius veritatis non soluta accusamus sapiente similique sed laborum possimus, corrupti dicta. Sit, totam? Modi repudiandae iste, repellat voluptates quaerat autem corrupti porro omnis nisi temporibus similique beatae, perspiciatis provident consequuntur quod minus.</p>
        
    </div>`;
    articleNews.appendChild(visibleNews);
   
    
    arrayParagraphs = document.querySelectorAll('.paragraphPage2');
    
}
function getTimePublication(publDate){
    publDate = Date.parse(publDate);
    let nowDate = new Date();
    
    let days = nowDate.getTime() - publDate;
    return Math.floor(days / 1000 / 60 /60 / 24)
    
}




// Поиск по статье
countСoincidence.style.display = "none";
document.getElementById("search").oninput = function(){
    countСoincidence.style.display = 'block'
    let counter =0;
    let val = this.value;
    
    for (let i = 0; i < arrayParagraphs.length; i++) {
        
        if(val != ''){
            
            // if(specialSimbol.arrayParagraphs(val)){
            //     val = val.replace(specialSimbol, '\\$&')
            
            let regExp = new RegExp(val, 'gi');
            arrayParagraphs[i].innerHTML = (arrayParagraphs[i].textContent).replace(regExp,'<mark class="count">$&</mark>');
           
        // }
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