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


  const VotesComponent = <Votes
    upVotes={post.upVotes}
    downVotes={post.downVotes}
    onUpVoteButtonClicked={onUpVote}
    onUpDownButtonClicked={onDownVote}
  />
  return (
    <div className="post-card">
      {VotesComponent}
      <div className="post-card-content">
        <div className="main">
          <div className="header">
            <div className="tags">
              {post.tags.split(",").map((tag) => (
                <div key={tag} className="tag-item">
                  {tag.trim()}
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
          {VotesComponent}
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
    </div>
  );
}

interface VotesProps {
  upVotes: number;
  downVotes: number;
  onUpVoteButtonClicked: () => void;
  onUpDownButtonClicked: () => void;
}

function Votes({
  upVotes,
  downVotes,
  onUpVoteButtonClicked,
  onUpDownButtonClicked,
}: VotesProps) {
  return (
    <div className="votes">
      <div className="votes-buttons">
        <ToggleIconButton
          enabled={true}
          onPressed={onUpVoteButtonClicked}
          selected={false}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </ToggleIconButton>
        <span>{upVotes - downVotes}</span>
        <ToggleIconButton
          enabled={true}
          onPressed={onUpDownButtonClicked}
          selected={false}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </ToggleIconButton>
      </div>
      <div className="individual-votes">
        <div className="bars">
          <span
            className="bar up"
            style={{ flex: upVotes + " 0 0" }}
          />
          <span
            className="bar down"
            style={{ flex: downVotes + " 0 0" }}
          />
        </div>
        <div className="values">
          <span>{upVotes}</span>
          <span>{downVotes}</span>
        </div>
      </div>
    </div>
  )
}
