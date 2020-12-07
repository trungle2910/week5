import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apiService";
import { Card, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DetailPage = () => {
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);

  const [showTrailer, setShowTrailer] = useState(false);

  const params = useParams();
  const MOVIE_ID = params.id;
  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const getMovieDetailData = async (movieId) => {
    const API_URL = `${process.env.REACT_APP_URL}/movie/${movieId}?${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const handleOpenTrailer = () => {
    setShowTrailer(true);
  };

  useEffect(() => {
    if (isLoading) {
      const getMovieDetail = async () => {
        try {
          setIsLoading(true);
          const movie = await getMovieDetailData(MOVIE_ID);
          console.log(movie);
          setMovieDetail(movie);
          setIsLoading(false);
        } catch (error) {
          window.alert("not found");
        }
      };
      const getTrailer = async () => {
        try {
          setIsLoading(true);
          let res = await api.get(
            `/movie/${MOVIE_ID}/videos?${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
          );
          setMovieTrailer(res.data.results);
          //
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      getMovieDetail();
      getTrailer();
    } else {
      const getReview = async () => {
        try {
          setIsLoading(true);
          let res = await api.get(
            `/movie/${MOVIE_ID}/reviews?${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
          );
          setReviewList(res.data.results);
          setIsLoading(false);
        } catch (error) {
          console.log("Not found");
        }
      };
      getReview();
    }
  }, [MOVIE_ID]);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <div className="control-detailpage">
        <div className="nav-bar-1"></div>

        <section className="all-in">
          <div className="Detail-film d-flex">
            <div className="col-6 photo">
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_IMAGE}${movieDetail.poster_path}`}
              />
            </div>
            <div className="col-6 infor">
              <span className="type-film">{movieDetail.genres[0].name}</span>
              <div className="movie-title">
                <h1>{movieDetail.original_title}</h1>
                <h4>{movieDetail.tagline}</h4>
              </div>
              <div className="d-flex control">
                <div>
                  <span class="imb-score">{movieDetail.vote_average}</span>
                </div>
                <div>
                  <span class="imb-score-1">{movieDetail.popularity}</span>
                </div>
              </div>
              <div className="text-group">
                <p>
                  <b>Release Date: </b>
                  {movieDetail.release_date}
                </p>
                <p>
                  <b>Time remaining: </b>
                  {movieDetail.runtime} minutes
                </p>
                <p>
                  <b>Languages: </b>
                  {movieDetail.spoken_languages[0].english_name}
                </p>
              </div>
              <div className="control-fav-list">
                <Button className="button-trailer" onClick={handleOpenTrailer}>
                  Trailer
                </Button>
              </div>
              <section className="cmt">
                <div className="overview">
                  <h2>Overview</h2>
                  <p>{movieDetail.overview}</p>
                </div>
                <div className="comment-review">
                  <h2>Review ({reviewList.length})</h2>
                  {reviewList.map((review) => (
                    <div>
                      <h2>{review.author_details.username}</h2>
                      <p>{review.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <Modal show={showTrailer} size="xl" onHide={handleCloseTrailer}>
        <Modal.Header closeButton>
          <Modal.Title>{movieDetail.original_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieTrailer ? (
            <iframe
              src={`${process.env.REACT_APP_VIDEO}${movieTrailer[0].key}`}
              width="100%"
              height="900"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          ) : (
            <p>No Trailer Found For This Movie</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTrailer}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailPage;
