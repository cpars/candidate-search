import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

const App = () => {
  return (
    <div>
      <header>
        <h1>Candidate Search App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/saved-candidates">Saved Candidates</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
