import * as React from "react";
import Rating from "./Rating";
import Feed from "../../interfaces/Feed";
import { navigateToDetailedPage } from "../../../globalState/reducerActions";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../globalState/hooks";
import Tag from "../Tag";

function FeedCard(props: Feed) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-12"
      style={{ marginLeft: "1vw", marginRight: "1vw" }}
    >
      <Link
        to={`/feed/${props.id}`}
        onClick={() =>
          dispatch(
            navigateToDetailedPage({
              id: props.id,
              name: props.name,
              // author: props.author,
              // averageRating: props.averageRating,
              // totalReviewCount: props.totalReviewCount,
              description: props.description,
              configurations: props.configurations,
              visibility: props.visibility,
              tags: props.tags,
              review: props.review,
              creatorName: props.creatorName,
              creatorId: props.creatorId,
            })
          )
        }
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
              <div style={{ color: "grey" }}>{props.creatorName}</div>
              {/* {props.isMyCard && <div style={{ color: "grey" }}>{props.visiiblity}</div>} */}
            </div>
            <h5
              className="card-title"
              style={{
                fontSize: "1rem",
                flexGrow: "12",
              }}
            >
              {props.name}
            </h5>
            <div className="descriptionOnCard">{props.description}</div>
            <div className="scrollable">
              {props.tags.map((tag, index) => {
                return <Tag text={tag} key={index} />;
              })}
            </div>

            <Rating
              averageRating={props.review.raiting ?? 0}
              totalReviewCount={props.review.comments.length ?? 0}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FeedCard;
