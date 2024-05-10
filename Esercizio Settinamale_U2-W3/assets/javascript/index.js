document.getElementById("year").textContent = new Date().getFullYear();
const generateproductCards = function (productsArray) {
    const row = document.getElementById('events-row');
    productsArray.forEach((product) => {
        const newCol = document.createElement('div');
        newCol.classList.add('col');
        newCol.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <img src="${product.imageUrl}" class="card-img-top h-50" alt="${product.name}">
            <div class="card-body d-flex flex-column justify-content-around m-0 ">
                <h5 class="card-title m-0">${product.name}</h5>
                <p class="card-text m-0">${product.brand}</p>
                <p class="card-text m-0">${product.description}</p>
                <div class="d-flex justify-content-between m-0">
                    <button class="btn bg-info d-inline rounded-2 p-2" id="price" data-name="${product.name}" data-price="${product.price}€">${product.price}€</button>
                    <a href="details.html?eventId=${product._id}" class="btn btn-warning align-center">INFO</a>
                </div>
            </div>
        </div>
    `;
        row.appendChild(newCol);
    });
};

const getEvents = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjZlMjgxODQ0MjAwMTUzNzU5N2IiLCJpYXQiOjE3MTUzMzY5MzAsImV4cCI6MTcxNjU0NjUzMH0.lrQCrzMPbqaTeCJCjE0fRXSUoRLgPPbrr6vMBkh56qY"
        }
    })
    .then(response => response.json())
    .then(products => {
        generateproductCards(products);
    })
    .catch(err => {
        console.error('Error fetching events:', err);
    });
};

getEvents();

const cartItems = [];

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'price') {
        const productName = e.target.dataset.name;
        const productPrice = e.target.innerText;
        addProductToCart(productName, productPrice);
        updateCartDropdown();
    }
});

function addProductToCart(name, price) {
    cartItems.push({ name, price });
}

function updateCartDropdown() {
    const dropdown = document.querySelector('.dropdown-menu');
    dropdown.innerHTML = ''; // Pulisci il menu attuale
    cartItems.forEach((item, index) => {
        dropdown.innerHTML += `
            <li class="text-light">
                ${item.name} - ${item.price}
                <button class ="btn bg-danger p-1 px-2" onclick="removeItemFromCart(${index})">x</button>
            </li>
        `;
    });
    updateCartIndicator();
}

function updateCartIndicator() {
    const indicator = document.getElementById('cartIndicator');
    if (cartItems.length > 0) {
        indicator.style.display = 'block'; // Mostra l'indicatore
    } else {
        indicator.style.display = 'none'; // Nascondi l'indicatore
    }
}

function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDropdown();
    updateCartIndicator();
}


  window.onload = function() {
    document.getElementById('loadingSpinner').style.display = 'none';
  };

