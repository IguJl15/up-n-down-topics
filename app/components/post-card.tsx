import TimeAgo from "javascript-time-ago";
import type { Post } from "~/models/post.server";
import { ToggleIconButton } from "./icon-button";
import MenuButton from "./icon-button/menu-button";

interface PostCardProps {
  post: Post;

  onUpVote: () => void;
  onDownVote: () => void;

  onDeleteButtonClicked: () => void;
  onDeactivateButtonClicked: () => void;
}

export default function PostCard({
  post,
  onUpVote,
  onDownVote,

  onDeleteButtonClicked,
  onDeactivateButtonClicked,
}: PostCardProps) {
  const timeAgo = new TimeAgo("pt");

  return (
    <div id="post-card">
      <div className="main">
        <div className="header">
          <div className="tags">
            {post.tags.split(",").map((tag) => (
              <div key={tag} className="tag-item">
                {tag}
              </div>
            ))}
          </div>
          <div className="time-stamp">
            {timeAgo.format(post.createdAt, "round")}
          </div>
          <MenuButton
            enabled={true}
            items={{
              Inativar: onDeactivateButtonClicked,
              Excluir: onDeleteButtonClicked,
            }}
          >
            <span className="more material-symbols-outlined">more_vert</span>
          </MenuButton>
        </div>
        <div className="title">{post.description}</div>
      </div>
      <div className="footer">
        <div className="votes">
          <div className="votes-buttons">
            <ToggleIconButton
              enabled={true}
              onPressed={onUpVote}
              selected={true}
            >
              <span className="material-symbols-outlined">arrow_upward</span>
            </ToggleIconButton>
            <span>{post.upVotes - post.downVotes}</span>
            <ToggleIconButton
              enabled={true}
              onPressed={onDownVote}
              selected={true}
            >
              <span className="material-symbols-outlined">arrow_downward</span>
            </ToggleIconButton>
          </div>
          <div className="individual-votes">
            <div className="bars">
              <span
                className="bar up"
                style={{ flex: post.upVotes + " 0 0" }}
              />
              <span
                className="bar down"
                style={{ flex: post.downVotes + " 0 0" }}
              />
            </div>
            <div className="values">
              <span>{post.upVotes}</span>
              <span>{post.downVotes}</span>
            </div>
          </div>
        </div>
        <div className="user-info">
          <div className="info-item">
            <span />
            {post.authorName}
          </div>
          <div className="info-item">
            <span />
            {post.authorCity}
          </div>
        </div>
      </div>
    </div>
  );
}
