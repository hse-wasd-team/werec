import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavbarItemsNames, TabItemsNames } from '../resources/strings';
import {RootState} from "./store"
import Feed from '../components/interfaces/Feed';



const currentNavbarItem = createSlice({
    name:'currentNavbarItem',
    initialState: {id: NavbarItemsNames.HOME},
    reducers: {
        navigateNavbar(state,action: PayloadAction<string>){
            state.id = action.payload
        }
    }
})

const currentTabItem = createSlice({
    name: 'currentTabItem',
    initialState: {id: TabItemsNames[0]},
    reducers: {
        navigateTab(state, action: PayloadAction<string>){
            state.id = action.payload
        }
    }
})



var initialState: Feed = {
    id: 0,
    title: 'title',
    description: '',
    keywords: []
}


const currentDetailedPage = createSlice({
    name: 'currentDetailedPage',
    initialState,
    reducers: {
        navigateToDetailedPage(state, action: PayloadAction<Feed>){
            state.id = action.payload.id
            state.title = action.payload.title
            // state.author = action.payload.author
            // state.averageRating = action.payload.averageRating
            // state.totalReviewCount = action.payload.totalReviewCount
            state.description = action.payload.description
            // state.numberOfVideosPerRequest = action.payload.numberOfVideosPerRequest
            // state.sourceLinks = action.payload.sourceLinks
            state.keywords = action.payload.keywords
    
            // state.tags = action.payload.tags
            // state.visiiblity = action.payload.visiiblity
            // state.isMyCard = action.payload.isMyCard
        }
    }
})
var initialStateMyFeeds: Feed[] = []

const myFeeds = createSlice({
    name: "myFeeds",
    initialState: initialStateMyFeeds,
      reducers: {
        addFeed(state, action: PayloadAction<Feed>){
            state.push(action.payload)
        },
        editFeed(state, action: PayloadAction<Feed>){
            const ind = state.findIndex(feed => feed.id === action.payload.id)
            state[ind].description = action.payload.description
            state[ind].keywords = action.payload.keywords
            // state[ind].numberOfVideosPerRequest = action.payload.numberOfVideosPerRequest
            // state[ind].sourceLinks = action.payload.sourceLinks
            state[ind].title = action.payload.title
            state[ind].id = action.payload.id
        },
        deleteFeed(state, action: PayloadAction<number>){
            const ind = state.findIndex(feed => feed.id === action.payload)
            state.splice(ind,1)

        }
      }

      
})


// const currentFeed = createSlice({
//     name: "currentFeed",
//     initialState: {useQuery: () => api.useGetPopularPostsQuery, header: "", tag: ""},
//     reducers:{
//         navigateToFeed(state, action){
//             state.useQuery = action.payload.useQuery
//             state.header = action.payload.header
//             state.tag = action.payload.tag
//         }
//     }
// })


// export const {navigateToFeed} = currentFeed.actions
export const {navigateToDetailedPage} = currentDetailedPage.actions
export const {navigateNavbar} = currentNavbarItem.actions
export const {navigateTab} = currentTabItem.actions
export const {addFeed, editFeed, deleteFeed} = myFeeds.actions


// export const currentFeedReducer = currentFeed.reducer
export const myFeedsReducer = myFeeds.reducer
export const currentNavbarItemReducer =  currentNavbarItem.reducer
export const currentTabItemReducer = currentTabItem.reducer
export const currentDetailedPageReducer = currentDetailedPage.reducer

export const currentNavbarID = (state: RootState) => state.currentNavbarItem.id