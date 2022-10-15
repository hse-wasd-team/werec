import * as React from "react";
import { useAppSelector, useAppDispatch } from "../../globalState/hooks";
import { addFeed, editFeed } from "../../globalState/reducerActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Keyword } from "../interfaces/Feed";

interface ConfigurationPage {
  action: "add" | "edit";
}

function ConfigurationPage(props: ConfigurationPage) {
  const data = useAppSelector((state) => state.currentDetailedPage);
  const myFeeds = useAppSelector((state) => state.myFeeds);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [keywords, setKeywords] = useState<Keyword[]>(
    props.action === "add" ? [] : data.keywords
  );
  const [name, setName] = useState(props.action === "add" ? "" : data.title);
  const [description, setDescription] = useState(
    props.action === "add" ? "" : data.description
  );
  const [numberOfVideosPerRequest, setNumberOfVideosPerRequest] = useState<number>(0);
  const [selectedKeywordIndex, setSelectedKeywordIndex] = useState(0);

  const [sourceLinks, setSourceLinks] = useState<string[]>([]);
  const [sourceLink, setSourceLInk] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isOnMainPage, setIsOnMainPage] = useState(true);

  function togglePage() {
    setIsOnMainPage(!isOnMainPage);
  }
  function onChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setNumberOfVideosPerRequest(Number(event.target.value));
  }
  function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function onChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }
  function onChangeSourceLink(event: React.ChangeEvent<HTMLInputElement>) {
    setSourceLInk(event.target.value);
  }
  function onChangeKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function addKeyword() {
    const ind = keywords.length
    if (keyword.length === 0) {
      alert("link should not be empty!");
      return;
    }
    keywords.forEach((item) => {
      if (item.keyword === keyword) {
        alert("Don't add the same link");
        return;
      }
    });
    if (keywords.length > 0) {
      setKeywords(prevKeywords => [
        ...prevKeywords,
        { keyword: keyword, numberOfVideosPerRequest: 0, sourceLinks: [] },
      ]);
    } else {
      setKeywords([
        { keyword: keyword, numberOfVideosPerRequest: 0, sourceLinks: [] },
      ]);
    }
    setKeyword("");
    setSelectedKeywordIndex(ind)
    setNumberOfVideosPerRequest(0)
    setSourceLinks([])
    togglePage();
  }

  function deleteKeyword(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const index = Number((e.target as HTMLButtonElement).id);
    setKeywords(prevKeywords => [...prevKeywords.slice(0, index), ...prevKeywords.slice(index + 1)]);
  }
  function editKeyword(keyword: Keyword, index: number) {
    setKeywords([
      ...keywords.slice(0, index),
      keyword,
      ...keywords.slice(index + 1),
    ]);
  }
  function addSourceLink() {
    if (sourceLink.length === 0) {
      alert("link should not be empty!");
      return;
    }
    if (sourceLinks.includes(sourceLink)) {
      alert("Don't add the same link");
      return;
    }

    if (sourceLinks.length > 0) {
      setSourceLinks(prevLinks =>  [...prevLinks, sourceLink]);
    } else {
      setSourceLinks([sourceLink]);
    }
    setSourceLInk("");
  }

  function deleteSourceLink(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const index = Number((e.target as HTMLButtonElement).id);
    setSourceLinks([
      ...sourceLinks.slice(0, index),
      ...sourceLinks.slice(index + 1),
    ]);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
    return (
      <div>
          <div className="container" style={{ textAlign: "center", display: isOnMainPage ? "block" : "none" }}>
        <h1>Configure your feed</h1>
        <div className="row">
          <div className="col">
            <h2>Parameters</h2>
            {/* <form style={{ textAlign: "left" }}>
              <div className="mb-3">
                <label htmlFor="importSource" className="form-label">
                  Import source
                </label>
                <input type="text" className="form-control" id="importSource" />
              </div>
              <button
                type="submit"
                className="btn custom-button"
                style={{ margin: "20px 0" }}
              >
                IMPORT
              </button>
            </form> */}
            <form
              style={{ textAlign: "left" }}
              onSubmit={(e) => submitHandler(e)}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                {props.action === "edit" ? (
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={onChangeName}
                    value={name}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={onChangeName}
                    value={name}
                  />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                {props.action === "edit" ? (
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={4}
                    value={description}
                    onChange={onChangeDescription}
                  />
                ) : (
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={4}
                    onChange={onChangeDescription}
                    value={description}
                  />
                )}
              </div>
              
              {/* <div className="mb-3">
                <label htmlFor="visibility" className="form-label">
                  Visibility
                </label>
                <select className="form-select" id="visibility" name="visibility">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div> */}

              <button
                type="submit"
                className="btn custom-button"
                style={{ margin: "20px 0" }}
                onClick={() => {
                  if (
                    name.length === 0 ||
                    description.length === 0 ||
                    keywords.length === 0
                  ) {
                    alert("Fill out all the required fields");
                    return;
                  }

                  if (props.action === "add") {
                    dispatch(
                      addFeed({
                        id: myFeeds.length,
                        title: name,
                        description: description,
                        keywords: keywords,
                      })
                    );
                  } else if (props.action === "edit") {
                    dispatch(
                      editFeed({
                        id: data.id,
                        title: name,
                        description: description,
                        keywords: keywords,
                      })
                    );
                  }
                  navigate("/");
                }}
              >
                SAVE
              </button>
            </form>
          </div>

          <div className="col">
            <h2>Add configuration</h2>
            <form
              style={{ textAlign: "left" }}
              onSubmit={(e) => submitHandler(e)}
            >
              <div className="mb-3">
                <label htmlFor="source" className="form-label">
                  configuration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="source"
                  name="source"
                  value={keyword}
                  onChange={onChangeKeyword}
                />
              </div>
              <button
                type="submit"
                className="btn custom-button"
                style={{ margin: "20px 0" }}
                onClick={addKeyword}
              >
                ADD
              </button>
            </form>
            <h2>Configurations</h2>
            <form
              style={{ textAlign: "left" }}
              onSubmit={(e) => submitHandler(e)}
            >
              {keywords.map((item, ind) => {
                return (
                  <div className="mb-3 d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png?w=360"
                      width="22px"
                      style={{ margin: "0px 10px" }}
                      alt="img"
                      id={ind + ""}
                      onClick={(e) => deleteKeyword(e)}
                    />
                    <div
                      style={{ borderBottom: "1px solid rgb(50, 191, 243)" }}
                      onClick={() => {
                        setSelectedKeywordIndex(ind)
                        setNumberOfVideosPerRequest(item.numberOfVideosPerRequest)
                        setSourceLinks(item.sourceLinks)
                        togglePage();
                      }}
                    >
                      {item.keyword}
                    </div>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
      </div>
      <div className="container" style={{ textAlign: "center", display: !isOnMainPage ? "block" : "none" }}>
        <h1>Edit configuration</h1>
        <form style={{ textAlign: "left" }} onSubmit={(e) => submitHandler(e)}>
          <div className="mb-3">
            <label htmlFor="numberOfRequests" className="form-label">
              Number of requests per video
            </label>
            {props.action === "edit" ? (
              <input
                type="number"
                className="form-control"
                id="numberOfRequests"
                name="numberOfRequests"
                value={numberOfVideosPerRequest}
                onChange={onChangeNumber}
              />
            ) : (
              <input
                type="number"
                className="form-control"
                id="numberOfRequests"
                name="numberOfRequests"
                onChange={onChangeNumber}
                value={numberOfVideosPerRequest}
              />
            )}
          </div>
        </form>
        <h2>Add source</h2>
        <form style={{ textAlign: "left" }} onSubmit={(e) => submitHandler(e)}>
          <div className="mb-3">
            <label htmlFor="source" className="form-label">
              source
            </label>
            <input
              type="text"
              className="form-control"
              id="source"
              name="source"
              value={sourceLink}
              onChange={onChangeSourceLink}
            />
          </div>
          <button
            type="submit"
            className="btn custom-button"
            style={{ margin: "20px 0" }}
            onClick={addSourceLink}
          >
            ADD
          </button>
        </form>
        <h2>sources</h2>
        <form style={{ textAlign: "left" }} onSubmit={(e) => submitHandler(e)}>
          {sourceLinks.map((item, ind) => {
            return (
              <div className="mb-3 d-flex">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png?w=360"
                  width="22px"
                  style={{ margin: "0px 10px" }}
                  alt="img"
                  id={ind + ""}
                  onClick={(e) => deleteSourceLink(e)}
                />
                <div style={{ borderBottom: "1px solid rgb(50, 191, 243)" }}>
                  {item}
                </div>
              </div>
            );
          })}
          <button
            type="submit"
            className="btn custom-button"
            style={{ margin: "20px 0" }}
            onClick={() => {
              if(numberOfVideosPerRequest === 0 || sourceLinks.length === 0 ){
                alert("Fill out all the fields")
                return
              }
              const newKeyword: Keyword = {
                keyword: keywords[selectedKeywordIndex].keyword,
                numberOfVideosPerRequest: numberOfVideosPerRequest,
                sourceLinks: sourceLinks
              };
              
              editKeyword(newKeyword, selectedKeywordIndex);
              togglePage()
            }}
          >
            SAVE
          </button>
        </form>
      </div>
      </div>
    );
}

export default ConfigurationPage;
