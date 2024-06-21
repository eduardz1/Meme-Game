import PropTypes from "prop-types";
import API from "../../api/API.mjs";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import MemesCard from "../MemeCard";

const GameHistory = ({ user }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGameHistory = async () => {
      try {
        const games = await API.getGames(user.id);

        setGames(games);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getGameHistory();
  }, [user]);

  return (
    <Container>
      <h1>Game History</h1>
      <Accordion>
        {games.map((game) => (
          <Accordion.Item eventKey={game.id}>
            <Accordion.Header>
              <h2>Game {game.id}</h2>
            </Accordion.Header>
            <Accordion.Body>
              <MemesCard rounds={game.rounds}></MemesCard>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

GameHistory.propTypes = {
  user: PropTypes.object,
};

export default GameHistory;
