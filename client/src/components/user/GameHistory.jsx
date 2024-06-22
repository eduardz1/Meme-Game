import dayjs from "dayjs";
import { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import API from "../../api/API.mjs";
import MemesCard from "../MemeCard";
import MessageContext from "../contexts/MessageContext.mjs";

const GAMES_PER_PAGE = 5;

const GameHistory = () => {
  const { setError } = useContext(MessageContext);
  const [loadedGames, setLoadedGames] = useState(0);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [games, setGames] = useState([]);

  const loadMoreGames = async () => {
    try {
      const games = await API.getGames({
        limit: GAMES_PER_PAGE,
        offset: loadedGames,
      });

      setLoadedGames(loadedGames + games.length);

      if (games.length < GAMES_PER_PAGE) setHasMoreGames(false);

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
              <MemesCard rounds={game.rounds} fontSize={"2rem"}></MemesCard>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Container className="text-center mt-3">
        {hasMoreGames && (
          <Button onClick={loadMoreGames}>
            {loadedGames === 0 ? "Load Games" : "Load More"}
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default GameHistory;
