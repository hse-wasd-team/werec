import * as React from "react";
import Tag from "../subcomponents/Tag";
import Rating from "../subcomponents/cards/Rating";
import { useAppSelector, useAppDispatch } from "../../globalState/hooks";
import { deleteFeed } from "../../globalState/reducerActions";
import { Link } from "react-router-dom";
import { deleteApiFeed } from "../../globalState/api";

function DetailedPage() {
  const props = useAppSelector((state) => state.currentDetailedPage);
  const dispatch = useAppDispatch();
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "30px" }}>{props.name}</h1>
      <p>{props.description}</p>
      {/* {props.isMyCard && <p style={{ color: "grey" }}>{props.visiiblity}</p>} */}
      {props.tags.map((tag, id) => {
        return <Tag text={tag} key={id} />;
      })}
      <div style={{ margin: "30px" }}>
        <Rating
          averageRating={props.raiting.raiting / 2 ?? 0}
          totalReviewCount={props.raiting.comments.length ?? 0}
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn custom-button"
          style={{ margin: "20px 30px" }}
        >
          GET BOT
        </button>
        <Link to="/">
          <button
            type="button"
            className="btn custom-button"
            style={{ margin: "20px 30px" }}
            onClick={() => {
              // dispatch(deleteFeed(props.id))
              deleteApiFeed(props.id);
            }}
          >
            DELETE
          </button>
        </Link>

        <Link to={`/feed/configuration/edit/${props.id}`}>
          <button
            type="button"
            className="btn custom-button"
            style={{ margin: "20px 30px" }}
          >
            EDIT
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DetailedPage;
