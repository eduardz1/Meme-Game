import API from "../../api/API.mjs";
import { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import MemesCard from "../MemeCard";
import MessageContext from "../contexts/MessageContext.mjs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";

const GAMES_PER_PAGE = 5;

const GameHistory = () => {
  const { setInfo, setError } = useContext(MessageContext);
  const [loadedGames, setLoadedGames] = useState(0);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [games, setGames] = useState([]);

  const loadMoreGames = async () => {
    try {
      let games = await API.getGames({
        limit: GAMES_PER_PAGE,
        offset: loadedGames,
      });

      games.reverse();

      setLoadedGames(loadedGames + games.length);
      if (games.length < GAMES_PER_PAGE) {
        setHasMoreGames(false);
      }
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
