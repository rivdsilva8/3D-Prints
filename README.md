# 3D-Prints

## Introduction

The MERN (MongoDB, Express.js, React, Node.js) web application is designed to facilitate shopping for 3D prints while offering users the capability to upload custom 3D models and obtain estimates for their printing costs. Here's an expanded overview of the application's features and functionality:

## Features

### User Login / SignUp:
User authentication and authorization to ensure secure access to the application's features.
Allow users to sign up, log in, log out.

### Shopping:
Shop for 3D prints available for purchase, organized into categories and subcategories for easy navigation.
has detailed product descriptions, images, and pricing information for each item in the catalog.

### Shopping Cart:
Enable users to add items to their shopping carts and adjust quantities as needed.
Implement functionality for users to remove items from their carts and proceed to checkout when ready.

### Custom 3D Model Upload (pending) :
Allow users to upload their custom 3D models directly through the web application.
Support various file formats commonly used for 3D models, such as STL, OBJ, and FBX.

### Estimation of Printing Costs (pending) :
Upon uploading a custom 3D model, provide users with an estimated cost for printing based on factors such as material, size, complexity, and printing method (e.g., FDM, SLA).
Display the estimated cost to users along with the uploaded model, allowing them to make informed decisions before proceeding with the printing order.

### Order Management (pending) :
Enable users to review their order history, including past purchases and uploaded 3D models awaiting printing.

### Responsive Design:
Responsive and optimized for a seamless user experience across devices of all screen sizes, including desktops, laptops, tablets, and smartphones.
Admin Panel

### Admin DashBoard:
Admin panel with features for managing products and adding new products

# Running the Application

There are 3 parts to the application

* Back-End
* Front-End
* Admin

# back-End :
1. Navigate to the backend by using / or open in a new terminal
   
   ```bash
   cd ./3D-Prints/backend
   ```
   
2. Install all dependencies by running
   
   ```bash
   npm i 
   ```
   
3. Run the admin server using the command

   ```bash
   npm start
   ```
4. The Backend server will be running by default on port 4000

   
# Front-End :
1. Navigate to the Frontend by using / or open in a new terminal
   
   ```bash
   cd ./3D-Prints/frontend
   ```
   
2. Install all dependencies by running
   
   ```bash
   npm i 
   ```
   
3. Run the Frontend server using the command

   ```bash
   npm start
   ```

4. The Frontend server will be running by default on port 3000
   open the link on a web browser to view the application

   ```bash
   http://localhost:3000
   ```

       
After running both frontend and backend servers, we can use most features such as :
* Signing up an account
* Logging into your account
* adding products to cart


    
# Admin :
1. Navigate to the admin by using
   
   ```bash
   cd ../3D-Prints/admin
   ```
   
2. Install all dependencies by running
   
   ```bash
   npm i 
   ```
   
3. Run the backend server using the command

   ```bash
   npm run dev
   ```
4. The Admin server will be running by default on port 5173
   open the link on a web browser to view the application

   ```bash
   http://localhost:5173
   ```
   
    

when you run the Admin server you gain features such as :
* New product creation
* Product deletion
* View all products






