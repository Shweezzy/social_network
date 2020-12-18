import React from "react";
import { Link } from "react-router-dom";

const Output = ({ clearPost }) => {
  return (
    <div>
      <div>
        <p>POST ADDED</p>
      </div>
      <div>
        <div>
          <div onClick={() => clearPost()}>
            <p>Add New Post</p>
          </div>
          <div>
            <Link to="/topics" style={{ textDecoration: "none" }}>
              <p>View Posts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
