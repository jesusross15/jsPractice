const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update selected count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    
    // Creating an array of indexes so that way I can save this info to local storage
    // Copy selected seats into an array with spread operator
    // Map through that array
    // Return a new array of indexes

    const seatIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;
;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    // Seat UI
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    // Seat and Price UI
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
};

// Movie selection event listener
movieSelect.addEventListener("change", function(e) {
    ticketPrice = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


// Seat selection event listener
container.addEventListener("click", e => {
    if (
        e.target.classList.contains("seat") && 
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        
        updateSelectedCount();
    }    
});

// Initial count and total set
updateSelectedCount();