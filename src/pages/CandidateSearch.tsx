import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null); // Holds the current candidate's details
  const [usernames, setUsernames] = useState<string[]>([]); // Holds a list of usernames
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch a batch of usernames when the component mounts
  useEffect(() => {
    fetchUsernames();
  }, []);

  // Fetch a batch of usernames
  const fetchUsernames = async () => {
    try {
      setLoading(true);
      const users = await searchGithub();
      console.log("Fetched Users:", users); // Log usernames
      const usernamesList = users.map((user: any) => user.login);
      console.log("Usernames List:", usernamesList); // Log extracted usernames
      setUsernames(usernamesList);
  
      if (usernamesList.length > 0) {
        fetchCandidateDetails(usernamesList[0]);
        setUsernames(usernamesList.slice(1));
      } else {
        setError("No more candidates available.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch usernames. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCandidateDetails = async (username: string) => {
    try {
      setLoading(true);
      console.log("Fetching candidate details for:", username); // Log username
      const details = await searchGithubUser(username);
      console.log("Fetched Candidate Details:", details); // Log details
      setCandidate(details);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch candidate details.");
    } finally {
      setLoading(false);
    }
  };
  
  // Save the current candidate and fetch the next one
  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );
      localStorage.setItem(
        "savedCandidates",
        JSON.stringify([...savedCandidates, candidate])
      );
    }
    fetchNextCandidate();
  };

  // Skip the current candidate and fetch the next one
  const skipCandidate = () => {
    fetchNextCandidate();
  };

  // Fetch the next candidate
  const fetchNextCandidate = () => {
    if (usernames.length > 0) {
      fetchCandidateDetails(usernames[0]);
      setUsernames(usernames.slice(1)); // Remove the first username
    } else {
      setError("No more candidates available.");
      setCandidate(null); // Clear current candidate
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
          <h2>{candidate.name || "Name not available"}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location || "Location not available"}</p>
          <p>Email: {candidate.email || "Email not available"}</p>
          <p>Company: {candidate.company || "Company not available"}</p>
          <a
            href={candidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
          </a>
          <div>
            <button onClick={saveCandidate}>+</button>
            <button onClick={skipCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
