import * as React from "react";
import FoodCard from "./FoodCard";
import { useState } from "react";
import Feed from "../../interfaces/Feed";
import { useAppSelector } from "../../../globalState/hooks";
import { Link } from "react-router-dom";

interface CardGroup {
  isMyCards: boolean;
}

function CardGroup(props: CardGroup) {
  const feeds = useAppSelector((state) => state.myFeeds);
  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center"
        style={{ textAlign: "center" }}
      >
        {feeds.map((el, ind) => {
          return (
            <FoodCard
              id={ind}
              key={ind}
              title={el.title}
              description={el.description}
              // numberOfVideosPerRequest={el.numberOfVideosPerRequest}
              keywords={el.keywords}
              // sourceLinks={el.sourceLinks}
            />
          );
        })}
      </div>
      <Link to={`/feed/configuration/add`}>
        <button
          className="custom-round-button"
          style={{ position: "absolute", bottom: "80px", right: "3vw", zIndex: "7" }}
        >
          +
        </button>
      </Link>
    </div>
  );
}

export default CardGroup;
