import GameHistory from "./GameHistory";
import ErrorBoundary from "../errors/ErrorBoundary";

import PropTypes from "prop-types";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Profile</h1>
      <GameHistory user={user} />
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;
