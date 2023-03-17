import React, { useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const deletePost = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const post = { id: Date.now(), title, body };
    addPost(post);
    event.target.reset();
  };
  const addComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };
  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();
    const commentText = event.target.commentText.value;
    const comment = { id: Date.now(), postId, text: commentText };
    addComment(comment);
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <textarea name="body" />
        <button type="submit">Add Post</button>
      </form>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.body}</p>
          <button onClick={() => deletePost(post.id)}>Delete Post</button>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.body}</p>
              <form onSubmit={(event) => handleCommentSubmit(event, post.id)}>
                <input type="text" name="commentText" />
                <button type="submit">Add Comment</button>
              </form>
              {comments
                .filter((comment) => comment.postId === post.id)
                .map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.text}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Posts;
