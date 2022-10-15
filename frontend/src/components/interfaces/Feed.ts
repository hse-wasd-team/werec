type Feed = {
    id: number,
    title: string,
    // author: string,
    // averageRating: number,
    // totalReviewCount: number,
    description: string,
    // visiiblity: "public" | "private",
    // tags: string[],
    // isMyCard: boolean
    // numberOfVideosPerRequest: number,
    keywords: Keyword[],
    // sourceLinks: string[]
}
export type Keyword = {
    keyword: string, 
    numberOfVideosPerRequest: number,
    sourceLinks: string[]
}

export default Feed
