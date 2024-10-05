const categories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    get_Categories(data.categories); 
};

const get_Categories = (data) => {
    const categories = document.getElementById('categories');
    data.forEach((category) => {
        console.log(category);
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('btn', 'btn-outline', 'btn-primary', 'm-2', 'rounded-xl');

        // Adding icon and category name to the element
        categoryElement.innerHTML = `<img class="w-6" src="${category.category_icon}" > ${category.category}`;
        categories.appendChild(categoryElement);

        // Adding click event to fetch specific category data
        categoryElement.addEventListener('click', () => {
            fetch(`https://openapi.programming-hero.com/api/peddy/category/${category.category}`)
            .then((response) => response.json())
            .then((SelectiveData) => {
                console.log("Selective Data:", SelectiveData);  // Debugging to see what the response is
                // Assuming the pets data is inside `SelectiveData.data.pets`
                displayPet(SelectiveData.data || []);  // Use optional chaining to prevent errors
            })
            .catch((error) => {
                console.error('Error fetching category data:', error); // Catch any errors in the fetch
            });
        });
    });
};

function displayPet(pets) {
    const petContainer = document.getElementById('pet');  // Make sure this element exists
    if (!petContainer) {
        console.error('Element with id "pet" not found.');
        return;
    }

    petContainer.innerHTML = ''; // Clear the container before adding new pets

    if (!pets || pets.length === 0) {
        petContainer.innerHTML = '<p>No pets found for this category.</p>';
        return;
    }

    pets.forEach((item) => {
        console.log(item);

        // You can add code here to display the pet data on the UI
        const petElement = document.createElement('div');
        petElement.classList.add('card');
        petElement.innerHTML = `
        <figure class="px-10 pt-10">
                      <img
                        src=""
                        alt="Shoes"
                        class="rounded-xl" />
                    </figure>
                    <div class="card-body ">
                      <h2 class="card-title">pet_name</h2>
                      <p class="flex gap-1 text-[#131313B3]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                      </svg>
                      Breed: </p>
                      <p class="flex gap-1 text-[#131313B3]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                      </svg>
                      Birth: </p>
                      <p class="flex gap-1 text-[#131313B3]"><img width="10" height="10" src="https://img.icons8.com/ios/10/gender.png" alt="gender"/>
                      Gender: </p>
                      <p class="flex gap-1 text-[#131313B3]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      
                      Price: </p>
                      <div class="flex justify-between">
                        <button></button><button></button><button></button>
                      </div>
                    </div>


            <h3></h3>
            <p>${item.date_of_birth}</p>
           
        `;
        petContainer.appendChild(petElement);
    });
}

categories();

