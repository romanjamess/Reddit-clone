import React from "react";
import { useOutletContext, Link } from "react-router-dom";

const NewSubreddit = () => {
  const { subreddits } = useOutletContext();

  return (
    <>
      <div className="subreddit-list">
        <h2>List of Subreddits:</h2>
        <ul>
          {subreddits &&
            subreddits.map((subreddit) => (
              <li key={subreddit.id}>
                <Link to={`subreddit/${subreddit.name}`}>{subreddit.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default NewSubreddit;
