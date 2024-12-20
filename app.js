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
        function displayCountries() {
            countries.forEach(country => {
                country.cities.forEach(city => {
                    const card = createCard(city.name, city.imageUrl, city.description);
                    recommendationsContainer.appendChild(card);
                });
            });
        }

        // Function to display temples
        function displayTemples() {
            temples.forEach(temple => {
                const card = createCard(temple.name, temple.imageUrl, temple.description);
                recommendationsContainer.appendChild(card);
            });
        }

        // Function to display beaches
        function displayBeaches() {
            beaches.forEach(beach => {
                const card = createCard(beach.name, beach.imageUrl, beach.description);
                recommendationsContainer.appendChild(card);
            });
        }

        // Function to display all categories
        function displayAll() {
            displayCountries();
            displayTemples();
            displayBeaches();
        }

        // Search recommendations function
        function searchRecommendations(event) {
            event.preventDefault(); // Prevent form submission

            const searchInput = document.getElementById('search-input').value.toLowerCase();
            const cards = document.querySelectorAll('.recommendation-card');

            // Show the recommendations container when the user starts searching
            const recommendationsContainer = document.getElementById('recommendations-container');
            recommendationsContainer.style.display = 'grid'; // Display recommendations when search is made

            // Clear previous recommendations
            recommendationsContainer.innerHTML = '';

            if (searchInput.includes('country') || searchInput.includes('countries')) {
                displayCountries();
            } else if (searchInput.includes('city') || searchInput.includes('cities')) {
                displayCities();
            } else if (searchInput.includes('temple') || searchInput.includes('temples')) {
                displayTemples();
            } else if (searchInput.includes('beach') || searchInput.includes('beaches')) {
                displayBeaches();
            } else {
                displayAll();
            }
        }

        // Reset the search input and display all recommendations
        function resetSearch() {
            const searchInput = document.getElementById('search-input');
            searchInput.value = '';  // Clear the search input
            displayAll();  // Display all cards
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
