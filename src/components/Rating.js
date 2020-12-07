import React from "react";

import Filter from "./Filter";

const Rating = ({ sortAsc, sortDesc, ratingRange, setRatingRange }) => {
  return (
    <div className="menuside-control d-flex">
      <ul className="menu">
        <Filter
          sortAsc={sortAsc}
          sortDesc={sortDesc}
          ratingRange={ratingRange}
          setRatingRange={setRatingRange}
        />
      </ul>
    </div>
  );
};

export default Rating;
