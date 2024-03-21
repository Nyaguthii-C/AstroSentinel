async function login() {
    console.log('Login button clicked');

    const usernameoremail = document.getElementById('usernameoremail').value;
    const password = document.getElementById('password').value;

    const formData = {
        usernameoremail,
        password,
    };

    try {
        const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);
    if (data.message) {
            // Display the success message to the user
            //alert('Login Successful');
            // redirect user to index page to interact with map and markers 
            window.location.href = '/index';  
        } else {
            // Check for error messages
            if (data.error) {
                alert(data.error);
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}
