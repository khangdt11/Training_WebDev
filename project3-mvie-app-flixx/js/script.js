const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
  },
  api: {
    api_key: '73bacc4b4f9d4968dc371cfe56b13e78',
    api_url: 'https://api.themoviedb.org/3/',

  }
};


// hightlight current page
function highlightMenu() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

//Display popular movie card in home page
async function displayPopularMovieCards () {
  const {results} = await getDataFromAPI('movie/popular');  // <=> results.results = await getDataFromAPI('movie/popular').results

  results.forEach((card) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.innerHTML = `
       <a href="movie-details.html?id=${card.id}">
            <img
              src="https://image.tmdb.org/t/p/w500${card.poster_path}"
              class="card-img-top"
              alt="${card.title}"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${card.release_date}</small>
            </p>
          </div>
    `;
    document.getElementById('popular-movies').appendChild(cardContainer);
  });

}
//Display popular TV shows in Shows page
async function displayPopularShowsCards() {
  const {results} = await getDataFromAPI('tv/popular');

  results.forEach((show) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.innerHTML = `
       <a href="tv-details.html?id=${show.id}">
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    document.getElementById('popular-shows').appendChild(cardContainer);
  });
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Display movie detail
async function displayMovieDetail() {
  const movieId = window.location.search.split('=')[1];
  const movie = await getDataFromAPI(`movie/${movieId}`);

  // Overlay bg image
  const movieDetailContainer = document.createElement('div');
  movieDetailContainer.id = 'movie-details';
  
  movieDetailContainer.innerHTML = `
  <div class="details-top">
    <div>
      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />
    </div>
      <div>
      <h2>${movie.title}</h2>
      <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>${movie.overview}</p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
      </div>
      <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
  </div> 
  `;

  document.querySelector('section.container').appendChild(movieDetailContainer);
  displayBackgroundImage('movie', movie.backdrop_path);
};

async function displayTVShowDetail() {
  const showId = window.location.search.split('=')[1];

  const show = await getDataFromAPI(`tv/${showId}`)
  console.log(show);

  const showContainer = document.createElement('div');
  showContainer.id = 'show-details';

  showContainer.innerHTML = `
    <div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${show.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${show.release_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name} 
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>
  `;

    document.querySelector('section.container').appendChild(showContainer);
    displayBackgroundImage('show', show.backdrop_path);
};

function displayBackgroundImage(type, backdrop_path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

async function getDataFromAPI (endpoint) {
  const URL_BASE = global.api.api_url;
  const API_KEY = global.api.api_key;

  showSpinner();

  const res = await fetch(`${URL_BASE}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await res.json();

  hideSpinner();

  return data;
};

function showSpinner () {
  document.querySelector('.spinner').classList.add('show');
};

function hideSpinner () {
  document.querySelector('.spinner').classList.remove('show');
};

// Display slider movie
async function displaySlider() {
  const {results} = await getDataFromAPI('movie/now_playing');
  console.log(results);

  results.forEach((slider) => {
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-slide');
    swiperWrapper.innerHTML = `
              <a href="movie-details.html?id=${slider.id}">
                <img src="https://image.tmdb.org/t/p/w500${slider.poster_path}" alt="${slider.title}" />
              </a>
              <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${slider.vote_average} / 10
              </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(swiperWrapper);
    initSwipper();
  });
}

function initSwipper () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }

  })
}

function showAlert (messasge, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(messasge));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);

}

async function searchAPIData() {
  const URL_BASE = global.api.api_url;
  const API_KEY = global.api.api_key;

  showSpinner();

  const res = await fetch(`${URL_BASE}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);

  const data = await res.json();

  hideSpinner();

  return data;
}

async function search() {
  const queryString = window.location.search;

  const URLParams = new URLSearchParams(queryString);
  global.search.type = URLParams.get('type');
  global.search.term =  URLParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const {results, total_pages, page } = await searchAPIData();
    if (results.length === 0) {
      showAlert('No results found');
      return;
    } else {
      console.log(results);
      displaySearchResults(results);
      document.querySelector('#search-term').value = '';
    }
  } else {
    showAlert('please enter the query');
    
  }
};

function displaySearchResults(results) {
  results.forEach((result) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${result.id}">
            <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>`;
    document.querySelector('#search-results').appendChild(div)
  });
}

search()


// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      // Home
      // Display 20 popular
      displaySlider();
      displayPopularMovieCards();
      console.log("Home");
      break;
    case "/shows.html":
      displayPopularShowsCards()
      console.log("Shows");
      break;
    case "/movie-details.html":
      displayMovieDetail()
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      displayTVShowDetail()
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightMenu();
}
window.addEventListener('DOMCotentLoaded', init());