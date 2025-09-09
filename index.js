console.log('JavaScript is Connected');

let allPlants = [];

// Load and display categories dynamically
const loadCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
};

const displayCategories = (categories) => {
    const categorySidebar = document.querySelector('.category-sidebar ul');
    categorySidebar.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'text-xl font-semibold hover:bg-[#15803D] hover:text-white cursor-pointer rounded transition-all p-2';
        li.textContent = category.category_name;
        li.id = `category-${category.id}`;
        li.addEventListener('click', () => {
            const filteredPlants = allPlants.filter(plant => plant.category === category.category_name);
            displayTrees(filteredPlants);
        });
        categorySidebar.appendChild(li);
    });
};

loadCategories();


// Load and display cards of all categories trees
const loadAllTrees = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allPlants = data.plants; 
            displayTrees(allPlants);
        });
};

const displayTrees = (plants) => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'card bg-[#FFFFFF] p-4 rounded-lg flex flex-col gap-3 max-w-[350px]';
        card.id = `plant-${plant.id}`;

        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="card-image h-80 w-80 mx-auto rounded-lg">
            <h3 class="card-title text-xl font-bold text-left">${plant.name}</h3>
            <p class="card-description text-gray-600 text-left">${plant.description}</p>
            <div class="card-info flex items-center justify-between">
                <h3 class="card-category text-lg font-semibold bg-[#DCFCE7] rounded-[20px] p-2">${plant.category}</h3>
                <h3 class="card-price text-lg font-bold">৳${plant.price}</h3>
            </div>
            <button class="card-button btn btn-accent w-full bg-[#15803D] p-3 rounded-[25px] text-xl text-white">Add to Cart</button>
        `;
        cardContainer.appendChild(card);
    });
};

loadAllTrees();
