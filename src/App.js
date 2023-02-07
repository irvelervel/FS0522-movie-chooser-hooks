import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import MovieCard from './components/MovieCard'
import { Col, Container, Row } from 'react-bootstrap'
import MovieDropdown from './components/MovieDropdown'

const App = () => {
  const [movieTitle, setMovieTitle] = useState('Iron Man')

  const changeMovieTitle = (newSelectOption) => {
    setMovieTitle(newSelectOption)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* we still need MovieDropdown to get access to movieTitle from the state
          both in read access and for changing its value */}
        <MovieDropdown
          // this is for reading the value from the state
          movieTitleProp={movieTitle}
          // this is for changing the value in the state
          changeMovieTitleProp={changeMovieTitle}
        />
        {/* MovieCard will go here! */}
        <Container>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6} className="text-dark">
              <MovieCard movieTitle={movieTitle} />
              {/* MovieCard gets from App.js the value of movieTitle
                from the state object in any given moment */}
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

export default App
