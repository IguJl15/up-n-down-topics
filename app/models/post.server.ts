import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Post } from "@prisma/client";

type PostId = Pick<Post, "id">;

type GetPostByIdDto = { password: string } & PostId;
type ToggleActivePostDto = GetPostByIdDto;
type DeletePostDto = GetPostByIdDto;

type VotePostDto = { value: number } & PostId;

export type CreatePostDto = Pick<
  Post,
  "description" | "authorName" | "authorCity" | "authorCountry" | "tags"
>;
export type InactivePostView = Pick<
  Post,
  "id" | "active" | "createdAt" | "tags"
>;

const { ADMIN_PASSWORD } = process.env;

export async function getAllPosts(): Promise<Array<Post | InactivePostView>> {
  const posts = await prisma.post.findMany({});

  return posts.map((post) => {
    let mapPost: Post | InactivePostView;

    if (post.active) mapPost = post;
    else {
      const inactivePost: InactivePostView = { ...post };
      mapPost = inactivePost;
    }

    return mapPost;
  });
}

export async function getPost({
  id,
  password,
}: GetPostByIdDto): Promise<Post | null> {
  if (password != ADMIN_PASSWORD) {
    console.log("Senha incorreta");
    return null;
  }

  return await prisma.post.findFirst({
    where: { id },
  });
}

export async function getAllActivePosts() {
  return await prisma.post.findMany({
    where: {
      OR: [
        { active: true },
        {
          upVotes: { not: 0 },
        },
        {
          downVotes: { not: 0 },
        },
      ],
    },
  });
}

export async function getAllUnapprovedPosts() {
  return await prisma.post.findMany({
    where: { active: false, upVotes: 0, downVotes: 0 },
  });
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

export async function votePost({ id, value }: VotePostDto) {
  const post = await prisma.post.findUnique({ where: { id } });

  if (post == null) return console.log("Post não existe")
  if (post.active == false) return console.log("Post inativo");

  if (value > 0) {
    post.upVotes += 1;
  } else if (value < 0) {
    post.downVotes += 1;
  }

  await prisma.post.update({
    where: { id },
    data: post,
  });

  console.log("post atualizado");
}

export async function togglePostActive({ id, password }: ToggleActivePostDto) {
  if (password != ADMIN_PASSWORD) return console.log("Senha incorreta");

  const post = await prisma.post.findUnique({ where: { id } });

  if (post == null) return;
  console.log("post com active: " + post.active.toString());

  let newValue: boolean = post.active;

  if (isANewPost(post)) {
    newValue = true;
  } else if (isPostActive(post)) {
    console.log("Ja ativo");
    if (!hasVotes(post)) post.downVotes += 1;
    newValue = false;
  } else if (hasPostBeenDeactivated(post)) {
    return console.log("Post ja inativado anteriormente");
  }

  console.log("post com active: " + post.active.toString());

  await prisma.post.update({
    where: { id: post.id },
    data: { ...post, active: newValue },
  });

  console.log("post atualizado");
}

function isANewPost(post: Post) {
  return post.active == false && post.upVotes == 0 && post.downVotes == 0;
}

function isPostActive(post: Post) {
  return post.active;
}

function hasPostBeenDeactivated(post: Post) {
  return post.active == false && hasVotes(post);
}

function hasVotes(post: Post) {
  return post.upVotes != 0 || post.downVotes != 0;
}

export async function deletePost({ id, password }: DeletePostDto) {
  if (password != ADMIN_PASSWORD) return console.log("Senha incorreta");

  await prisma.post.delete({
    where: { id },
  });

  console.log("post apagado");
}
