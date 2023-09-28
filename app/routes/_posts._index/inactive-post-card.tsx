import type { InactivePostView } from "~/models/post.server";

type InactivePostCardProps = {post: InactivePostView}


export default function InactivePostCard({post} : InactivePostCardProps) {
  return (
      <div style={{padding: "2rem"}}>
        <div>id: {post.id}</div>
        <div>active: {post.active.toString()}</div>

        <div>description: {post.description}</div>

        <div>tags: {post.tags}</div>
      </div>
  )
}