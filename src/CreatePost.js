import { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function CreatePost({ post, setPost }) {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [data, setData] = useState({});

  let history = useHistory();

  let handleCancel = () => {
    history.push("/home");
  };

  const onSubmit = (event) => {

    setData({ userId: "", id: "", title: title, body: body });

    setPost([...post, data]);
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
            name="title" />
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
