import * as React from "react";
import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";
import Feed from "../../interfaces/Feed";
import { useAppSelector } from "../../../globalState/hooks";
import { Link } from "react-router-dom";
import { useGetAllFeedsQuery, getApiFeeds } from "../../../globalState/api";

interface CardGroup {
  isMyCards: boolean;
}

function CardGroup(props: CardGroup) {
  // const feeds = useAppSelector((state) => state.myFeeds);
  // let feeds: Feed[] = []
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    fetch("/api/v1/feeds")
      .then((response) => response.json())
      .then((responseFeeds) => {
        setFeeds(responseFeeds);
      });
  });

  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center"
        style={{ textAlign: "center" }}
      >
        {feeds.map((el, ind) => {
          return (
            <FeedCard
              id={el.id}
              key={ind}
              name={el.name}
              description={el.description}
              configurations={el.configurations}
              visibility={el.visibility}
              tags={el.tags}
              review={el.review}
              creatorName={el.creatorName}
              creatorId={el.creatorId}
            />
          );
        })}
      </div>
      <Link to={`/feed/configuration/add`}>
        <button
          className="custom-round-button"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "3vw",
            zIndex: "7",
          }}
        >
          +
        </button>
      </Link>
    </div>
  );
}

export default CardGroup;
