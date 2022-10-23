type Feed = {
    id: string,
    name: string,
    // author: string,
    // averageRating: number,
    // totalReviewCount: number,
    description: string,
    visiiblity: "public" | "private",
    tags: string[],
    // isMyCard: boolean
    configurations: Configuration[],
}
export type Configuration = {
    mode: "new",
    keyword: string, 
    quantity: number,
    sources: string[]
}

export default Feed
