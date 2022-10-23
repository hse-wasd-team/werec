import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavbarItemsNames, TabItemsNames } from "../resources/strings";
import { RootState } from "./store";
import Feed from "../components/interfaces/Feed";

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
  id: "0",
  name: "title",
  description: "",
  configurations: [],
  visiiblity: "public",
  tags: [],
  raiting: { raiting: 0, comments: [] },
};

const currentDetailedPage = createSlice({
  name: "currentDetailedPage",
  initialState,
  reducers: {
    navigateToDetailedPage(state, action: PayloadAction<Feed>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      // state.author = action.payload.author
      // state.averageRating = action.payload.averageRating
      // state.totalReviewCount = action.payload.totalReviewCount
      state.description = action.payload.description;
      state.configurations = action.payload.configurations;

      state.tags = action.payload.tags;
      state.visiiblity = action.payload.visiiblity;
      state.raiting = action.payload.raiting;
      // state.isMyCard = action.payload.isMyCard
    },
  },
});
var initialStateMyFeeds: Feed[] = [];

const myFeeds = createSlice({
  name: "myFeeds",
  initialState: initialStateMyFeeds,
  reducers: {
    addFeed(state, action: PayloadAction<Feed>) {
      state.push(action.payload);
    },
    editFeed(state, action: PayloadAction<Feed>) {
      const ind = state.findIndex((feed) => feed.id === action.payload.id);
      state[ind].description = action.payload.description;
      state[ind].configurations = action.payload.configurations;
      state[ind].name = action.payload.name;
      state[ind].id = action.payload.id;
      state[ind].tags = action.payload.tags;
      state[ind].visiiblity = action.payload.visiiblity;
      state[ind].raiting = action.payload.raiting;
    },
    deleteFeed(state, action: PayloadAction<string>) {
      const ind = state.findIndex((feed) => feed.id === action.payload);
      state.splice(ind, 1);
    },
  },
});

// export const {navigateToFeed} = currentFeed.actions
export const { navigateToDetailedPage } = currentDetailedPage.actions;
export const { navigateNavbar } = currentNavbarItem.actions;
export const { navigateTab } = currentTabItem.actions;
export const { addFeed, editFeed, deleteFeed } = myFeeds.actions;

// export const currentFeedReducer = currentFeed.reducer
export const myFeedsReducer = myFeeds.reducer;
export const currentNavbarItemReducer = currentNavbarItem.reducer;
export const currentTabItemReducer = currentTabItem.reducer;
export const currentDetailedPageReducer = currentDetailedPage.reducer;

export const currentNavbarID = (state: RootState) => state.currentNavbarItem.id;
