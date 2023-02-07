// MovieCard will be a Class Component as well
// because we need a state object to store the data from OMBDapi

// CHAIN OF EVENTS
// 1) first render() invocation, LOADING appears...
// 2) componentDidMount() gets invoked
// 3) componentDidMount() fetches the data, sets the state with it
// 4) because a setState happened, render() fires AGAIN
// 5) the LOADING message is removed from the DOM, the Card appears...!
// 6) a selection of a new movie from the dropdown makes MovieCard receive a new prop
// 7) a change in the movieTitle prop will trigger componentDidUpdate, just like
// every setState does!
// 8) componentDidUpdate listens JUST for a change in the movieTitle prop thanks
// to the if statement using its arguments, prevProps (the previous props object)
// and prevState (the previous state object, which we're not using here)
// 9) the if statement in componentDidUpdate takes care of fetching new data
// every time a new movie is selected, paying attention at NOT fetching data
// after the function's setState, which is also triggering an update!

import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

const MovieCard = ({ movieTitle }) => {
  const [movieInfo, setMovieInfo] = useState(null)

  const fetchMovieData = async () => {
    // let's make the network call for retrieving the movie poster, data etc.
    // http://www.omdbapi.com/?apikey=24ad60e9&s= <-- this gives us back an array of results
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + movieTitle
      )
      // response now it the Response object from our fetch call!
      // response can have an "ok" property true/false
      if (response.ok) {
        // "ok" can be true/false
        // let's convert the body of this response into something useful
        let searchResults = await response.json()
        console.log('RESULTS OBJECT', searchResults)
        let arrayOfResults = searchResults.Search
        console.log('RESULTS ARRAY', arrayOfResults)
        // let's take the first element of this array to fill our card!
        setMovieInfo(arrayOfResults[0])
      } else {
        // error came
        console.log('error fetching the array of results')
      }
    } catch (error) {
      console.log('generic error', error)
    }
  }

  // componentDidMount
  useEffect(() => {
    fetchMovieData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // componentDidUpdate with condition on the movieTitle prop
  useEffect(() => {
    fetchMovieData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle])

  // this.fetchMovieData()
  // render() gets invoked every time there's a change in the STATE or in the PROPS
  // we'd like to get a new fetchMovieData() when the props change! :)
  // we also DON'T WANT to re call fetchMovieData() when the STATE changes :(

  return (
    <>
      {movieInfo ? (
        <Card>
          <Card.Img variant="top" src={movieInfo.Poster} />
          <Card.Body>
            <Card.Title>{movieInfo.Title}</Card.Title>
            <Card.Text>
              {movieInfo.Year} - {movieInfo.imdbID}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="text-light">LOADING...</div>
      )}
    </>
  )
}

export default MovieCard
