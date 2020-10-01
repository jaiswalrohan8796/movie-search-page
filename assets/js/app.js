const loader = document.getElementsByClassName('lds-hourglass');
const movies = document.getElementById('movies');



$(document).ready(() => {
    $('#searchForm').on('submit', (err) => {
        $('#searchText').attr('readonly','readonly');
        let searchText = $('#searchText').val();
        getMovies(searchText);
        loader[0].style.display = "inline-block";
        err.preventDefault();
    });
});

$('#searchText').click(function() {
    $(this).removeAttr('readonly');
    $(this).focus();
})


function getMovies(searchText) {
    axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=334b05ed`)
    .then((response) => {
        let movies = response.data.Search;
        console.log(response)
        let output = '';
        loader[0].style.display = "none";
        if (response.data.Response === "False") {
            console.log(response.data.Response);
        }
        else {
            $.each(movies, (index,movie) => {
                output += `
                <div class="movies-list text-center">
                  <div class="card text-center" style="width:16rem">
                    <img class="card-img-top" src='${movie.Poster}'>
                    <div class="card-body">
                        <h3 class="card-title">${movie.Title}&nbsp;(${movie.Year})</h3>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="https://www.imdb.com/title/${movie.imdbID}">Imdb</a>
                    </div>
                  </div>
                </div>
                `;
            });
        }
        
        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}



