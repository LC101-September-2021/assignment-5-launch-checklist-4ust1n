// Write your JavaScript code here!


// const { pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", () => {
    let form = document.querySelector("form");
    let list = document.getElementById('faultyItems')
    form.addEventListener("submit", (event) => {
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoMass = document.querySelector("input[name=cargoMass]").value;
        
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
        event.preventDefault()
    });

    let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
    }).then(function () {
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets)
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
    });
});