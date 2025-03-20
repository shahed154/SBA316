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
// cache elements different ways 
const carsContainer = document.getElementById('cars-container');
const searchInput = document.getElementById('search-bar');
const categorySelect = document.querySelector('#category-select');
const addCarForm = document.getElementById('add-car-form');

document.addEventListener('DOMContentLoaded', () => {
    displayCars(carsForSale);
    
    // apparently i needed to heave the search button inside the domconentloaded or else it wouldnt work sometimes. so weird man
    const searchButton = document.querySelector('.search-section button');
    searchButton.addEventListener('click', filterCars);
//this too
    const form = document.getElementById('add-car-form');
    form.addEventListener('submit', addCarForSale);


// this as well. i  learned ur supposedd to put most of stuff like this on the dom content loaded function 
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errormessage => errormessage.style.display = 'none');
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


    const template = document.getElementById('car-card-template');
// iterating over collection of elements to accomplish task. task being create new cars for sale 
// clone node 
   carsArray.forEach(car => {
        const carCard = template.content.cloneNode(true)
        

// query selectors 
        const carImage = carCard.querySelector('.car-image');
        carImage.style.backgroundImage = `url(${car.imageUrl})`;
            
        const carName = carCard.querySelector('.car-name-display');
        carName.textContent = car.name;

              
        const carType = carCard.querySelector('.car-type-display');
        carType.textContent = `Type: ${car.category}`;
        
            
        const carPrice = carCard.querySelector('.car-price-display');
        carPrice.textContent = `Price: $${car.price}`
        
        const carDescription = carCard.querySelector('.car-description-display');
        carDescription.textContent = car.description;
        
            
        const contactButton = carCard.querySelector('button');
        contactButton.addEventListener('click', () => {
            alert(`Contact us about the ${car.name}!`);
        });
    

            // using appendchild to create new elements 
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

        const matchesDesc = car.description.toLowerCase().includes(searchTerm)
        
        const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
        
        if ((matchesSearch || matchesDesc) && matchesCategory) 
        {
            return true;
        }

        return false;
    });

    displayCars(filteredCars);
}


//event = clicked
function addCarForSale(event)
{
    //am i supposed to do preventDefault() by itself? why does VS Code cross out the event part idk 

    event.preventDefault()

    const carName = document.getElementById('car-name').value
    const carCategory = document.getElementById('car-category').value
    const carPrice = document.getElementById('car-price').value
    const carImageUrl = document.getElementById('car-image-url').value
    const carDescription = document.getElementById('car-description').value
    
    let isValid = true;
// query selector all 
    // Reset error messages before validation
    document.querySelectorAll('.error-message').forEach(errormsg => errormsg.style.display = 'none');

    if (carName.length < 3) {
        ////// USING PARENTNODE - meeting the reqs or else i wouldve done the easy way like i did for the other ones below lol 
        const nameInput = document.getElementById('car-name');
        const parentDiv = nameInput.parentNode;

        const errorMessage = parentDiv.lastElementChild

        errorMessage.style.display = 'block';
        isValid = false;


    }

    if (carPrice <= 0) {
        document.getElementById('price-error').style.display = 'block';
        isValid = false;
    }

    if ((carImageUrl) && !isValidUrl(carImageUrl)) {
        document.getElementById('image-error').style.display = 'block';
        isValid = false;
    }

    if (carDescription.length < 10) {
        document.getElementById('description-error').style.display = 'block';
        isValid = false;
    }


    if (isValid) {
        
        const maxId = carsForSale.reduce((max, car) => (car.id > max ? car.id : max), 0);
        
       
        const newCar = {
            id: maxId + 1, 
            name: carName,
            category: carCategory,
            price: carPrice,
            imageUrl: carImageUrl || "https://via.placeholder.com/300x200?text=No+Image", // Added fallback image
            description: carDescription
        };
        
        carsForSale.push(newCar);
        displayCars(carsForSale);
        
        // Reset the form after successful submission
        document.getElementById('add-car-form').reset();
        
        alert(`Your ${carName} has been added to the store! Good luck!`);
    }
}   
//just fcopied this https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/ 
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}