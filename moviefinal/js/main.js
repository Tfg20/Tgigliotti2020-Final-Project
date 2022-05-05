
$(document).ready(() => {                         // On searh submit runs getmovies function and passes in searchText
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){                   // Function that displays movies
  axios.get('https://imdb-api.com/en/API/SearchMovie/k_wgse19pi/'+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        console.log(movies);                      // html that displays movies after being searched
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.image}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){                       // sets id to movieId to be used in getMovie function
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){                            // function that displays single movie on page
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://imdb-api.com/en/API/Title/k_wgse19pi/'+movieId+'/Ratings')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      console.log(response);                    // html to input into the movie page
      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.image}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.ratings.imDb}</li>
              <br>
              ${movie.plot}
              <br>
              <a href="http://imdb.com/title/${movie.id}" target="_blank" class="btn btn-primary">View IMDB</a>
            </ul>
          </div>
        </div>
      `;


      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function topMovies(){                          // function that displays top movies onto Top 250 page
  axios.get('https://imdb-api.com/en/API/Top250Movies/k_wgse19pi')
  .then((response) => {
    console.log(response);
    let movies = response.data.items;
    let output = '';
    $.each(movies, (top, movie) => {
      console.log(movies);                      // html to display on top250 page
      output += `
      <div class ="center">
          <div class="well text-center">
            <img src="${movie.image}">
            <h5>${movie.title}</h5>
            <h5>Rank: ${movie.rank}</h5>
            <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
      `;
    });
    $('#topmovies').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}

