import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { InactivePostView, Post } from "~/models/post.server";
import { getAllActivePosts, getAllInactivePosts } from "~/models/post.server";
import PostCard from "./post-card";
import InactivePostCard from "./inactive-post-card";
// import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Home page" }];

type LoaderData = {
  posts: Array<Post>,
  inactivesPosts: Array<InactivePostView>
}

export const loader: LoaderFunction = async () => {
  const posts = await getAllActivePosts()
  const inactivePosts = await getAllInactivePosts()
  return json({ posts: posts, inactivesPosts: inactivePosts })
}

export default function Index() {
  const { posts, inactivesPosts } = useLoaderData<LoaderData>()

  const activePosts = posts.map((post) => {
    return {
      ...post,
      upVotes: post.upVotes ?? 0,
      downVotes: post.downVotes ?? 0,
      createdAt: new Date(post.createdAt) ?? new Date()
    }
  })

  const inactivePosts = inactivesPosts.map((post) => {
    return {
      ...post,
      createdAt: new Date(post.createdAt) ?? new Date()
    }
  })

  return (
    <main>
      <div id="posts-list">
        {activePosts.map((post) => <PostCard key={post.id} post={post} />)}
        {inactivePosts.map((post) => <InactivePostCard key={post.id} post={{...post}} />)}
      </div>
    </main>
  );
}
