import {Router} from '@reach/router';
// import './App.css';
import List from './components/List';
import Add from './components/Add';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <div className="container p-3">
        <h2><a href="/players/list">Manage Players</a> | <a href="/status/game/1">Manage Players Status</a></h2>
        <div className="container border mt-3">
        <Router>
        <List path='/players/list'/>
        <Add path='/players/addplayer' />
        <Game path='/status/game/:id' />
      </Router>
      </div>
      </div>
    </div>
  );
}

export default App;
