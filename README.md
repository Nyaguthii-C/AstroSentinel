# AstroSentinel 🌌🛡️

AstroSentinel is an Express.js web application that combines HTML, CSS, and JavaScript to provide an interactive map displaying light pollution levels. The map showcases markers with SQM measurements and Bortle scale values, allowing users to visualize and contribute to a collective understanding of light pollution.

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

## Contributing 🤝

If you would like to contribute to this project:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Set up your local environment by following the steps in the Database Configuration section.
4. Make changes and improvements.
5. Create a pull request to propose your changes.

Ad Astra! 💫
