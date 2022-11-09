import * as React from "react";
import { useAppSelector, useAppDispatch } from "../../globalState/hooks";
import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import Feed, { Configuration } from "../interfaces/Feed";
// import { editApiFeed, createApiFeed } from "../../globalState/api";
import { TagsInput } from "react-tag-input-component";
import {
  editApiFeed,
  createApiFeed,
  getAllApiFeeds,
} from "../../globalState/reducerActions";

interface ConfigurationPage {
  action: "add" | "edit";
}

function ConfigurationPage(props: ConfigurationPage) {
  const data = useAppSelector((state) => state.currentDetailedPage);
  const myFeeds = useAppSelector((state) => state.myFeeds);
  const navigate = useNavigate();
  const id = useId();

  const dispatch = useAppDispatch();

  const [configurations, setConfigurations] = useState<Configuration[]>(
    props.action === "add" ? [] : data.configurations
  );
  const [name, setName] = useState(props.action === "add" ? "" : data.name);
  const [description, setDescription] = useState(
    props.action === "add" ? "" : data.description
  );
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedConfigurationIndex, setSelectedConfigurationIndex] =
    useState(0);

  const [sources, setSources] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [isOnMainPage, setIsOnMainPage] = useState(true);
  const [tags, setTags] = useState<string[]>(
    props.action === "add" ? [] : data.tags
  );

  function togglePage() {
    setIsOnMainPage(!isOnMainPage);
  }
  function onChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }
  function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function onChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }
  function onChangeSource(event: React.ChangeEvent<HTMLInputElement>) {
    setSource(event.target.value);
  }
  function onChangeConfiguration(event: React.ChangeEvent<HTMLInputElement>) {
    setConfiguration(event.target.value);
  }

  function addConfiguration() {
    const ind = configurations.length;
    if (configuration.length === 0) {
      alert("link should not be empty!");
      return;
    }
    configurations.forEach((item) => {
      if (item.keyword === configuration) {
        alert("Don't add the same link");
        return;
      }
    });
    if (configurations.length > 0) {
      setConfigurations((prevKeywords) => [
        ...prevKeywords,
        { keyword: configuration, quantity: 0, sources: [], mode: 0, id: "" },
      ]);
    } else {
      setConfigurations([
        { keyword: configuration, quantity: 0, sources: [], mode: 0, id: "" },
      ]);
    }
    setConfiguration("");
    setSelectedConfigurationIndex(ind);
    setQuantity(0);
    setSources([]);
    togglePage();
  }

  function deleteConfiguration(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) {
    const index = Number((e.target as HTMLButtonElement).id);
    setConfigurations((prevKeywords) => [
      ...prevKeywords.slice(0, index),
      ...prevKeywords.slice(index + 1),
    ]);
  }
  function editConfiguration(keyword: Configuration, index: number) {
    setConfigurations([
      ...configurations.slice(0, index),
      keyword,
      ...configurations.slice(index + 1),
    ]);
  }
  function addSource() {
    if (source.length === 0) {
      alert("link should not be empty!");
      return;
    }
    if (sources.includes(source)) {
      alert("Don't add the same link");
      return;
    }

    if (sources.length > 0) {
      setSources((prevLinks) => [...prevLinks, source]);
    } else {
      setSources([source]);
    }
    setSource("");
  }

  function deleteSource(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const index = Number((e.target as HTMLButtonElement).id);
    setSources([...sources.slice(0, index), ...sources.slice(index + 1)]);
  }

  function saveFeed() {
    if (
      name.length === 0 ||
      description.length === 0 ||
      configurations.length === 0 ||
      tags.length === 0
    ) {
      alert("Fill out all the required fields");
      return;
    }

    if (props.action === "add") {
      const feed: Feed = {
        id: "",
        name: name,
        description: description,
        configurations: configurations,
        visibility: 0,
        tags: tags,
        review: { raiting: 0, comments: [] },
        creatorName: "",
        creatorId: "",
      };
      dispatch(createApiFeed(feed));
      dispatch(getAllApiFeeds());
      // createApiFeed(feed);
    } else if (props.action === "edit") {
      const feed: Feed = {
        id: data.id,
        name: name,
        description: description,
        configurations: configurations,
        visibility: 0,
        tags: tags,
        review: { raiting: 0, comments: [] },
        creatorName: "",
        creatorId: "",
      };
      dispatch(editApiFeed(feed));
      dispatch(getAllApiFeeds());
      // editApiFeed(feed);
    }
    navigate("/");
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <div>
      <div
        className="container"
        style={{
          textAlign: "center",
          display: isOnMainPage ? "block" : "none",
        }}
      >
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
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={onChangeName}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows={4}
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tags"
                placeHolder="enter tags"
              />

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
                onClick={saveFeed}
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
                  value={configuration}
                  onChange={onChangeConfiguration}
                />
              </div>
              <button
                type="submit"
                className="btn custom-button"
                style={{ margin: "20px 0" }}
                onClick={addConfiguration}
              >
                ADD
              </button>
            </form>
            <h2>Configurations</h2>
            <form
              style={{ textAlign: "left" }}
              onSubmit={(e) => submitHandler(e)}
            >
              {configurations.map((item, ind) => {
                return (
                  <div className="mb-3 d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png?w=360"
                      width="22px"
                      style={{ margin: "0px 10px" }}
                      alt="img"
                      id={ind + ""}
                      onClick={(e) => deleteConfiguration(e)}
                    />
                    <div
                      style={{ borderBottom: "1px solid rgb(50, 191, 243)" }}
                      onClick={() => {
                        setSelectedConfigurationIndex(ind);
                        setQuantity(item.quantity);
                        setSources(item.sources);
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
      <div
        className="container"
        style={{
          textAlign: "center",
          display: !isOnMainPage ? "block" : "none",
        }}
      >
        <h1>Edit configuration</h1>
        <form style={{ textAlign: "left" }} onSubmit={(e) => submitHandler(e)}>
          <div className="mb-3">
            <label htmlFor="numberOfRequests" className="form-label">
              Number of requests per video
            </label>
            <input
              type="number"
              className="form-control"
              id="numberOfRequests"
              name="numberOfRequests"
              onChange={onChangeNumber}
              value={quantity}
            />
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
              value={source}
              onChange={onChangeSource}
            />
          </div>
          <button
            type="submit"
            className="btn custom-button"
            style={{ margin: "20px 0" }}
            onClick={addSource}
          >
            ADD
          </button>
        </form>
        <h2>sources</h2>
        <form style={{ textAlign: "left" }} onSubmit={(e) => submitHandler(e)}>
          {sources.map((item, ind) => {
            return (
              <div className="mb-3 d-flex">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png?w=360"
                  width="22px"
                  style={{ margin: "0px 10px" }}
                  alt="img"
                  id={ind + ""}
                  onClick={(e) => deleteSource(e)}
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
              if (quantity === 0 || sources.length === 0) {
                alert("Fill out all the fields");
                return;
              }
              const newKeyword: Configuration = {
                keyword: configurations[selectedConfigurationIndex].keyword,
                quantity: quantity,
                sources: sources,
                mode: 0,
                id: id,
              };

              editConfiguration(newKeyword, selectedConfigurationIndex);
              togglePage();
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
