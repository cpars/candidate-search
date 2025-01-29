# **GitHub Candidate Search Application**

This is a web application that allows employers to search for GitHub users as potential candidates, view their details, and save candidates for future reference. The app interacts with the GitHub API to fetch user data and provides a user-friendly interface to manage and review potential candidates.

---

## **Features**
- Fetches a random list of GitHub users using the GitHub API.
- Displays detailed information about each candidate, including:
  - Name
  - Username
  - Avatar
  - Location
  - Email
  - Company
  - GitHub Profile Link
- Allows users to:
  - Save a candidate to a list.
  - Skip a candidate.
- Displays the saved candidates on a separate page.
- Persists saved candidates using local storage.

---

## **Technologies Used**
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: GitHub REST API
- **Routing**: React Router
- **State Management**: React Hooks
- **Local Storage**: For saving candidate data locally

---

## **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/github-candidate-search.git
   cd github-candidate-search

2. **Install Dependencies**
To install the necessary dependencies, run the following command in the project directory:

```bash
npm install
```

3. **Set Up Environment Variables**

   1. Create a `.env` file in the root directory of your project.
   2. Add the following line to the `.env` file:
   ```plaintext
   VITE_GITHUB_TOKEN=your_personal_access_token

## **4. Run the Development Server**

After setting up the environment variables, start the development server by running the following command:

```bash
npm run dev
```

## **5. Open the App**

Once the development server is running, open your browser and navigate to:
http://localhost:3000

## **Usage**

### **1. Search Candidates**
- Navigate to the home page (`/`).
- View candidate details, including name, username, location, email, and company.
- Click the **Save** (`+`) button to add the candidate to the saved list.
- Click the **Skip** (`-`) button to move to the next candidate without saving.

### **2. View Saved Candidates**
- Navigate to `/saved-candidates` to see the list of saved candidates.
- Each saved candidate displays their profile details.
- Click on a candidate’s **GitHub profile link** to view their full profile.

### **3. API Rate Limits**
- The GitHub API allows up to **5,000 requests per hour** with authentication.
- If the rate limit is exceeded, wait for the reset or use a new token.
- Check the remaining API requests by logging:
  ```javascript
  console.log(response.headers.get("X-RateLimit-Remaining"));
  ```

### Project Structure
```bash
github-candidate-search/
├── public/             # Static assets
├── src/
│   ├── api/            # API functions
│   ├── components/     # Shared components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── App.tsx         # Root app component
│   ├── main.tsx        # App entry point
│   └── index.css       # Tailwind CSS setup
├── .env                # Environment variables
├── package.json        # NPM dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## **Scripts**

The following scripts are available to manage the project:

### **Start the Development Server**
Runs the application in development mode.
```bash
npm run dev
```
## **Potential Improvements**

Here are some enhancements that could be added to improve the application:

- **Search Functionality**: Allow users to search for candidates by name or username.
- **Sorting & Filtering**: Enable sorting and filtering options for saved candidates based on location, company, or activity.
- **Pagination Support**: Implement proper pagination to browse more candidates efficiently.
- **Enhanced Error Handling**: Improve error messages and user feedback when API requests fail or rate limits are exceeded.
- **Dark Mode**: Add a toggle for light and dark mode for better UI customization.
- **User Authentication**: Implement user login to allow saving candidates across different devices.
- **Animations & UI Enhancements**: Use animations (e.g., Framer Motion) to improve the user experience.
- **Export Saved Candidates**: Add an option to download the saved candidates as a CSV or JSON file.
- **Deploy the App**: Deploy to platforms like **Vercel**, **Netlify**, or **Render** for public access.

## **License**

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project under the terms of the MIT License. See the [LICENSE](LICENSE) file for more details.

## **Acknowledgments**

- **GitHub REST API** – [GitHub API Documentation](https://docs.github.com/en/rest)
- **Tailwind CSS** – [Tailwind Documentation](https://tailwindcss.com/docs)
- **React Router** – [React Router Documentation](https://reactrouter.com/)
- **Vite** – [Vite Documentation](https://vitejs.dev/)

A big thank you to the open-source community for their contributions and continuous support!


