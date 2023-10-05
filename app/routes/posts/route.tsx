import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import Greeting from "~/components/greeting";
import NewPostForm from "~/components/new-post-form";
import type {
  CreatePostDto,
  InactivePostView,
  Post,
} from "~/models/post.server";
import {
  createPost,
  deletePost,
  getAllActivePosts,
  getAllUnapprovedPosts,
  togglePostActive,
  votePost,
} from "~/models/post.server";
import {
  orderByCreationTime,
  orderByTotalVotes,
  requestPassword,
  toPost,
  toUnapprovedPost,
} from "~/utils";
import InactivePostCard from "../../components/inactive-post-card";
import PostCard from "../../components/post-card";
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

export const DE_ACTIVATE_HTTP_METHOD = "PUT";
export const VOTE_POST_HTTP_METHOD = "PATCH";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  await new Promise(resolve => setTimeout(resolve, 500 /* 0.5 seconds */));

  switch (request.method) {
    case "POST":
      const post: CreatePostDto = {
        description: (formData.get("title")?.valueOf() as string) ?? "",
        authorName: (formData.get("name")?.valueOf() as string) ?? "",
        authorCity: (formData.get("city")?.valueOf() as string) ?? "",
        authorCountry: (formData.get("country")?.valueOf() as string) ?? "",
        tags: (formData.get("tags")?.valueOf() as string) ?? "",
      };

      await createPost(post);

      return null;
    case DE_ACTIVATE_HTTP_METHOD:
      const updatedPostId = (formData.get("id")?.valueOf() as string) ?? "";
      const updatePass = (formData.get("password")?.valueOf() as string) ?? "";

      await togglePostActive({ id: updatedPostId, password: updatePass });

      return null;
    case VOTE_POST_HTTP_METHOD:
      const votedPostId = (formData.get("id")?.valueOf() as string) ?? "";
      const voteValue = (formData.get("value")?.valueOf() as string) ?? "";

      await votePost({ id: votedPostId, value: Number(voteValue) });

      return null;
    case "DELETE":
      const deletedPostId = (formData.get("id")?.valueOf() as string) ?? "";
      const deletePass = (formData.get("password")?.valueOf() as string) ?? "";

      await deletePost({ id: deletedPostId, password: deletePass });

      return null;
    default:
      break;
  }
};

type LoaderData = {
  posts: Array<Post>;
  newPosts: Array<InactivePostView>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getAllActivePosts();
  const newPosts = await getAllUnapprovedPosts();

  await new Promise(resolve => setTimeout(resolve, 500 /* 0.5 seconds */));


  return json({ posts, newPosts });
};

export default function Index() {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const { posts, newPosts } = useLoaderData<LoaderData>();

  const activePosts = posts.map(toPost).sort(orderByTotalVotes);

  const unapprovedPosts = newPosts
    .map(toUnapprovedPost)
    .sort(orderByCreationTime);

  function deletePost(id: string) {
    const pass = requestPassword();

    fetcher.submit(
      { id: id, password: pass },
      { method: "DELETE", preventScrollReset: true },
    );
  }

  async function activateNewPost(id: string) {
    const pass = requestPassword();

    navigate(`/posts/${id}?pass=${pass}`);
  }

  function toggleActivatePost(id: string) {
    const pass = requestPassword();

    fetcher.submit(
      { id: id, password: pass },
      { method: DE_ACTIVATE_HTTP_METHOD, preventScrollReset: true },
    );
  }

  function vote(id: string, value: number) {
    fetcher.submit(
      { id: id, value: value },
      { method: VOTE_POST_HTTP_METHOD, preventScrollReset: true },
    );
  }

  return (
    <main>
      <div className="main-top" >
        <Greeting />
        <NewPostForm />
      </div>
      <div id="posts-list">
        {activePosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onUpVote={() => vote(post.id, +1)}
            onDownVote={() => vote(post.id, -1)}
            onDeactivateButtonClicked={() => toggleActivatePost(post.id)}
            onDeleteButtonClicked={() => deletePost(post.id)}
          />
        ))}
        {unapprovedPosts.map((post) => (
          <InactivePostCard
            key={post.id}
            post={{ ...post }}
            onActivateButtonClicked={() => activateNewPost(post.id)}
            onDeleteButtonClicked={() => deletePost(post.id)}
          />
        ))}
      </div>
    </main>
  );
}
