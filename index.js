import reddit from './redditapi';



const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
// Form Events
searchForm.addEventListener('submit', e => {
    // Get search term

    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // limit
    const searchLimit = document.getElementById('limit').value;
    
    // check input
    if(searchTerm === ''){
        // Show message
        showMessage('Please Add A Search Term', 'alert-danger');


    }

    // Clear up

    searchInput.value = '';

    // search reddit 

    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        let output = '<div class="card-columns">';

        results.forEach(post => {
            // image check

            let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
        output += `
        <div class="card" >
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target = "_blank" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
          <span class="badge badge-dark">Score ${post.score}</span>
        </div>
      </div>
        `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault()
});


// show messsage

function showMessage(message, className) {
    // create div
    const div = document.createElement('div');
    
    div.className =  `alert ${className}`;
    // Add text

    div.appendChild(document.createTextNode(message));
    // Parent container 
    const searchContainer = document.getElementById('search-container');

    // Get seahrch

    const seahrch = document.getElementById('search');

    // insert

    searchContainer.insertBefore(div, search);

    // Go away 
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function truncateText(text, limit){
    const shortend = text.indexOf(' ' , limit);
if (shortend == -1) return text;
return text.substring(0, shortend);

}