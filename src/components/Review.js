import React from 'react';

const Review = ({ review, name }) => {

  return (
    <div>
      <h6>{review}</h6>
      <p>{name}</p>
    </div>
  );
};

export default Review;