import TimeAgo from "javascript-time-ago";
import type { InactivePostView } from "~/models/post.server";

type InactivePostCardProps = { post: InactivePostView };

export default function InactivePostCard({ post }: InactivePostCardProps) {
  const timeAgo = new TimeAgo("pt");
  return (
    <div id="post-card" className="inactive">
      <div>
        <span className="material-symbols-outlined">lock</span>
      </div>

      <div className="message">
        Tópico oculto.
        <br />
        Aguardando aprovação
        <br />
        {timeAgo.format(post.createdAt, "round")}
      </div>

      <span className="material-symbols-outlined">more_vert</span>
    </div>
  );
}
