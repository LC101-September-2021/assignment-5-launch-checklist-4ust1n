// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let selectionList = document.getElementById('missionTarget')
   selectionList.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
}

function validateInput(testInput) {
    let result = '';
    if (testInput === '') {
        return result += "Empty"
    }
    if (isNaN(testInput) && testInput !== '') {
        return result += "Not a Number"
    } 
    if (testInput == Number(testInput)) {
        return result += 'Is a Number'
    }
    return result;
};

let list;
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    for (let i = 2; i < arguments.length; i++) {
        let inputs = arguments[i];
        let validation = validateInput(inputs)
        if (validation === 'Empty') {
            return alert('All fields are required')
        }
        if (!isNaN(pilot) || !isNaN(copilot)) {
            return alert('Make sure to enter valid information for each field!')
        }
        if (isNaN(fuelLevel) || isNaN(cargoMass)) {
            return alert('Make sure to enter valid information for each field!')
        }
    };

    let faulty = document.getElementById('faultyItems')
    let launchStatus = document.getElementById('launchStatus')
    let fuelStatus = document.getElementById('fuelStatus')
    let cargoStatus = document.getElementById('cargoStatus')
    let pilotStatus = document.getElementById('pilotStatus')
    let copilotStatus = document.getElementById('copilotStatus')

    fuelStatus.innerHTML = 'Fuel level high enough for launch'
    cargoStatus.innerHTML = 'Cargo mass low enough for launch'
    launchStatus.innerHTML = 'Shuttle is Ready for Launch'
    launchStatus.style.color = 'rgb(65, 159, 106)'

    if (fuelLevel < 10000) {
        faulty.style.visibility = 'visible'
        fuelStatus.innerHTML = 'Fuel level too low for launch'
        launchStatus.style.color = 'rgb(199, 37, 78)'
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }
    if (cargoMass > 10000) {
        faulty.style.visibility = 'visible'
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch'
        launchStatus.style.color = 'rgb(199, 37, 78)'
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
    });
    return planetsReturned;
};


function pickPlanet(planets) {
    let selectAtRandom = Math.round(Math.random() * planets.length)
    let select = planets[selectAtRandom]

    return select;
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
