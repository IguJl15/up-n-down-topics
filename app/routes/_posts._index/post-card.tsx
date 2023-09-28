import type { Post } from "~/models/post.server";
import TimeAgo from "javascript-time-ago";

type PostCardProps = { post: Post };

export default function PostCard({ post }: PostCardProps) {
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
          <i>i</i>
        </div>
        <div className="title">{post.description}</div>
      </div>
      <div className="footer">
        <div className="votes">
          <div className="votes-buttons">
            <button className="active">
              <span></span>
            </button>
            <span>{post.upVotes - post.downVotes}</span>
            <button>
              <span></span>
            </button>
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
