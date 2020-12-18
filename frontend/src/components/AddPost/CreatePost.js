import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import logo from "../../backAddPost.png";
import s from "./CreatePost.module.css";

const CreatePost = ({ createPost }) => {
  let [textOfThePost, setTextOfThePost] = useState("");

  const onChange = (e) => setTextOfThePost(e.target.value);

  const submitData = () => {
    if (textOfThePost !== "" && textOfThePost !== null) {
      createPost(textOfThePost);
    } else {
      alert("Text is empty!");
    }
    setTextOfThePost("");
  };
  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Card.Body>
          <Card.Title>Adding a post</Card.Title>
          <Card.Text>
            Here you have the opportunity to add your post and share your
            thoughts with other forum members.
          </Card.Text>
        </Card.Body>
        <Form.Group className={s.bottomGroup}>
          <Form.Label className={s.textArea}>
            The text of your awesome post:
          </Form.Label>
          <Form.Control
            onChange={(e) => onChange(e)}
            as="textarea"
            rows={3}
            type="text"
            value={textOfThePost}
          />
        </Form.Group>
        <Button onClick={() => submitData()} variant="light">
          Add post
        </Button>
      </Card>
    </div>
  );
};

export default CreatePost;
