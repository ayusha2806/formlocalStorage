// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');

// Function to delete user by index
function deleteUser(index) {
  // Get the stored user details from local storage
  let storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

  // Make sure storedUserDetails is an array
  if (!Array.isArray(storedUserDetails)) {
    storedUserDetails = [];
  }

  // Remove the user entry at the specified index
  storedUserDetails.splice(index, 1);

  // Update local storage with the modified array
  localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));

  // Display the updated user details
  displayUserDetails();
}

// Function to edit user by index
function editUser(index) {
  // Get the stored user details from local storage
  let storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

  // Make sure storedUserDetails is an array
  if (!Array.isArray(storedUserDetails)) {
    storedUserDetails = [];
  }

  // Retrieve the user entry at the specified index
  const userToEdit = storedUserDetails[index];

  // Populate form fields with the existing data
  nameInput.value = userToEdit.name;
  emailInput.value = userToEdit.email;

  // Remove the user entry at the specified index
  storedUserDetails.splice(index, 1);

  // Update local storage with the modified array
  localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));

  // Display the updated user details
  displayUserDetails();
}

// Function to display user details on the screen
function displayUserDetails() {
  const userContainer = document.getElementById('user-list');

  // Get the user details from local storage
  const storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

  // Clear the existing content in the userContainer
  userContainer.innerHTML = '';

  // Loop through the user details and create list items to display them
  storedUserDetails.forEach((user, index) => {
    const userItem = document.createElement('div');
    userItem.innerHTML = `
      <p>User ${index + 1}:</p>
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
      <button class="edit-btn" onclick="editUser(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
    `;
    userContainer.appendChild(userItem);
  });
}

// Call the displayUserDetails function to initially display user details
displayUserDetails();

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create an object to store user details
    const userDetails = {
      name: nameInput.value,
      email: emailInput.value,
    };

    // Call a separate function to add user details to local storage
    addToLocalStorage(userDetails);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';

    // Update the displayed user details
    displayUserDetails();
  }
}

// Function to add new user details to local storage
function addToLocalStorage(userDetails) {
  // Check if there are existing user details in local storage
  let storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

  // Make sure storedUserDetails is an array
  if (!Array.isArray(storedUserDetails)) {
    storedUserDetails = [];
  }

  // Add the new user details to the existing array
  storedUserDetails.push(userDetails);

  // Convert the array to a JSON string
  const userDetailsJSON = JSON.stringify(storedUserDetails);

  // Store the JSON string in local storage
  localStorage.setItem('userDetails', userDetailsJSON);
}
