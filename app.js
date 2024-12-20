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
            // Add country as a category
            const countryCard = createCard(country.name, country.cities[0].imageUrl, `Explore cities in ${country.name}`);
            countryCard.setAttribute('data-category', 'country');
            recommendationsContainer.appendChild(countryCard);

            // Add each city
            country.cities.forEach(city => {
                const card = createCard(city.name, city.imageUrl, city.description);
                card.setAttribute('data-category', 'city');
                card.setAttribute('data-country', country.name);
                recommendationsContainer.appendChild(card);
            });
        });

        // Function to display temples
        temples.forEach(temple => {
            const card = createCard(temple.name, temple.imageUrl, temple.description);
            card.setAttribute('data-category', 'temple');
            recommendationsContainer.appendChild(card);
        });

        // Function to display beaches
        beaches.forEach(beach => {
            const card = createCard(beach.name, beach.imageUrl, beach.description);
            card.setAttribute('data-category', 'beach');
            recommendationsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Search recommendations function
function searchRecommendations(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.toLowerCase().trim();
    const recommendationsContainer = document.getElementById('recommendations-container');
    const cards = document.querySelectorAll('.recommendation-card');

    if (searchInput !== '') {
        recommendationsContainer.style.display = 'grid';
        
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const country = card.getAttribute('data-country');
            const name = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            // Check for category matches
            const isCategoryMatch = 
                (searchInput === 'country' && category === 'country') ||
                (searchInput === 'countries' && category === 'country') ||
                (searchInput === 'city' && category === 'city') ||
                (searchInput === 'cities' && category === 'city') ||
                (searchInput === 'temple' && category === 'temple') ||
                (searchInput === 'temples' && category === 'temple') ||
                (searchInput === 'beach' && category === 'beach') ||
                (searchInput === 'beaches' && category === 'beach');

            // Check for specific location or text matches
            const isTextMatch = 
                name.includes(searchInput) || 
                description.includes(searchInput) ||
                (country && country.toLowerCase().includes(searchInput));

            if (isCategoryMatch || isTextMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    } else {
        recommendationsContainer.style.display = 'none';
    }
}

// Reset function
function resetSearch() {
    // Clear the search input
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    // Hide the recommendations container
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.style.display = 'none';

    // Reset the display property of all cards
    const cards = document.querySelectorAll('.recommendation-card');
    cards.forEach(card => {
        card.style.display = '';
    });
}
