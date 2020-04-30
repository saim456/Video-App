$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getVideos(searchText){
  axios.get('http://www.omdbapi.com?s='+searchText)
    .then((response) => {
      console.log(response);
      let videos = response.data.Search;
      let output = '';
      $.each(videos, (index, videos) => {
        output += `
          <div class="col-md-3">
            <div class="well text-right">
              <img src="${video.Poster}">
              <h5>${video.Title}</h5>
              <a onclick="videoSelected('${video.imdbID}')" class="btn btn-primary" href="#">Video Details</a>
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

function videoSelected(id){
  sessionStorage.setItem('videoId', id);
  window.location = 'video.html';
  return false;
}

function getVideo(){
  let movieId = sessionStorage.getItem('videoId');

  axios.get('http://www.omdbapi.com?i='+videoId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${video.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${video.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${video.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${video.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${video.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${video.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${video.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${video.Actors}</li>
             <li class="list-group-item"><strong>Actors:</strong> ${video.Released}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${video.Plot}
            <hr>
            <a href="http://imdb.com/title/${video.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#video').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
