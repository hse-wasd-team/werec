import * as React from "react";
import FoodCard from "./FoodCard";
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
    fetch("/api/v1/feed")
      .then((response) => response.json())
      .then((responseFeeds) => {
        setFeeds(responseFeeds);
      });
  }, []);

  // const response = useGetAllFeedsQuery(0);
  // response.refetch()

  // if (response.isSuccess) {
  // const responseFeeds = response.data;
  // for (let i = 0; i < responseFeeds.length; i++) {
  //   const element = responseFeeds[i];

  //   feeds.push({
  //     id: element.id,
  //     name: element.name,
  //     description: element.description,
  //     visiiblity: element.visiiblity,
  //     tags: element.tags,
  //     configurations: element.configurations
  //   });
  // }
  // }
  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center"
        style={{ textAlign: "center" }}
      >
        {feeds.map((el, ind) => {
          return (
            <FoodCard
              id={el.id}
              key={ind}
              name={el.name}
              description={el.description}
              configurations={el.configurations}
              visiiblity={el.visiiblity}
              tags={el.tags}
            />
          );
        })}
      </div>
      <Link to={`/feed/configuration/add`}>
        <button
          className="custom-round-button"
          style={{
            position: "absolute",
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
