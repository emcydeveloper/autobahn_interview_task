import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function EditPost({ post, setPost }) {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");

  let history = useHistory();
  let { id } = useParams();
  // eslint-disable-next-line array-callback-return
  let getEditItem = () => post.filter((item) => {
    if (parseInt(item.id) === parseInt(id)) {
      setTitle(item.title);
      setBody(item.body);
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
