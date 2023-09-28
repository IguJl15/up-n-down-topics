import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {
  InactivePostView,
  Post,
} from "~/models/post.server";
import {
  getAllActivePosts,
  getAllInactivePosts,
} from "~/models/post.server";
import PostCard from "../../components/post-card";
import InactivePostCard from "../../components/inactive-post-card";
// import { Link } from "@remix-run/react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    },
  ];
};

export const meta: MetaFunction = () => [{ title: "Home page" }];

type LoaderData = {
  posts: Array<Post>;
  inactivesPosts: Array<InactivePostView>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getAllActivePosts();
  const inactivePosts = await getAllInactivePosts();

  return json({ posts: posts, inactivesPosts: inactivePosts });
};

export default function Index() {
  const { posts, inactivesPosts } = useLoaderData<LoaderData>();

  const activePosts = posts
    .map((post) => {
    return {
      ...post,
      upVotes: post.upVotes ?? 0,
      downVotes: post.downVotes ?? 0,
        createdAt: new Date(post.createdAt) ?? new Date(),
      };
  })
    .sort((post, next) => {
      return post.upVotes + post.downVotes > next.upVotes + next.downVotes
        ? -1
        : 0;
    });

  const inactivePosts = inactivesPosts
    .map((post) => {
    return {
      ...post,
        createdAt: new Date(post.createdAt) ?? new Date(),
      };
  })
    .sort((post, next) => {
      return post.createdAt.getTime() > next.createdAt.getTime() ? -1 : 0;
    });

  return (
    <main>
      <div id="posts-list">
        {activePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {inactivePosts.map((post) => (
          <InactivePostCard key={post.id} post={{ ...post }} />
        ))}
      </div>
    </main>
  );
}
