import { useState, useEffect } from "react"; 
import { searchGithub, searchGithubUser } from "../api/API"; 
import { Candidate } from "../interfaces/Candidate.interface"; 

// CandidateSearch Component: Handles fetching and displaying GitHub users as candidates
const CandidateSearch = () => {
  // State to hold the current candidate's details
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  
  // State to store a list of usernames retrieved from GitHub API
  const [usernames, setUsernames] = useState<string[]>([]);
  
  // State to manage the loading status
  const [loading, setLoading] = useState<boolean>(true);
  
  // State to store and display any errors
  const [error, setError] = useState<string | null>(null);

  // useEffect Hook: Fetches a batch of usernames when the component mounts
  useEffect(() => {
    fetchUsernames();
  }, []);

  /**
   * Fetch a batch of usernames from GitHub API
   */
  const fetchUsernames = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const users = await searchGithub(); // Call API function to get users
      console.log("Fetched Users:", users); // Log API response

      // Extract usernames from the fetched user data
      const usernamesList = users.map((user: any) => user.login);
      console.log("Usernames List:", usernamesList); // Debugging: Log extracted usernames
      
      setUsernames(usernamesList); // Store usernames in state

      // If we have users, fetch the first user's details
      if (usernamesList.length > 0) {
        fetchCandidateDetails(usernamesList[0]);
        setUsernames(usernamesList.slice(1)); // Remove first username from the list
      } else {
        setError("No more candidates available.");
      }
    } catch (err) {
      console.error("Error fetching usernames:", err);
      setError("Failed to fetch usernames. Please try again.");
    } finally {
      setLoading(false); // Stop loading state once the request is completed
    }
  };

  /**
   * Fetch details of a single candidate using their GitHub username
   * @param username - GitHub username to fetch details for
   */
  const fetchCandidateDetails = async (username: string) => {
    try {
      setLoading(true); // Set loading state to true before fetching details
      console.log("Fetching candidate details for:", username); // Debugging log
      
      const details = await searchGithubUser(username); // Fetch user details from API
      console.log("Fetched Candidate Details:", details); // Debugging log
      
      setCandidate(details); // Update candidate state with fetched details
      setError(null); // Reset error state
    } catch (err) {
      console.error("Error fetching candidate details:", err);
      setError("Failed to fetch candidate details.");
    } finally {
      setLoading(false); // Stop loading state after API response
    }
  };

  /**
   * Save the current candidate to local storage and fetch the next candidate
   */
  const saveCandidate = () => {
    if (candidate) {
      // Retrieve saved candidates from local storage or initialize as an empty array
      const savedCandidates = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );
      
      // Save the updated list of candidates to local storage
      localStorage.setItem(
        "savedCandidates",
        JSON.stringify([...savedCandidates, candidate])
      );
    }
    fetchNextCandidate(); // Move to the next candidate after saving
  };

  /**
   * Skip the current candidate and fetch the next one without saving
   */
  const skipCandidate = () => {
    fetchNextCandidate(); // Simply move to the next candidate
  };

  /**
   * Fetch the next candidate from the list
   */
  const fetchNextCandidate = () => {
    if (usernames.length > 0) {
      fetchCandidateDetails(usernames[0]); // Fetch details of the next username
      setUsernames(usernames.slice(1)); // Remove the first username from the list
    } else {
      setError("No more candidates available."); // Display a message when no users remain
      setCandidate(null); // Clear the current candidate display
    }
  };

  // Display a loading message while fetching data
  if (loading) return <p>Loading...</p>;

  // Display an error message if an error occurs
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      {candidate ? (
        <div className="text-center">
          {/* Candidate's Profile Picture */}
          <img 
            src={candidate.avatar_url} 
            alt={`${candidate.name}'s avatar`} 
            className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300"
          />

          {/* Candidate Details */}
          <h2 className="text-xl font-bold mt-4">
            {candidate.name || "Name not available"}
          </h2>
          <p className="text-gray-600">@{candidate.login}</p>
          <p className="text-gray-700"><strong>Location:</strong> {candidate.location || "Not available"}</p>
          <p className="text-gray-700"><strong>Email:</strong> {candidate.email || "Not available"}</p>
          <p className="text-gray-700"><strong>Company:</strong> {candidate.company || "Not available"}</p>

          {/* GitHub Profile Link */}
          <a
            href={candidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 mt-4 underline"
          >
            View GitHub Profile
          </a>

          {/* Save & Skip Buttons */}
          <div className="flex justify-around mt-6">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={saveCandidate}
            >
              Save
            </button>
            <button 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={skipCandidate}
            >
              Skip
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
