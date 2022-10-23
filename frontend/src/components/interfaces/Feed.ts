type Feed = {
  id: string;
  name: string;
  creatorName: string;
  creatorId: string;
  // averageRating: number,
  // totalReviewCount: number,
  description: string;
  visibility: "public" | "private" | number;
  tags: string[];
  // isMyCard: boolean
  configurations: Configuration[];
  review: Review;
};
export type Configuration = {
  id: string;
  mode: string | number;
  keyword: string;
  quantity: number;
  sources: string[];
};
export type Review = {
  raiting: number;
  comments: string[];
};

export default Feed;
