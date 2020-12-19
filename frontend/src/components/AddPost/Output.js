import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import s from "./Output.module.css";

const Output = ({ clearPost }) => {
  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Card.Body>
          <Card.Title>Post added</Card.Title>
          <Card.Text>
            <Button variant="info" onClick={() => clearPost()}>
              Add New Post
            </Button>

            <Link to="/topics" style={{ textDecoration: "none" }}>
              <Button
                className={s.btn}
                variant="info"
                onClick={() => clearPost()}
              >
                View Posts
              </Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Output;
