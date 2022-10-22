import * as React from "react";



interface Rating {
  averageRating: number;
  totalReviewCount: number;
}

function Rating({ averageRating, totalReviewCount }: Rating) {
  let counter = [];
  for (let i = 0; i < Math.round(averageRating ?? 0); i++) {
    counter.push(true);
  }

  return (
    <div>
      <span className="product-rating" style={{ fontSize: "2rem" }}>
        {averageRating ? Math.round(averageRating * 10) / 10 : 0}
      </span>
      <span>/5</span>
      <div className="stars">
        {counter.map(() => {
          return <i className="fa fa-star"></i>;
        })}
      </div>

      <div className="rating-text">
        <span>{totalReviewCount ? totalReviewCount : 0} reviews</span>
      </div>
    </div>
  );
}

export default Rating;
