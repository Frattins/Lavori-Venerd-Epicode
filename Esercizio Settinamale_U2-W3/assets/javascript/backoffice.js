document.getElementById("year").textContent = new Date().getFullYear();

class Product {
    constructor(name, brand, description, imageUrl, price) {
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = parseFloat(price);
    }
}

console.log("Definizione classe Product", Product);

const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get('eventId');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('event-form');
    if (eventId) {
        fetchEventDetails(eventId); 
        form.addEventListener('submit', e => submitEvent(e, 'PUT')); 
    } else {
        form.addEventListener('submit', e => submitEvent(e, 'POST')); 
    }
});

function fetchEventDetails(eventId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjZlMjgxODQ0MjAwMTUzNzU5N2IiLCJpYXQiOjE3MTUzMzY5MzAsImV4cCI6MTcxNjU0NjUzMH0.lrQCrzMPbqaTeCJCjE0fRXSUoRLgPPbrr6vMBkh56qY"
        }
    })
    .then(response => response.json())
    .then(event => {
        document.getElementById('name').value = event.name;
        document.getElementById('description').value = event.description;
        document.getElementById('price').value = event.price;
        document.getElementById('brand').value = event.brand;
    })
    .catch(err => console.error('Failed to fetch event details:', err));
}

function submitEvent(e, method) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const price = document.getElementById('price').value;
    const product = new Product(name, brand, description, imageUrl, price);

    const url = eventId ? `https://striveschool-api.herokuapp.com/api/product/${eventId}` : 'https://striveschool-api.herokuapp.com/api/product/';

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjZlMjgxODQ0MjAwMTUzNzU5N2IiLCJpYXQiOjE3MTUzMzY5MzAsImV4cCI6MTcxNjU0NjUzMH0.lrQCrzMPbqaTeCJCjE0fRXSUoRLgPPbrr6vMBkh56qY"
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to save the product');
        return response.json();
    })
    .then(() => {
        alert(`Product ${eventId ? 'updated' : 'created'} successfully!`);
        window.location.href = 'index.html'; 
    })
    .catch(err => {
        console.error('Error:', err);
        alert(`Error: ${err.message}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('event-form');
    document.getElementById('edit-button').addEventListener('click', () => {
        window.location.href = `backoffice.html?eventId=${eventId}`;
    });
});


/************ MODAL PER RICHIESTA CONFERMA PRIA DEL RESET************ */
function confirmReset() {
    var myModal = new bootstrap.Modal(document.getElementById('resetModal'), {});
    myModal.show();
}

function actuallyResetForm() {
    document.getElementById('event-form').reset();
    var myModal = bootstrap.Modal.getInstance(document.getElementById('resetModal'));
    myModal.hide();
}
