type Feed = {
  id: string;
  name: string;
  // author: string,
  // averageRating: number,
  // totalReviewCount: number,
  description: string;
  visiiblity: "public" | "private";
  tags: string[];
  // isMyCard: boolean
  configurations: Configuration[];
  raiting: Raiting;
};
export type Configuration = {
  mode: "new";
  keyword: string;
  quantity: number;
  sources: string[];
};
export type Raiting = {
  raiting: number;
  comments: string[];
};

export default Feed;
