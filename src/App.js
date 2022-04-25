import { useEffect, useState } from "react";
import "./style.css"

function App() {
  const [post, setPost] = useState([]);

  let fetchPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "get",
    })
      .then((postData) => postData.json())
      .then((postList) => setPost(postList))
      .then(() => console.log("Home page loaded with Post"));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // post.map((a) => console.log(a));

  return (
    <div className="App">
      {/* <h1>welcome</h1> */}
      <DisplayPost post={post} setPost={setPost} />
    </div>
  );
}

export default App;

function DisplayPost({ post, setPost }) {
  return (
    <div className="display-post">
      <button>Add new post</button>
      <div className="item-container">
      {post.map((postItem, i) => (
        <div key={i} className="display-post-items">
        {/* <h2>User Id: {postItem.userId}</h2> */}
        {/* <h2>ID: {postItem.id}</h2> */}
        <div className="title"><h2>Title: {postItem.title}</h2></div>
        {/* <h3>Body</h3> */}
        <div className="body">{postItem.body}</div>
        <div className="item-action"><button>Edit</button><button>delete</button></div>
        
        </div>
      ))}
      </div>
    </div>
  );
}
