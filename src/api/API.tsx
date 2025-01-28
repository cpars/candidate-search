import { Candidate } from "../interfaces/Candidate.interface";  

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    console.log("searchGithub Response:", response); // Log full response
    const data = await response.json();
    console.log("searchGithub Data:", data); // Log returned data

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab.");
    }

    return data;
  } catch (err) {
    console.error("An error occurred in searchGithub:", err);
    return [];
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
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    console.log("searchGithubUser Response:", response); // Log full response
    const data: Candidate = await response.json();
    console.log("searchGithubUser Data:", data); // Log returned data

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab.");
    }

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
