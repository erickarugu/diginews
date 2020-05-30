const API_KEY = '53fa327fbc7a46759bf0d84dd4da127e';
const main = document.querySelector('main');
const categorySelector = document.getElementById('category-selector');
const defaultSource =  'techcrunch';

window.addEventListener('load', async (e) => {
    updateNews();
    await updateSources();
    categorySelector.value = defaultSource;

    categorySelector.addEventListener('change', e=>{
        updateNews(e.target.value);
    })

    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('sw.js');
            console.log('sw registered');
        }catch(error){
            console.log('sw registration falied')
        }
    }
})
async function updateSources(){
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`);
    const data = await res.json();
    categorySelector.innerHTML = data.sources.map(src => {
        return `<option value="${src.id}">${src.name}</option>`
    }).join('\n')
}

async function updateNews(source = defaultSource){
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`);
    const data = await res.json();

    main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="">
            <p>${article.description}</p>
        </a>
    </div>
    `;
}

