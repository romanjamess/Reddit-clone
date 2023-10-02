import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

export const SingleSubreddit = () => {
  const { subredditName } = useParams();
  const { subreddits, post } = useOutletContext();

  // Find the subreddit object based on the subredditName
  const selectedSubreddit = subreddits.find(
    (subreddit) => subreddit.name === subredditName
  );

  // Filter posts that belong to the selected subreddit
  const postsForSubreddit = post.filter(
    (post) => post.subredditId === selectedSubreddit.id
  );

  return (
    <>
      <div className="post-container">
        <h2>Posts in {subredditName}</h2>
        <ul>
          {postsForSubreddit.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
