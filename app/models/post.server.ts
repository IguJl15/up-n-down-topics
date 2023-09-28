import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Post } from "@prisma/client";

type PostId = Pick<Post, "id">

type UpdatePostDto = Pick<Post,
    "id" |
    "active" |
    "upVotes" |
    "downVotes">

type CreatePostDto = Pick<Post,
    "description" |
    "authorName" |
    "authorCity" |
    "authorCountry" |
    "tags">

export type InactivePostView = Pick<Post,
    "id" | 
    "description" | 
    "active" | 
    "createdAt" |
    "tags">

export function getPost({ id }: PostId) {
    return prisma.post.findFirst({
        where: { id }
    })
}


export async function getAllPosts(): Promise<Array<Post | InactivePostView>>  {
    const posts = await prisma.post.findMany({})

    return posts.map((post) => {
        let mapPost: Post | InactivePostView

        if(post.active) mapPost = post
        else {
            const inactivePost: InactivePostView = {...post}
            mapPost = inactivePost
        }

        return mapPost
    })
}

export function getAllActivePosts() {
    return prisma.post.findMany({
        where: { active: true }
    })
}

export function getAllInactivePosts() {
    return prisma.post.findMany({
        where: { active: false }
    })
}

export async function createPost(post: CreatePostDto) {
  await prisma.post.create({
    data: {
      ...post,
      active: false,
      upVotes: 0,
      downVotes: 0,
    },
  });
}

export function updatePost(post: UpdatePostDto) { }
export function deletePost({ id }: PostId) { }