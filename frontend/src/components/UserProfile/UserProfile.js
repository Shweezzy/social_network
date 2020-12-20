import React from "react";
import Moment from "react-moment";
import { Card, CardGroup } from "react-bootstrap";

const UserProfileData = ({ userProfile }) => {
  return (
    <div>
      <CardGroup
        style={{ width: "18rem", margin: "auto", textAlign: "center" }}
      >
        <Card>
          <Card.Img variant="top" src={userProfile.avatar} />
          <Card.Body>
            <Card.Title>{userProfile.userName}</Card.Title>
            <Card.Text>
              <p>{userProfile.name}</p>
              <p>{userProfile.lastName}</p>
              <p>{userProfile.email}</p>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Registration on the website:
              <br />
              <Moment format="HH:mm DD-MM-YYYY">
                {userProfile.dateOfCreate}
              </Moment>
            </small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
};

export default UserProfileData;
