//Global Variables 
let image = document.getElementById('mainImg');
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

//Main Form Function
async function handleSubmit(event) {
    event.preventDefault()
    //Input data selectors
    let formPlace = document.getElementById('loc-input').value;
    console.log("The place is ",formPlace);
    let formStart = document.getElementById('startDate').value;
    console.log("The department date is ",formStart);
    let formReturn = document.getElementById('returnDate').value;
    console.log("The return date is ",formReturn);


    //Instances for days' Calculations
    const today = new Date();
    const startDate = new Date(formStart);
    const endDate = new Date(formReturn);
    

    const tripTime = Math.abs(endDate - startDate);
    const tripDays = Math.ceil(tripTime / (1000 * 60 * 60 * 24));
    console.log(tripDays + " trip days")

    const toTripTime = Math.abs(startDate - today);
    const toTripDays = Math.ceil(toTripTime / (1000 * 60 * 60 * 24));
    console.log(toTripDays + " days to depart");   


    await fetch('http://localhost:3000/newTrip',{
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

    let res = await fetch('http://localhost:3000/geoNames',{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Orign": "*",
        }
        
    });
    res = await fetch('http://localhost:3000/weatherBit',{
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

//Update UI Function after calling server APIs

function updateUI(result){
    ///Results after successful submission 
    console.log('The result are: ', result)

    //Show Results 
    plannerResults.style.display = 'block';
    //disable form 
    plannerClass[0].style.display = 'none';
 
    //Update place info everywhere 
    for(var i=0; i < cityClasses.length && i <countryClasses.length ; i++){
        cityClasses[i].innerHTML = result.city;
        countryClasses[i].innerHTML = result.country;
    }   
    // image.setAttribute('src', result.imageUrl);
    //Update Dates, Days until trip, Temperatures and Weather conditions 
    // departureDate.innerHTML = dateSplit(result.startDate);
    // daysUntilTrip.innerHTML = result.untilTrip;
    highTemp.innerHTML =result.maxTemp;
    lowTemp.innerHTML = result.minTemp;
    weatherCondition.innerHTML = result.description;
}

//Make the format date (yyyy-mm-dd) 
////with split() function from 'T' where we take the first Substring | ref: https://www.w3schools.com/jsref/jsref_split.asp
const dateSplit = (d) => {
    let upDate = d.split('T');
    return upDate[0];
}

//Delete the current result with reload all entire page like refresh browser button 
const deleteBtn = () => {
     location.reload();
}

export { handleSubmit, updateUI, dateSplit, deleteBtn }