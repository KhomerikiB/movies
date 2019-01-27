const API_KEY = "8519dceaef457276d4a6d06292b5d993";
const detailsContainer = document.querySelector(".details-container");
const movieDetails = async () => {
  const id = sessionStorage.getItem("movieId");
  const fetchData = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  const data = await fetchData.json();
  let template = "";
  console.log(data);
  template += `
                    <div class="details-image">
                    <img src="http://image.tmdb.org/t/p/w200/${
                      data.poster_path
                    }">
                </div>
                <div class="details-description">
                    <h1 class="details-description-title">${data.title}</h1>
                    <div class="details-description-body">
                        <p><span>Genre: </span>${data.genres.map(
                          item => item.name
                        )}</p>
                        <p><span>Released: </span>${data.release_date}</p>
                        <p><span>IMDB Rating: </span>${data.vote_average}</p>
                        <p><span>Runtime: </span>${data.runtime} </p>
                        <p style="display:flex;"><span style="margin-right: 0.3rem">Description: </span>${
                          data.overview
                        }</p>
                        <a href="/moviesapp" class="goback-btn">Go Back</a>
                    </div>
                </div>
                `;
  detailsContainer.innerHTML = template;
};

movieDetails();
