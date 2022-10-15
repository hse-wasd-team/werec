import * as React from "react";
import Rating from "./Rating";
import Feed from "../../interfaces/Feed";
import { navigateToDetailedPage } from "../../../globalState/reducerActions";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../globalState/hooks";
import Tag from "../Tag";

function FoodCard(props: Feed) {
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
              title: props.title,
              // author: props.author,
              // averageRating: props.averageRating,
              // totalReviewCount: props.totalReviewCount,
              description: props.description,
              // numberOfVideosPerRequest: props.numberOfVideosPerRequest,
              keywords: props.keywords,
              // sourceLinks: props.sourceLinks
              // visiiblity: props.visiiblity,
              // tags: props.tags,
              // isMyCard: props.isMyCard
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
            {/* <div className="d-flex justify-content-between">
              <div style={{ color: "grey" }}>{props.author}</div>
              {props.isMyCard && <div style={{ color: "grey" }}>{props.visiiblity}</div>}
            </div> */}
            <h5
              className="card-title"
              style={{
                // height: "2rem",
                fontSize: "1rem",
                flexGrow: "12",
              }}
            >
              {props.title}
            </h5>
            {/* <div className="scrollable">
              {props.tags.map((tag, index) => {
                return <Tag text={tag} key={index} />;
              })}
            </div>

            <Rating
              averageRating={props.averageRating ?? 0}
              totalReviewCount={props.totalReviewCount ?? 0}
            /> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FoodCard;
