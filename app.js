// Fetch data from the travel_recommendation_api.json file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const countries = data.countries;
        const temples = data.temples;
        const beaches = data.beaches;

        const recommendationsContainer = document.getElementById('recommendations-container');

        // Function to create recommendation cards
        function createCard(name, imageUrl, description) {
            const card = document.createElement('div');
            card.classList.add('recommendation-card');
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = name;
            card.appendChild(img);
            
            const heading = document.createElement('h3');
            heading.textContent = name;
            card.appendChild(heading);
            
            const para = document.createElement('p');
            para.textContent = description;
            card.appendChild(para);

            return card;
        }

        // Initially hide all recommendations
        recommendationsContainer.style.display = 'none';

        // Function to display countries
        countries.forEach(country => {
            country.cities.forEach(city => {
                const card = createCard(city.name, city.imageUrl, city.description);
                recommendationsContainer.appendChild(card);
            });
        });

        // Function to display temples
        temples.forEach(temple => {
            const card = createCard(temple.name, temple.imageUrl, temple.description);
            recommendationsContainer.appendChild(card);
        });

        // Function to display beaches
        beaches.forEach(beach => {
            const card = createCard(beach.name, beach.imageUrl, beach.description);
            recommendationsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Search recommendations function
function searchRecommendations(event) {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.recommendation-card');

    // Show the recommendations container when the user starts searching
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.style.display = 'grid'; // Display recommendations when search is made

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (name.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Reset the search input and display all recommendations
function resetSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';  // Clear the search input
    searchRecommendations(event);  // Display all cards
}
