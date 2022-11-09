import * as React from "react";
import Rating from "./Rating";
import Feed from "../../interfaces/Feed";
import { navigateToDetailedPage } from "../../../globalState/reducerActions";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../globalState/hooks";
import Tag from "../Tag";
import { selectFeedById } from "../../../globalState/reducerActions";

interface FeedCardProps {
  id: string;
}

function FeedCard(props: FeedCardProps) {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((state) => selectFeedById(state, props.id));

  return (
    <div
      className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-12"
      style={{ marginLeft: "1vw", marginRight: "1vw" }}
    >
      <Link
        to={`/feed/${feed?.id}`}
        onClick={() => {
          if (typeof feed !== "undefined")
            dispatch(
              navigateToDetailedPage({
                id: feed.id,
                name: feed.name,
                description: feed.description,
                configurations: feed.configurations,
                visibility: feed.visibility,
                tags: feed.tags,
                review: feed.review,
                creatorName: feed.creatorName,
                creatorId: feed.creatorId,
              })
            );
        }}
      >
        <div
          className="card custom-card"
          style={{
            width: "18rem",
            margin: "1.5rem 0.6rem",
            padding: "0",
            display: "inline-block",
            overflow: "hidden",
          }}
        >
          <div className="card-body" style={{ whiteSpace: "normal" }}>
            <div className="d-flex justify-content-between">
              <div style={{ color: "grey" }}>
                {feed ? feed?.creatorName : ""}
              </div>
              {/* {props.isMyCard && <div style={{ color: "grey" }}>{props.visiiblity}</div>} */}
            </div>
            <h5
              className="card-title"
              style={{
                fontSize: "1rem",
                flexGrow: "12",
              }}
            >
              {feed?.name}
            </h5>
            <div className="descriptionOnCard">
              {feed ? feed?.description : ""}
            </div>
            <div className="scrollable">
              {feed?.tags.map((tag, index) => {
                return <Tag text={tag} key={index} />;
              })}
            </div>

            <Rating
              averageRating={feed?.review.raiting ?? 0}
              totalReviewCount={feed?.review.comments.length ?? 0}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FeedCard;
