# Fetch Dog Adoption Application

## LIVE WEBSITE
### [https://fetch-frontend-swart.vercel.app/](https://fetch-frontend-swart.vercel.app/)

This project is a React-based web application built as part of the Fetch Frontend Take-Home Exercise. It helps dog lovers search through a database of shelter dogs, filter results by breed, paginate, sort, and select favorite dogs to generate a match for adoption.


## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:**  
  Users log in using their name and email. The app sends a POST request to the `/auth/login` endpoint, which sets an HttpOnly cookie for authenticated sessions.

- **Dog Search:**  
  - **Filtering by Breed:**  
    Users can filter search results using a dropdown populated with breeds from the `/dogs/breeds` endpoint.
  - **Pagination:**  
    Results are paginated with "Previous" and "Next" buttons, using query parameters (`size` and `from`) from the `/dogs/search` endpoint.
  - **Sorting:**  
    Results are sorted by breed alphabetically by default. Users can toggle between ascending and descending sort order.
  - **Dog Details:**  
    Every dog card displays all relevant fields (image, name, age, zip code, and breed).

- **Favorites & Matching:**  
  Users can add or remove dogs from their favorites list. When ready, clicking "Generate Match" sends the selected dog IDs to the `/dogs/match` endpoint to generate a match for adoption.

- **Clean and Responsive Styling:**  
  The application uses simple, modular CSS to ensure a clean and user-friendly interface.

## API Endpoints

The application interacts with the following endpoints from the Fetch backend service (base URL: `https://frontend-take-home-service.fetch.com`):

- **Authentication**
  - `POST /auth/login`: Logs in a user and sets an auth cookie.
  - `POST /auth/logout`: Logs out a user and invalidates the auth cookie.

- **Dogs**
  - `GET /dogs/breeds`: Retrieves an array of available dog breeds.
  - `GET /dogs/search`: Searches for dogs based on filters such as breed, pagination (`size` and `from`), and sorting (`sort=breed:asc|desc`).
  - `POST /dogs`: Fetches full dog objects for a list of dog IDs.
  - `POST /dogs/match`: Generates a match from an array of favorite dog IDs.

- **Locations (Optional)**
  - `POST /locations`: Retrieves location details based on ZIP codes.
  - `POST /locations/search`: Searches for locations based on various criteria.

## Installation

### Prerequisites

- **Node.js** (v12 or later)
- **npm** or **yarn**

### Steps

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
