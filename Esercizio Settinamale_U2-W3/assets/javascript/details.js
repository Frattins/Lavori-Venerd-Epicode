document.getElementById("year").textContent = new Date().getFullYear();
const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get('eventId');

const getEventData = function () {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjZlMjgxODQ0MjAwMTUzNzU5N2IiLCJpYXQiOjE3MTUzMzY5MzAsImV4cCI6MTcxNjU0NjUzMH0.lrQCrzMPbqaTeCJCjE0fRXSUoRLgPPbrr6vMBkh56qY"
        }
    })
    .then(response => response.json())
    .then(event => {
        
        document.getElementById('name').innerText = event.name;
        document.getElementById('description').innerText = event.description;
        document.getElementById('brand').innerText = event.brand;
        document.getElementById('photos').innerHTML = `<img src="${event.imageUrl}" class="card-img-top" alt="immagine"></img>`;
        document.getElementById('price').innerText = event.price + '€';

    })
    .catch(err => {
        console.error('Error fetching event details:', err);
    });
};

document.getElementById('edit-button').addEventListener('click', () => {
    window.location.href = `backoffice.html?eventId=${eventId}`;
});

function confirmDelete() {
    var myModal = new bootstrap.Modal(document.getElementById('deleteModal'), {});
    myModal.show();
}

function actuallyDeleteEvent() {
    deleteEvent(); // Esegue la funzione di eliminazione effettiva
}

function deleteEvent() {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjZlMjgxODQ0MjAwMTUzNzU5N2IiLCJpYXQiOjE3MTUzMzY9MzAsImV4cCI6MTcxNjU0NjUzMH0.lrQCrzMPbqaTeCJCjE0fRXSUoRLgPPbrr6vMBkh56qY"
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Evento eliminato con successo.');
            window.location.href = 'index.html';
        } else {
            alert('Errore durante eliminazione del evento.');
        }
    })
    .catch(err => {
        console.error('Error deleting event:', err);
    });
}

getEventData();


document.querySelector('.btn-danger').addEventListener('click', confirmDelete);


  window.onload = function() {
    document.getElementById('loadingSpinner').style.display = 'none';
  };


