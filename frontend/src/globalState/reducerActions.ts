import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { NavbarItemsNames, TabItemsNames } from "../resources/strings";
import { RootState } from "./store";
import Feed from "../components/interfaces/Feed";

// Thunk functions
export const getAllApiFeeds = createAsyncThunk(
  "feeds/getAllApiFeeds",
  async () => {
    const response = await fetch("/api/v1/feeds", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(`This is getAllFeeds: status is ${response.status}`);

    const result = await response.json();
    return result;
  }
);
export const createApiFeed = createAsyncThunk(
  "feeds/createApiFeed",
  async (feed: Feed) => {
    const feedJSON = JSON.stringify(feed);

    const response = await fetch("/api/v1/feeds", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: feedJSON,
    });

    console.log(`This is createFeed: status is ${response.status}`);

    const result = await response.json();

    console.log("result is: ", JSON.stringify(result, null, 4));
    return feed;
  }
);
export const deleteApiFeed = createAsyncThunk(
  "feeds/deleteApiFeed",
  async (feedID: string) => {
    const response = await fetch(`/api/v1/feeds/${feedID}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
      },
    });

    console.log(`This is deleteApiFeed: status is ${response.status}`);
    return feedID;
  }
);
export const editApiFeed = createAsyncThunk(
  "feeds/editApiFeed",
  async (feed: Feed) => {
    const feedJSON = JSON.stringify(feed);

    const response = await fetch(`/api/v1/feeds/${feed.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: feedJSON,
    });

    console.log(`This is editApiFeed: status is ${response.status}`);

    const result = await response.json();

    console.log("result is: ", JSON.stringify(result, null, 4));
    return feed;
  }
);

// Navigation
const currentNavbarItem = createSlice({
  name: "currentNavbarItem",
  initialState: { id: NavbarItemsNames.HOME },
  reducers: {
    navigateNavbar(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

const currentTabItem = createSlice({
  name: "currentTabItem",
  initialState: { id: TabItemsNames[0] },
  reducers: {
    navigateTab(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

var initialState: Feed = {
  name: "title",
  description: "",
  configurations: [],
  visibility: "public",
  tags: [],
  review: { raiting: 0, comments: [] },
  id: "",
  creatorName: "",
  creatorId: "",
};

const currentDetailedPage = createSlice({
  name: "currentDetailedPage",
  initialState,
  reducers: {
    navigateToDetailedPage(state, action: PayloadAction<Feed>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.creatorName = action.payload.creatorName;
      state.creatorId = action.payload.creatorId;
      state.description = action.payload.description;
      state.configurations = action.payload.configurations;

      state.tags = action.payload.tags;
      state.visibility = action.payload.visibility;
      state.review = action.payload.review;
      // state.isMyCard = action.payload.isMyCard
    },
  },
});
// Feeds
const feedAdapter = createEntityAdapter<Feed>({ selectId: (feed) => feed.id });
var initialStateMyFeeds = feedAdapter.getInitialState({ status: "idle" });

const myFeeds = createSlice({
  name: "myFeeds",
  initialState: initialStateMyFeeds,
  reducers: {
    // addFeed(state, action: PayloadAction<Feed>) {
    //   state.push(action.payload);
    // },
    // editFeed(state, action: PayloadAction<Feed>) {
    //   const ind = state.findIndex((feed) => feed.id === action.payload.id);
    //   state[ind].description = action.payload.description;
    //   state[ind].configurations = action.payload.configurations;
    //   state[ind].name = action.payload.name;
    //   state[ind].id = action.payload.id;
    //   state[ind].tags = action.payload.tags;
    //   state[ind].visibility = action.payload.visibility;
    //   state[ind].review = action.payload.review;
    // },
    // deleteFeed(state, action: PayloadAction<string>) {
    //   const ind = state.findIndex((feed) => feed.id === action.payload);
    //   state.splice(ind, 1);
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getAllApiFeeds.fulfilled,
        (state, action: PayloadAction<Feed[]>) => {
          state.status = "succeeded";
          // feedAdapter.upsertMany(state, action.payload);
          feedAdapter.setMany(state, action.payload);
        }
      )
      .addCase(editApiFeed.fulfilled, (state, action: PayloadAction<Feed>) => {
        state.status = "succeeded";
        // state.entities[action.payload.id] = action.payload;
        // feedAdapter.setOne(state, action.payload);
      })
      .addCase(
        createApiFeed.fulfilled,
        (state, action: PayloadAction<Feed>) => {
          state.status = "succeeded";
          // feedAdapter.addOne(state, action.payload);
          // state.entities[action.payload.id] = action.payload;
        }
      )
      .addCase(
        deleteApiFeed.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          feedAdapter.removeOne(state, action.payload);
        }
      )

      .addCase(getAllApiFeeds.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editApiFeed.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createApiFeed.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteApiFeed.pending, (state) => {
        state.status = "pending";
      });
  },
});

// export const {navigateToFeed} = currentFeed.actions
export const { navigateToDetailedPage } = currentDetailedPage.actions;
export const { navigateNavbar } = currentNavbarItem.actions;
export const { navigateTab } = currentTabItem.actions;

// export const { addFeed, editFeed, deleteFeed } = myFeeds.actions;

// export const currentFeedReducer = currentFeed.reducer
// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllFeeds,
  selectById: selectFeedById,
  selectIds: selectFeedIds,
  // Pass in a selector that returns the posts slice of state
} = feedAdapter.getSelectors<RootState>((state) => state.myFeeds);
export const myFeedsReducer = myFeeds.reducer;
export const currentNavbarItemReducer = currentNavbarItem.reducer;
export const currentTabItemReducer = currentTabItem.reducer;
export const currentDetailedPageReducer = currentDetailedPage.reducer;

export const currentNavbarID = (state: RootState) => state.currentNavbarItem.id;
