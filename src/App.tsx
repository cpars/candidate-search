
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

const App = () => {
  return (
    <div>
      <header>
        <h1>Candidate Search App</h1>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
