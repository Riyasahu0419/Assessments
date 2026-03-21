export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface EnrichedPost extends Post {
  author: User
}

export type UserMap = Record<number, User>

export type SortOption = 'title-asc' | 'title-desc' | 'author-asc'
