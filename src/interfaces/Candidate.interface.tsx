// TODO: Create an interface for the Candidate objects returned by the API
// Define an interface for a Candidate object
export interface Candidate {
    login: string; // GitHub username
    id: number; // Unique ID for the user
    avatar_url: string; // URL to the user's avatar image
    html_url: string; // URL to the user's GitHub profile
    name?: string; // Full name of the user (optional, may be null)
    company?: string; // User's company (optional, may be null)
    location?: string; // User's location (optional, may be null)
    email?: string; // User's email address (optional, may be null)
    bio?: string; // User's bio or description (optional)
  };
  