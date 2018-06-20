import React from 'react';
import ReactDOM from 'react-dom';
import './Components/App/App.css';
import App from './Components/App/App';
import './Components/Playlist/Playlist.css';
import './Components/SearchBar/SearchBar.css';
import './Components/SearchResults/SearchResults.css';
import './Components/Track/Track.css';
import './Components/TrackList/TrackList.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
