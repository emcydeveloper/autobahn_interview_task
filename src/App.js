import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import "./style.css";
import { DisplayPost } from "./DisplayPost";
import { EditPost } from "./EditPost";
import { CreatePost } from "./CreatePost";

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

  return (
    <div className="App">
      
      <Switch>
        <Route path="/edit/:id">
          <EditPost post={post} setPost={setPost} />
        </Route>
        {/* <Route path="/add">
        <CreatePost post={post} setPost={setPost} />
        </Route> */}
        <Route path="/">
          <DisplayPost post={post} setPost={setPost} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;


