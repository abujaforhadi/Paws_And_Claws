const categories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  get_Categories(data.categories);
};
const petData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  get_pets(data.pets);
};
const get_pets = (data) => {  
  displayPet(data);
}
const get_Categories = (data) => {
  const categories = document.getElementById("categories");
  const loadingElement = document.getElementById("loading");
  
  let activeButton = null;

  data.forEach((category) => {
    const categoryElement = document.createElement("div");
    categoryElement.classList.add(
      "btn",
      "btn-outline",
      "m-2",
      "rounded-xl",
      "text-[#131313]"
    );

    categoryElement.innerHTML = `<img class="w-6" src="${category.category_icon}" > ${category.category}`;
    categories.appendChild(categoryElement);

    categoryElement.addEventListener("click", () => {
      loadingElement.style.display = "block";

      if (activeButton) {
        activeButton.style.backgroundColor = "";  
        activeButton.style.color = "";  
      }

      categoryElement.style.backgroundColor = "#0E7A81";
      categoryElement.style.color = "white"; 
      activeButton = categoryElement;

      fetch(
        `https://openapi.programming-hero.com/api/peddy/category/${category.category}`
      )
        .then((response) => response.json())
        .then((SelectiveData) => {
          setTimeout(() => {
            loadingElement.style.display = "none";
            const petContainer = document.getElementById("pet");

            displayPet(SelectiveData.data || []); 
          }, 5000);
          
        })
        .catch((error) => {
          console.error("Error fetching category data:", error);
          loadingElement.style.display = "none";
        });
    });
  });
};



let petsData = []; 

function displayPet(pets) {
  petsData = pets; 
  const petContainer = document.getElementById("pet");
  const likeContainer = document.getElementById("likeImage");
  if (!petContainer) {
    console.error('Element with id "pet" not found.');
    return;
  }

  petContainer.innerHTML = "";

  if (!pets || pets.length === 0) {
    petContainer.classList.remove("grid", "grid-cols-1", "gap-4", "md:grid-cols-2", "lg:grid-cols-3");

    petContainer.innerHTML = `
    <div class="card w-full">
      <figure class="px-10 pt-10">
        <img src="asset/images/error.webp" alt="error" class="" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">No Information Available</h2>
        <p class="text-[#131313B3]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
          its layout. The point of using Lorem Ipsum is that it has a.</p>
      </div>
    </div>
    `;
    return;
  }
  else{
    petContainer.classList.add("grid", "grid-cols-1", "gap-4", "md:grid-cols-2", "lg:grid-cols-3");

  }

  pets.forEach((item) => {

    const petElement = document.createElement("div");
    petElement.classList.add("card", "shadow-xl");

    const petName = item.pet_name || "Not available";
    const petBreed = item.breed || "Not available";
    const petDOB = item.date_of_birth
      ? new Date(item.date_of_birth).getFullYear()
      : "Not available";
    const petGender = item.gender || "Not available";
    const petPrice = item.price || "Not available";
    const vaccinated_status = item.vaccinated_status || "Not available";
    const pet_details = item.pet_details || "Not available";
    const petImage = item.image || "path/to/default-image.jpg"; 

    petElement.innerHTML = `
      <figure class="px-10 pt-10">
        <img src="${petImage}" alt="${petName}" class="rounded-xl" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${petName}</h2>
        <p class="flex gap-1 text-[#131313B3]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                      </svg>
          Breed: ${petBreed}
        </p>
        <p class="flex gap-1 text-[#131313B3]">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                      </svg> Birth: ${petDOB}
        </p>
        <p class="flex gap-1 text-[#131313B3]"><img width="10" height="10" src="https://img.icons8.com/ios/10/gender.png" alt="gender"/>
          Gender: ${petGender}
        </p>
        <p class="flex gap-1 text-[#131313B3]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
          Price: ${petPrice} $
        </p>
        <hr>
        <div class="flex justify-between">
          <button id="like" class="btn like-btn btn-outline text-[#0E7A81]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
          </button>
          <button id="Adopt" class="btn btn-outline text-[#0E7A81]">Adopt</button>
          <button class="btn btn-outline text-[#0E7A81] details-btn">Details</button>
        </div>
      </div>
    `;

    petContainer.appendChild(petElement);

    const likeButton = petElement.querySelector(".like-btn");
    likeButton.addEventListener("click", () => {
      const likedImage = document.createElement("img");
      likedImage.src = petImage;
      likedImage.alt = petName;

      likedImage.classList.add( "rounded-lg");

      likeContainer.appendChild(likedImage);
    });

    const detailsButton = petElement.querySelector(".details-btn");
    detailsButton.addEventListener("click", () => {
      showModalWithDetails(
        petName,
        petBreed,
        petDOB,
        petGender,
        petPrice,
        petImage,
        vaccinated_status,
        pet_details
      );
    });

    const adoptButton = petElement.querySelector("#Adopt");
    adoptButton.addEventListener("click", () => {
      showAdoptModal(adoptButton); 
    });
  });
}

function showModalWithDetails(
  name,
  breed,
  dob,
  gender,
  price,
  image,
  vaccinated_status,
  pet_details
) {
  const modal = document.getElementById("petDetailsModal");
  modal.innerHTML = `
  <div class="modal-box">
    <figure>
      <img src="${image}" alt="Pet Image" class="w-full rounded-xl" />
    </figure>
    <div class="p-4">
      <h3 class="text-xl font-bold">${name}</h3>
      <div class="grid grid-cols-2 gap-4 my-4">
        <p><strong>Breed:</strong> ${breed}</p>
        <p><strong>Birth:</strong> ${dob}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Price:</strong> ${price} $</p>
        <p><strong>Vaccination status:</strong> ${vaccinated_status}</p>
      </div>
      <div class="my-4">
        <h4 class="font-bold">Details Information</h4>
        <p class="text-sm text-gray-600">${pet_details}</p>
      </div>
    </div>
    <div class="modal-action">
      <button class="btn w-full font-bold text-lg text-[#0E7A81] bg-[#0E7A811A]" id="closeModal">Close</button>
    </div>
  </div>
`;

  modal.showModal();

  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.addEventListener("click", () => {
    modal.close();
  });
}

function showAdoptModal(adoptButton) {
  const adoptModal = document.getElementById("adoptModal");
  const countdownElement = document.getElementById("countdown");
  let countdown = 5;

  adoptModal.showModal();
  countdownElement.textContent = `Please wait ${countdown} `;

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = `Please wait ${countdown} `;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      adoptModal.close();
      adoptButton.textContent = "Adopted";
      adoptButton.disabled = true; 
    }
  }, 1000);

  const closeModalButton = document.getElementById("closeAdoptModal");
  closeModalButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    adoptModal.close();
  });
}

const sortButton = document.getElementById("sort");
sortButton.addEventListener("click", () => {
  if (petsData.length > 0) {
    petsData.sort((a, b) => (b.price || 0) - (a.price || 0));
    displayPet(petsData);
  }
});

categories();
petData();
