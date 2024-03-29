import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../apiService";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchFrom";

const PopularPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [movieList, setMovieList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const history = useHistory();
  const totalPage = 20;

  const handleClickMovie = (movieID) => {
    history.push(`/movies/${movieID}`);
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let url = `/movie/popular?page=${pageNum}`;
        if (query) {
          url = `/search/movie?language=en-US&page=1&query=${query}`;
        }
        let res = await api.get(url);
        setMovieList(res.data.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, [pageNum, query]);
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_IMAGE}${
              movieList.length >= 3 ? movieList[0].poster_path : false
            }`}
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_IMAGE}${
              movieList.length >= 3 ? movieList[1].poster_path : false
            }`}
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_IMAGE}${
              movieList.length >= 3 ? movieList[3].poster_path : false
            }`}
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <SearchForm
        className={{}}
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchInputChange}
        handleSubmit={handleSubmit}
      />
      <div>
        <Row>
          <Col style={{ marginRight: "10%", marginLeft: "10%" }}>
            <div className="d-flex justify-content-around flex-wrap">
              {movieList.map((movie) => {
                return (
                  <Card
                    style={{ width: "27%", margin: "20px" }}
                    onClick={() => handleClickMovie(movie.id)}
                  >
                    <Card.Img
                      variant="top"
                      src={`${process.env.REACT_APP_IMAGE}${movie.poster_path}`}
                    />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>Scores: {movie.vote_average}</Card.Text>
                      <Card.Text>Visited: {movie.popularity}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
      <PaginationBar
        pageNum={pageNum}
        totalPageNum={totalPage}
        setPageNum={setPageNum}
      />
    </>
  );
};

export default PopularPage;
