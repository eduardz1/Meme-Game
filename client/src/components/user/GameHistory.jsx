import dayjs from "dayjs";
import { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import API from "../../api/API.mjs";
import MemeCards from "../MemeCards.jsx";
import MessageContext from "../contexts/message/MessageContext.jsx";

/**
 * Component that renders the game history of the user
 */
const GameHistory = () => {
  const { setError } = useContext(MessageContext);
  const [loadedGames, setLoadedGames] = useState(0);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [games, setGames] = useState([]);

  /**
   * Function used to render more (VITE_GAMES_PER_PAGE number) games for each
   * click of the button to avoid rendering them all at once, useful when users
   * start having hundreds of games played, realistically only the last few
   * games are of interest anyway.
   */
  const loadMoreGames = async () => {
    try {
      const games = await API.getGames({
        limit: parseInt(import.meta.env.VITE_GAMES_PER_PAGE),
        offset: loadedGames,
      });

      setLoadedGames(loadedGames + games.length);

      if (games.length < parseInt(import.meta.env.VITE_GAMES_PER_PAGE))
        setHasMoreGames(false);

      setGames((prevGames) => [...prevGames, ...games]);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container>
      <Accordion>
        {games.map((game) => (
          <Accordion.Item eventKey={game.id} key={game.id}>
            <Accordion.Header>
              <Container fluid>
                <Row>
                  <Col className="text-left">idGame#{game.id}</Col>
                  <Col className="text-center">
                    <h3>
                      Game score:{" "}
                      {game.rounds.reduce((acc, round) => acc + round.score, 0)}
                    </h3>
                  </Col>
                  <Col className="text-end">{dayjs(game.date).toString()}</Col>
                </Row>
              </Container>
            </Accordion.Header>
            <Accordion.Body>
              <MemeCards rounds={game.rounds}></MemeCards>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Container className="text-center mt-3">
        {hasMoreGames && (
          <Button aria-label="LoadMoreGames" onClick={loadMoreGames}>
            {loadedGames === 0 ? "Load Games" : "Load More"}
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default GameHistory;
