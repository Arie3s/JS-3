 // Read the movies data from JSON file
 fetch('data.json')
 .then(function(response){
     return response.json();
 }) 
 .then(function(movies){
     let placeholder = document.getElementById("movies");
     let out = "";
     for (let movie of movies){
        out += `
            <tr>
                <td>${movie.title}</td>
                <td>${movie.genres.toString(", ")}</td>
                <td>${movie.release_date}</td>
                <td>${movie.original_language}</td>
                <td>${movie.vote_average}</td>
            </tr>
        `;
    }    
     placeholder.innerHTML = out;
    });