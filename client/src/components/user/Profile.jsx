import GameHistory from "./GameHistory";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import PropTypes from "prop-types";

const Profile = ({ user }) => {
  return (
    <Container>
      <Card className="mt-3">
        <Card.Body className="text-center">
          <h3>Your total score: {user && user.totalScore}</h3>
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Header className="text-center">
          <h3>Game History</h3>
        </Card.Header>
        <Card.Body>
          <GameHistory />
        </Card.Body>
      </Card>
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;
