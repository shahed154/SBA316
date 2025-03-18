const carsForSale = [
    {
        id: 1,
        name: "Dukes Mayo",
        category: "sedan",
        price: 999999,
        imageUrl: "https://dukesmayo.com/cdn/shop/products/Dukes_Mayo_30oz_Jar_F.png?v=1734449876",
        description: "its tishanas favorite mayonaise"
    },
    {
        id: 2,
        name: "BMW i5",
        category: "sedan",
        price: 69999,
        imageUrl: "https://images.pexels.com/photos/20200900/pexels-photo-20200900/free-photo-of-blue-bmw-i5.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "All electric luxury bmw sedan."
    },
    {
        id: 3,
        name: "Ferrari 812",
        category: "sports",
        price: 499999,
        imageUrl: "https://images.pexels.com/photos/17855577/pexels-photo-17855577/free-photo-of-ferrari-812-gts.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "The Ferrari 812 Superfast (Type F152M) is a front mid-engine, rear-wheel-drive grand tourer produced by the Italian sports car manufacturer Ferrari "
    },
    {
        id: 4,
        name: "Super spongebob boat mobile",
        category: "sports",
        price: 100000,
        imageUrl: "https://i.pinimg.com/564x/83/a4/1c/83a41c9166c81833160b51c82b5cf14b.jpg",
        description: "Boatmobile driven by the sponge himself"
    },
    {
        id: 5,
        name: "Krabby Patty luxury sports vehicle",
        category: "sports",
        price: 2000000,
        imageUrl: "https://i.redd.it/n5vchraxh5j91.jpg",
        description: "made from authentic krabby patties"
    }
];

const carsContainer = document.getElementById('cars-container');
const searchInput = document.getElementById('search-bar');
const categorySelect = document.querySelector('#category-select');
const addCarForm = document.getElementById('add-car-form');

document.addEventListener('DOMContentLoaded', () => {
    displayCars(carsForSale);
    
    // apparently i needed to heave the search button inside the domconentloaded or else it wouldnt work sometimes. so weird man
    const searchButton = document.querySelector('.search-section button');
    searchButton.addEventListener('click', filterCars);
});

function displayCars(carsArray) {
  
    carsContainer.innerHTML = ''



    if (carsArray.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'NO CARS FOUND!';
        noResultsMessage.style.margin = '20px';
        carsContainer.appendChild(noResultsMessage);
        return;
    }


    carsArray.forEach(car => {
    
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        

        const carImage = document.createElement('div');
        carImage.className = 'car-image';
        carImage.style.backgroundImage = `url(${car.imageUrl})`;
        
      
        const carName = document.createElement('h3');
        carName.id = 'car-name';
        carName.textContent = car.name;
        
        const carType = document.createElement('div');
        carType.id = 'car-type';
        carType.textContent = `Type: ${car.category}`;
        
 
        const carPrice = document.createElement('div');
        carPrice.id = 'car-price';
        carPrice.textContent = `Price: $${car.price}`;
        

        const carDescription = document.createElement('p');
        carDescription.id = 'car-description';
        carDescription.textContent = car.description;
        
   
        const contactButton = document.createElement('button');
        contactButton.textContent = 'Contact for Info';
        contactButton.addEventListener('click', () => {
            alert(`Contact us about the ${car.name}!`);
        });
        
    
        carCard.appendChild(carImage);
        carCard.appendChild(carName);
        carCard.appendChild(carType);
        carCard.appendChild(carPrice);
        carCard.appendChild(carDescription);
        carCard.appendChild(contactButton);
        
        
        carsContainer.appendChild(carCard);
    });
}

function filterCars() {

    
    const searchInput = document.getElementById('search-bar');


    const searchTerm = searchInput.value.toLowerCase();

    const selectedCategory = categorySelect.value;
    
  
   // runs without errors. checks to see if people search using letters and numbers only  no special characters. 
   // also checks if we put enough charcters  to search for stuff . i put 2 for now
   // so for example u can search for the bmw i5 i  have just by writing i5
    
    if (!/^[a-zA-Z\s0-9]*$/.test(searchInput.value)) {
   
        window.alert("Error:  use only letters to search ");
        return; 
    }

    if ((searchInput.value).length < 2) {
   
        window.alert("Error:  put more than 2 characters to search ");
        return; 
    }


    const filteredCars = carsForSale.filter(car => {
      
        const matchesSearch = car.name.toLowerCase().includes(searchTerm);
        
        const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
        
        if (matchesSearch && matchesCategory) 
        {
            return true;
        }

        return false;
    });

    displayCars(filteredCars);
}