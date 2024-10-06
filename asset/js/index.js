const categories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  get_Categories(data.categories);
};

const get_Categories = (data) => {
  const categories = document.getElementById("categories");
  
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
          console.log("Selective Data:", SelectiveData);
          displayPet(SelectiveData.data || []);
        })
        .catch((error) => {
          console.error("Error fetching category data:", error);
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
    petContainer.innerHTML = `
    <div class="card w-full">
      <figure class="px-10 pt-10">
        <img src="asset/images/error.webp" alt="error" class="w-full" />
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
        <p class="flex gap-1 text-[#131313B3]">
          Breed: ${petBreed}
        </p>
        <p class="flex gap-1 text-[#131313B3]">
          Birth: ${petDOB}
        </p>
        <p class="flex gap-1 text-[#131313B3]">
          Gender: ${petGender}
        </p>
        <p class="flex gap-1 text-[#131313B3]">
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

      likedImage.classList.add("w-full", "rounded-lg");

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
