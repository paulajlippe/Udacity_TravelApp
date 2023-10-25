// GLOBAL VARIABLES
let image = document.getElementById('image');
let cityClasses = document.getElementsByClassName('city');
let countryClasses =document.getElementsByClassName('country');
let plannerClass = document.getElementsByClassName('travel-planner');
let departureDate = document.getElementById('departure');
let daysUntilTrip = document.getElementById('days');
let highTemp = document.getElementById('highTemp');
let lowTemp = document.getElementById('lowTemp');
let formPlan = document.getElementById('create-plan');
let planResults = document.getElementById("plannerResults");
let weatherCondition = document.getElementById('weatherCondition');

async function handleSubmit(event) {
    event.preventDefault()

// INPUT DATA
    let formPlace = document.getElementById('loc-input').value;
    console.log("The destination is",formPlace);
    let formStart = document.getElementById('startDate').value;
    console.log("Departure date: ",formStart);
    let formReturn = document.getElementById('returnDate').value;
    console.log("Return date: ",formReturn);

// DATE
    const today = new Date();
    const startDate = new Date(formStart);
    const endDate = new Date(formReturn);

    const tripTime = Math.abs(endDate - startDate);
    const tripDays = Math.ceil(tripTime / (1000 * 60 * 60 * 24));
    console.log(tripDays + " trip days")

    const toTripTime = Math.abs(startDate - today);
    const toTripDays = Math.ceil(toTripTime / (1000 * 60 * 60 * 24));
    console.log(toTripDays + " days to depart");   

// FETCH
    await fetch('http://localhost:3000/trip',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Orign": "*",
        },
        body: JSON.stringify({
            Location: formPlace,
            StartDate: startDate,
            EndDate: endDate,
            Duration: tripDays,
            UntilTrip: toTripDays
        })
    });

    let res = await fetch('http://localhost:3000/geo',{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Orign": "*",
        }
    });
        res = await fetch('http://localhost:3000/weather',{
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Orign": "*",
            }
        })
        res = await fetch('http://localhost:3000/pixabay',{
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Orign": "*",
            }
        })
        res = await fetch('http://localhost:3000/all',{
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Orign": "*",
            }
    })
 
    const dataPlanner = await res.json();
    updateUI(dataPlanner);
}

// UPDATE UI
function updateUI(result){
    // Results after successful submission 
    console.log('Results: ', result)

    plannerResults.style.display = 'block';
    plannerClass[0].style.display = 'none';
 
    for (var i=0; i < cityClasses.length && i <countryClasses.length ; i++){
        cityClasses[i].innerHTML = result.city;
        countryClasses[i].innerHTML = result.country;
    }   
        image.setAttribute('src', result.image);
        departureDate.innerHTML = dateSplit(result.startDate);
        daysUntilTrip.innerHTML = result.untilTrip;
        highTemp.innerHTML = result.highTemp;
        lowTemp.innerHTML = result.lowTemp;
        weatherCondition.innerHTML = result.description;
}

// DATE FORMAT
const dateSplit = (d) => {
    let upDate = d.split('T');
    return upDate[0];
}

// PRINT
const printBtn = () => {
    window.print();
}

// RESET
const deleteBtn = () => {
    location.reload();
}

export { handleSubmit, updateUI, dateSplit, printBtn, deleteBtn }
