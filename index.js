console.log('JavaScript is Connected');

let allPlants = [];

// Show spinner utility
function showSpinner(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
        container.innerHTML = `
            <div class="flex justify-center items-center w-full h-40">
                <span class="loading loading-dots loading-lg text-[#15803D]"></span>
            </div>
        `;
    }
}

// Hide spinner utility (just clears container, actual data will replace it)
function hideSpinner(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
        container.innerHTML = '';
    }
}

// Update loadCategories to show spinner
const loadCategories = () => {
    showSpinner('.category-sidebar ul');
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
};

const displayCategories = (categories) => {
    hideSpinner('.category-sidebar ul');
    const categorySidebar = document.querySelector('.category-sidebar ul');
    categorySidebar.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'text-xl font-semibold hover:bg-[#15803D] hover:text-white cursor-pointer rounded transition-all p-2';
        li.textContent = category.category_name;
        li.id = `category-${category.id}`;
        li.addEventListener('click', () => {
            
            categorySidebar.querySelectorAll('li').forEach(item => {
                item.classList.remove('bg-[#15803D]', 'text-white');
            });

            li.classList.add('bg-[#15803D]', 'text-white');

            const filteredPlants = allPlants.filter(plant => plant.category === category.category_name);
            displayTrees(filteredPlants);
        });
        categorySidebar.appendChild(li);
    });
};

loadCategories();


// Update loadAllTrees to show spinner
const loadAllTrees = () => {
    showSpinner('.card-container');
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allPlants = data.plants; 
            displayTrees(allPlants);
        });
};

let cart = []; 

const displayTrees = (plants) => {
    hideSpinner('.card-container');
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'card bg-[#FFFFFF] p-4 rounded-lg flex flex-col gap-3 max-w-[350px] cursor-pointer';
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

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-button')) {
                showPlantModal(plant);
            }
        });
        
        card.querySelector('.card-button').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(plant);
        });
        cardContainer.appendChild(card);
    });
};
loadAllTrees();


// Show modal function
function showPlantModal(plant) {
    const modal = document.getElementById('plant-modal');
    document.getElementById('modal-image').src = plant.image;
    document.getElementById('modal-title').textContent = plant.name;
    document.getElementById('modal-description').textContent = plant.description;
    document.getElementById('modal-category').textContent = plant.category;
    document.getElementById('modal-price').textContent = `৳${plant.price}`;
    modal.classList.remove('hidden');
}

// Close modal event
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('plant-modal');
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
});

// Add to cart function
function addToCart(plant) {
    const existing = cart.find(item => item.id === plant.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: plant.id, name: plant.name, price: plant.price, quantity: 1 });
    }
    updateCartSidebar();
}

// Update cart sidebar
function updateCartSidebar() {
    const cartSidebar = document.querySelector('.cart-list-sidebar');

    cartSidebar.querySelectorAll('.cart-item').forEach(item => item.remove());
    const oldTotal = cartSidebar.querySelector('.total-price');
    if (oldTotal) oldTotal.remove();

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item flex items-center justify-between gap-3 p-3 bg-[#DCFCE7] rounded-lg mt-5';
        div.innerHTML = `
            <div>
                <p class="text-xl text-gray-600 font-semibold">${item.name}</p>
                <div class="flex items-center gap-1">
                    <p class="price text-gray-600">৳${item.price}</p>
                    <p class="text-gray-600">x</p>
                    <p class="units text-gray-600">${item.quantity}</p>
                </div>
            </div>
            <div class="cross cursor-pointer"><i class="fa-solid fa-xmark"></i></div>
        `;

        div.querySelector('.cross').addEventListener('click', () => {
            cart = cart.filter(c => c.id !== item.id);
            updateCartSidebar();
        });
        cartSidebar.appendChild(div);
    });

    if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalDiv = document.createElement('div');
        totalDiv.className = 'total-price flex items-center justify-between mt-10 p-3 border-t-2 border-gray-300';
        totalDiv.innerHTML = `
            <h3 class="text-gray-600 font-semibold">Total Price</h3>
            <h3 class="text-gray-600 font-semibold">৳${total}</h3>
        `;
        cartSidebar.appendChild(totalDiv);
    }
}


