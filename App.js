// Read the movies data from JSON file
fetch('data.json')
.then(function(response){
    return response.json();
}) 
.then(function(movies){
    let placeholder = document.getElementById("movies");
    let out = `
        <thead>
            <tr>
                <th>Rank</th>
                <th></th>
                <th>Title</th>
                <th>Synopsis</th>
                <th>Year</th>
                <th>Language</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>
    `;
    var i=1;
    for (let movie of movies){
        out += `
            <tr>
                <td>${i}</td>
                <td ><img class="px-2 inline-block" src="${'https://image.tmdb.org/t/p/w45' + movie.poster_path}" />
                <td class="px-6 py-3 text-left">${movie.title}<br><span style="color: #888888;  font-size: 0.8rem">${movie.genres.toString(", ")} . ${movie.runtime} min</span></td>
                <td class="px-6 py-3 text-left" style="font-size: 0.9rem;">${movie.overview}</td>
                <td>${movie.release_date.substring(0,4)}</td>
                <td>${movie.original_language}</td>
                <td>${movie.vote_average}</td>
            </tr>
        `;
        i++;
    }
    
    out += `</tbody>`;
    placeholder.innerHTML = out;

    // Add event listener to form submit button
    document.getElementById("filter").addEventListener("click", function(event){
        event.preventDefault();
        filter();
    });

    // Filter movies based on selected options and update table
    function filter() {
        let genre = document.getElementById("genre").value.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        let year = document.getElementById("year").value;
        let language = document.getElementById("language").value.toLowerCase();
        let rating = document.getElementById("rating").value;

        let filteredMovies = movies.filter(movie => 
            (genre === "" || movie.genres.includes(genre)) && 
            (year === "" || movie.release_date.substring(0,4) === year) && 
            (language === "" || movie.original_language.toLowerCase() === language) && 
            (rating === "" || movie.vote_average >= rating)
        );

        // Clear table
        placeholder.innerHTML = "";

        // Populate table with filtered movies
        out = `
            <thead>
                <tr>
                    <th>Rank</th>
                    <th></th>
                    <th>Title</th>
                    <th>Synopsis</th>
                    <th>Year</th>
                    <th>Language</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        i=1;    

        for (let movie of filteredMovies){
            out += `
                <tr>
                    <td>${i}</td>
                    <td><img class="px-2 inline-block" src="${'https://image.tmdb.org/t/p/w45' + movie.poster_path}" />
                    <td class="px-6 py-3 text-left">${movie.title}<br><span style="color: #888888;  font-size: 0.8rem">${movie.genres.toString(", ")} . ${movie.runtime} min</span></td>
                    <td class="px-6 py-3 text-left" style="font-size: 0.9rem;">${movie.overview}</td>
                    <td>${movie.release_date.substring(0,4)}</td>
                    <td>${movie.original_language}</td>
                    <td>${movie.vote_average}</td>
                </tr>
            `;
            i++;
        }
        
        out += `</tbody>`;
        placeholder.innerHTML = out;
    }
});
