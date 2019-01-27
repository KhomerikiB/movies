const API_KEY = "8519dceaef457276d4a6d06292b5d993";
const searchForm = document.querySelector("#search-form");
const itemsContainer = document.querySelector(".films-container");
// http://image.tmdb.org/t/p/w200/h9w2Bdbv4LadXsXFdKvOA4C6cx4.jpg
const getData = async name => {
  const fetchData = await fetch(
    `https://api.themoviedb.org/3/search/movie?&query=${name}&include_adult=false&api_key=8519dceaef457276d4a6d06292b5d993&language=en-US`
  );
  return await fetchData.json();
};
const findMovieInDatabase = name => {
  getData(name.toLowerCase()).then(response => outputDOM(response));
};

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const inputValue = e.target.search.value;
  findMovieInDatabase(inputValue);
});
const outputDOM = response => {
  const data = response.results;
  let output = "";
  data.forEach(item => {
    output += `
                <div class="item">
                <div class="image-box">
                    <img src="http://image.tmdb.org/t/p/w200/${
                      item.poster_path
                    }" alt="${item.title}">
                </div>
                <div class="film-title">${item.title}</div>
                <div class="film-year">(${item.release_date})</div>
                <div class="button-flex">
                    <button id="detail-btn" onclick="showDetails(${
                      item.id
                    })">Movie Details</button>
                    <button id="imdb-btn" onclick="showIMDB(${
                      item.id
                    })">View <span style="font-weight:bold;">IMDB</span></button>
                </div> 
                </div>
  `;
  });
  if (output === "") {
    output = "<div style='color:#fff;font-size:2.5rem;'>Movie Not Found</div>";
  }
  itemsContainer.innerHTML = output;
};
//http://image.tmdb.org/t/p/w185/9wbXqcx6rHhoZ9Esp03C7amQzom.jpg find iamge
// https://api.themoviedb.org/3/movie/ FILM ID& api_key=8519dceaef457276d4a6d06292b5d993&language=en-US
const getDataById = async id => {
  const fetchData = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await fetchData.json();
};
const showIMDB = async id => {
  getDataById(id).then(data => {
    const IMDB_KEY = data.imdb_id;
    window.open(
      `https://www.imdb.com/title/${IMDB_KEY}`,
      "_blank" // <- This is what makes it open in a new window.
    );
  });
};

const showDetails = id => {
  sessionStorage.setItem("movieId", id);
  window.location = "details.html";
};
const movieDetails = () => {
  console.log("movie dertails");
};

//  First page ___ POPULAR MOVIES
const firstPageDOM = async () => {
  const fetchData = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await fetchData.json();
  const items = data.results;
  let output = "";
  items.forEach(item => {
    output += `
    <div class="item">
    <div class="image-box">
        <img src="http://image.tmdb.org/t/p/w200/${item.poster_path}" alt="${
      item.title
    }">
    </div>
    <div class="film-title">${item.title}</div>
    <div class="film-year">(${item.release_date})</div>
    <div class="button-flex">
        <button id="detail-btn" onclick="showDetails(${
          item.id
        })">Movie Details</button>
        <button id="imdb-btn" onclick="showIMDB(${
          item.id
        })">View <span style="font-weight:bold;">IMDB</span></button>
    </div> 
    </div>
    `;
  });
  itemsContainer.innerHTML = output;
};
firstPageDOM();

//  SELECTOR SEARCH
const selector = document.querySelector("#select");
selector.addEventListener("change", function(e) {
  const value = e.target.value;
  if (value) {
    const result = filmsByDate(value);
    result.then(data => {
      let output = "";
      data.results.forEach(item => {
        output += `
        <div class="item">
        <div class="image-box">
            <img src="http://image.tmdb.org/t/p/w200/${
              item.poster_path
            }" alt="${item.title}">
        </div>
        <div class="film-title">${item.title}</div>
        <div class="film-year">(${item.release_date})</div>
        <div class="button-flex">
            <button id="detail-btn" onclick="showDetails(${
              item.id
            })">Movie Details</button>
            <button id="imdb-btn" onclick="showIMDB(${
              item.id
            })">View <span style="font-weight:bold;">IMDB</span></button>
        </div> 
        </div>
        `;
      });
      itemsContainer.innerHTML = output;
    });
  }
});

const filmsByDate = async year => {
  const fetchData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}
  `);
  const data = await fetchData.json();
  return data;
};
