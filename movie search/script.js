const Apilink = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2617c75b6500985b722b1af6aa97c0&page=1';
const imglink = "https://image.tmdb.org/t/p/w1280";
const searchlink = "https://api.themoviedb.org/3/search/movie?&api_key=aa2617c75b6500985b722b1af6aa97c0&query=" ;
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
returnMovies(Apilink);
function returnMovies(url) {
    fetch(url).then(res => res.json())
        .then(function (data) {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');
                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const image = document.createElement("img");
                image.setAttribute("id", 'image')
                
                image.setAttribute('class', 'thumbnail');
                const title = document.createElement("h3");
                title.setAttribute("id", 'title')

                const center = document.createElement("center");

                title.innerHTML = `${element.title}`
                image.src = imglink+element.poster_path;
                center.appendChild(image);
                div_card.appendChild(image)
                div_card.appendChild(title)
                div_column.appendChild(div_card)
                div_row.appendChild(div_column);
                main.appendChild(div_row);
            });

        });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = ""//remove all the initial movie that are initialy there
    const SearchItem = search.value;
    if (!SearchItem) {
        alert("Please enter a value")
    } else {
        returnMovies(searchlink + SearchItem);
        search.value = '';
    }


});

