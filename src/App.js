import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./style.css";

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
        <Route path="/add">
        <CreatePost post={post} setPost={setPost} />
        </Route>
        <Route path="/">
          <DisplayPost post={post} setPost={setPost} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

function DisplayPost({ post, setPost }) {
  const history = useHistory();
  const handleEdit = (id) => {
    history.push("/edit/" + id);
  };
  const handleDelete = (id)=>{
    let newArray = post.filter(item=>parseInt(item.id)!==parseInt(id))
    setPost(newArray)
  }
  
  return (
    <div className="display-post">
      <button>Add new post</button>
      <div className="item-container">
        {post.map((postItem, i) => (
          <div key={i} className="display-post-items">
            <div className="title">
              <h2>
                {postItem.id}: {postItem.title}
              </h2>
            </div>
            <div className="body">{postItem.body}</div>
            <div className="item-action">
              <button onClick={() => handleEdit(postItem.id)}>Edit</button>
              <button onClick={() => handleDelete(postItem.id)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditPost({ post, setPost }) {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");

  let history = useHistory();
  let { id } = useParams();
  let getEditItem = () =>
    post.filter((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        setTitle(item.title);
        setBody(item.body);
      }
    });
  useEffect(getEditItem, []);
  let handleCancel = () => {
    history.push("/home");
  };

  const onSubmit = (event) => {
    post.filter((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        item.title = title;
        item.body = body;
        history.push("/home");
      }

      return item;
    });
  };

  let handleTitle = (event) => setTitle(event.target.value);
  let handleBody = (event) => setBody(event.target.value);

  return (
    <div>
      <div>Edit Post- {id}</div>
      <div className="edit">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "40ch",
              display: "flex",
              flexWrap: "wrap",
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="title"
            onChange={handleTitle}
            value={title}
            name="title"
          />
          <TextField id="body" onChange={handleBody} value={body} name="Body" />

          <div className="btn-container">
            <button className="success">Save</button>
            <button onClick={handleCancel} className="cancel">
              cancel
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
}



function CreatePost({ post, setPost }) {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [data,setData]=useState({});

  let history = useHistory();

  let handleCancel = () => {
    history.push("/home");
  };

  const onSubmit = (event) => {
    
    setData({userId:"",id:"",title:title,body:body})
    
    setPost([...post,data])
    history.push("/home");
    event.preventDefault();
  };

  let handleTitle = (event) => setTitle(title = event.target.value);
  let handleBody = (event) => setBody(event.target.value);

  return (
    <div>
      <div className="edit">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "40ch",
              display: "flex",
              flexWrap: "wrap",
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="title"
            onChange={handleTitle}
            value={title}
            name="title"
          />
          <TextField id="body" onChange={handleBody} value={body} name="Body" />

          <div className="btn-container">
            <button className="success">Save</button>
            <button onClick={handleCancel} className="cancel">
              cancel
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
}
