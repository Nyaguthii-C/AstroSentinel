// views/signup.js

async function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const formData = {
    username,
    password,
  };

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    console.log(data); // Log the response to the console for debugging

    // Check if the response includes a success message
    if (data.message) {
      // Display the success message to the user
      alert(data.message);
      // You can also redirect the user to the login page or perform other actions
    } else {
      // Handle other cases if needed
      console.log(data);
    }
  } catch (error) {
    console.error('Error during signup:', error);
  }
}
