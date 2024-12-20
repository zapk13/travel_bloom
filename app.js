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

        // Function to display countries and their cities
        countries.forEach(country => {
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

        // Add CSS for scrollable container
        recommendationsContainer.style.maxHeight = 'calc(100vh - 300px)'; // Adjust based on your needs
        recommendationsContainer.style.overflowY = 'auto';
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
            const name = card.querySelector('h3').textContent.toLowerCase();
            
            // Strict category matching
            if (searchInput === 'countries' || searchInput === 'country') {
                card.style.display = category === 'city' ? '' : 'none';
            } else if (searchInput === 'cities' || searchInput === 'city') {
                card.style.display = category === 'city' ? '' : 'none';
            } else if (searchInput === 'temples' || searchInput === 'temple') {
                card.style.display = category === 'temple' ? '' : 'none';
            } else if (searchInput === 'beaches' || searchInput === 'beach') {
                card.style.display = category === 'beach' ? '' : 'none';
            } else {
                // For specific location searches, only match the name exactly
                card.style.display = name.includes(searchInput) ? '' : 'none';
            }
        });
    } else {
        recommendationsContainer.style.display = 'none';
    }
}

// Reset function
function resetSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.style.display = 'none';

    const cards = document.querySelectorAll('.recommendation-card');
    cards.forEach(card => {
        card.style.display = '';
    });
}
