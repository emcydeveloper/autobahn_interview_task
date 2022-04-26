import { useHistory } from "react-router-dom";

export function DisplayPost({ post, setPost }) {
  const history = useHistory();
  const handleEdit = (id) => {
    history.push("/edit/" + id);
  };
  const handleDelete = (id) => {
    let newArray = post.filter(item => parseInt(item.id) !== parseInt(id));
    setPost(newArray);
  };

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
