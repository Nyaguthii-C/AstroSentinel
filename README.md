# AstroSentinel 🌌🛡️

AstroSentinel is an Express.js web application that combines HTML, CSS, and JavaScript to provide an interactive map displaying light pollution levels. The map showcases markers with [SQM](https://en.wikipedia.org/wiki/Sky_quality_meter#:~:text=A%20sky%20quality%20meter%20\(SQM,square%20arcsecond%22%20favored%20by%20astronomers.) measurements and [Bortle scale](https://en.wikipedia.org/wiki/Bortle_scale) values, allowing users to visualize and contribute to a collective understanding of light pollution.

## Project Structure 📁
The directories and files in this project are:  
- **config/:** Contains database configuration files (`db.js`).
- **models/:** Houses Mongoose models for interacting with the database(`users.js`, `markers.js`)
- **routes/:** Includes route files, separating different functionalities into modular components.
- **views/:** Contains the views for rendering the project's front-end(.ejs, .js and .css files) 
- **server.js:** The main entry point of the application.
- **package.json and package-lock.json:** list of project dependencies and their versions.

## Database Configuration 🛠️

The database configuration is handled in the `config/db.js` file. This file uses the `dotenv` package to load environment variables, including the database connection string. To set up the database configuration:

1. **Create an .env file:**
   - In the root directory, create a file named `.env`.
   - Add the following content, replacing `your_actual_database_url_with_password` with your MongoDB connection string:

     ```plaintext
     DB_URL=your_actual_database_url_with_password
     ```

2. **Install dependencies:**
   - Run the following command to install the required packages:

     ```bash
     npm install
     ```

3. **Start the application:**
   - Run the application using the following command:

     ```bash
     node server.js
     ```

   The application should now connect to the database using the provided connection string.

## OAuth2 Configuration 🔐
To enable OAuth2 authentication in the application, set up the necessary credentials and environment variables.  

Setting up Google OAuth2 Credentials:
1. **Create OAuth2 Credentials**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/), and create a new project if needed.
   - Navigate to "APIs & Services" > "Credentials" and create OAuth2 credentials (Client ID and Client Secret) for this project.
2. **Set up Redirect URI**:
   - Configure the redirect URI for the application in the OAuth2 credentials.
   - Use the appropriate redirect URI based on the environment. For example:
     - For local development: `http://localhost:3000/auth/google/callback`
     - For testing with OAuth2 Playground: `https://developers.google.com/oauthplayground`
3. **Set Environment Variables**:
   - Add the following environment variables to the `.env` file in the root directory of this project:
     ```plaintext
     EMAIL=YOUR_GOOGLE_EMAIL_HERE
     REFRESH_TOKEN=PASTE_REFRESH_TOKEN_HERE
     CLIENT_SECRET=PASTE_CLIENT_SECRET_HERE
     CLIENT_ID=PASTE_CLIENT_ID_HERE
     ```
   - These values can be obtained from Google Developer Console. For more guidance on creating OAuth 2.0 API Credentials, refer to [Creating OAuth 2.0 API Credentials](https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a).


## Contributing 🤝

If you would like to contribute to this project:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Set up your local environment by following the steps in the sections above.
4. Make changes and improvements.
5. Create a pull request to propose your changes.

Ad Astra! 💫
