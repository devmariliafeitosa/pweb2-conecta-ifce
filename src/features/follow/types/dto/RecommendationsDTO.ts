export type RecommendationsDTO = {
  items: Array<{
    id: string,
    firstName: string,
    lastName: string,
    name: string,
    handle: string,
    avatarUrl: string,
    campus: {
      id: string,
      name: string
    }
    couse?: string,
    reeason: "mutual_friends" | "same_campus" | "discover"
  }>
}