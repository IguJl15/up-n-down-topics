import TimeAgo from "javascript-time-ago";
import type { InactivePostView } from "~/models/post.server";
import MenuButton from "./icon-button/menu-button";

interface InactivePostCardProps {
  post: InactivePostView;
  onActivateButtonClicked: () => void;
  onDeleteButtonClicked: () => void;
}

export default function InactivePostCard({
  post,
  onActivateButtonClicked,
  onDeleteButtonClicked,
}: InactivePostCardProps) {
  const timeAgo = new TimeAgo("pt");
  return (
    <div className="post-card">
      <div className="post-card-content inactive">
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
        <MenuButton
          enabled={true}
          items={{
            Avaliar: onActivateButtonClicked,
            Excluir: onDeleteButtonClicked,
          }}
        >
          <span className="more material-symbols-outlined">more_vert</span>
        </MenuButton>
      </div>
    </div>
  );
}
