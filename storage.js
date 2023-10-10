// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Store user details in local storage
    const userDetails = {
      name: nameInput.value,
      email: emailInput.value,
    };
    // Convert the object to a JSON string
    const userDetailsJSON = JSON.stringify(userDetails);
    // Store the JSON string in local storage
    localStorage.setItem('userDetails', userDetailsJSON);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}
