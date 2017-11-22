import React, { Component } from 'react';
import 'isomorphic-fetch';

import MovieReviews from './MovieReviews';

const NYT_API_KEY = 'fafd51a1f75f40fe89633bfb1c6a77ea';
const BASE_URL = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${NYT_API_KEY}&query=`

class SearchableMovieReviewsContainer extends Component{
  constructor(){
    super()

    this.state = {
      searchTerm: '',
      reviews: []
    }
  }

  // as the input changes, the state live adjusts for seartTerm
  handleSearchInputChange = event => {this.setState({searchTerm: event.target.value})}

  handleSubmit = event => {
    event.preventDefault();
    fetch(BASE_URL.concat(this.state.searchTerm))
        .then(response => response.json())
        .then(response => this.setState({reviews: response.results }))
    }






    render() {
        return (
          <div className="searchable-movie-reviews">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='search-input'>Search Movie Reviews</label>

              <input
                id='search-input'
                type="text"
                style={{width: 300}}

                onChange={this.handleSearchInputChange} />
              <button type="submit">Submit</button>
            </form>
            {this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
            <MovieReviews reviews={this.state.reviews} />
          </div>
        );
      }

}

export default SearchableMovieReviewsContainer
