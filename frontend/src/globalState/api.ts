import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Feed from "../components/interfaces/Feed";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),

  endpoints: (builder) => ({
    getAllFeeds: builder.query({
      query: () => "api/v1/feeds",
    }),
  }),
});

export async function getApiFeeds() {
  const response = await fetch("/api/v1/feeds", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  console.log(`This is getApiFeed: status is ${response.status}`);

  const result = await response.json();
  return result;
  // return response.json()
}

export async function createApiFeed(feed: Feed) {
  const feedJSON = JSON.stringify(feed);

  const response = await fetch("/api/v1/feeds", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: feedJSON,
  });

  console.log(`This is createApiFeed: status is ${response.status}`);

  const result = await response.json();

  console.log("result is: ", JSON.stringify(result, null, 4));
}
export async function deleteApiFeed(feedID: string) {
  const response = await fetch(`/api/v1/feeds/${feedID}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
    },
  });

  console.log(`This is deleteApiFeed: status is ${response.status}`);
}
export async function editApiFeed(feed: Feed) {
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
}

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetAllFeedsQuery } = apiSlice;
export default apiSlice;
