import React, { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch saved candidates from localStorage
    const storedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    console.log("Loaded Saved Candidates:", storedCandidates); // Debug log
    setSavedCandidates(storedCandidates);
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img
                src={candidate.avatar_url}
                alt={`${candidate.name}'s avatar`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
