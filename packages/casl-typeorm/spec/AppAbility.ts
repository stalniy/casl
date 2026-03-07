import { PureAbility } from '@casl/ability'
import { Subjects, TypeormQuery } from '../src'

export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  posts: Post[]
}

export interface Post {
  id: number
  title: string
  authorId: number
  status: string
  active: boolean
  tags: string[]
  author: User
}

export type AppAbility = PureAbility<['create' | 'read' | 'update' | 'delete', 'all' | Subjects<{
  User: User,
  Post: Post
}>], TypeormQuery>
