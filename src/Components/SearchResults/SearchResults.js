import React from 'react';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList playlistTracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResults;
