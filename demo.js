function D() {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((response) => response.json())
        .then(data => displayPet(data.pets))
        .catch(error => console.error("Error fetching data:", error));
}
function displayPet(pets) {
    pets.forEach(element => {
        console.log(element.pet_name);
    });
}
D();
