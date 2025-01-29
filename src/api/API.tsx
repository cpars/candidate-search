import { Candidate } from "../interfaces/Candidate.interface";  

const searchGithub = async () => {
  try {
    // Generate a random starting ID for pagination
    const start = Math.floor(Math.random() * 100000000) + 1;

    // Make the API request
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    // Log the status and rate limit for debugging
    console.log("searchGithub Response Status:", response.status);
    console.log("Rate Limit Remaining:", response.headers.get("X-RateLimit-Remaining"));

    // Parse the response
    const data = await response.json();
    console.log("searchGithub Data:", data); // Log the actual data

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${data.message || "Unknown error"}`);
    }

    return data; // Return the list of users
  } catch (err) {
    console.error("An error occurred in searchGithub:", err);
    return []; // Return an empty array on failure
  }
};


// const searchGithub = async () => {
//   return [
//     { login: "mockuser1" },
//     { login: "mockuser2" },
//     { login: "mockuser3" },
//   ];
// };



const searchGithubUser = async (username: string): Promise<Candidate> => {
  try {
    // Making the API request
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    // Log the status and headers for debugging
    console.log("searchGithubUser Response Status:", response.status);
    console.log("searchGithubUser Rate Limit Remaining:", response.headers.get("X-RateLimit-Remaining"));

    // Parse the JSON response
    const data: Candidate = await response.json();
    console.log("searchGithubUser Data:", data); // Log returned data

    // Handle response errors
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - || "Unknown error"}`);
    }

    // Return the candidate data
    return data;
  } catch (err) {
    console.error("An error occurred in searchGithubUser:", err);
    throw new Error("Failed to fetch candidate details.");
  }
};


// const searchGithubUser = async (username: string): Promise<Candidate> => {
//   return {
//     login: username,
//     id: Math.floor(Math.random() * 100000000) + 1,
//     avatar_url: "https://via.placeholder.com/150",
//     html_url: `https://github.com/${username}`,
//     name: "Mock Name",
//     company: "Mock Company",
//     location: "Mock Location",
//     email: "mock@example.com",
//   };
// };


export { searchGithub, searchGithubUser };
