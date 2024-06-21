import API from "../../api/API.mjs";
import { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import MemesCard from "../MemeCard";
import MessageContext from "../contexts/MessageContext.mjs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";

const GameHistory = () => {
  const { setInfo, setError } = useContext(MessageContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGameHistory = async () => {
      try {
        const games = await API.getGames();

        setGames(games);
      } catch (error) {
        setError(error);
      }
    };

    getGameHistory();
  }, []);

  return (
    <Container>
      <Accordion>
        {games
          .map((game) => (
            <Accordion.Item eventKey={game.id} key={game.id}>
              <Accordion.Header>
                <Container fluid>
                  <Row>
                    <Col className="text-left">idGame#{game.id}</Col>
                    <Col className="text-center">
                      <h3>
                        Game score:{" "}
                        {game.rounds.reduce(
                          (acc, round) => acc + round.score,
                          0
                        )}
                      </h3>
                    </Col>
                    <Col className="text-end">
                      {dayjs(game.date).toString()}
                    </Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <MemesCard rounds={game.rounds} fontSize={"2rem"}></MemesCard>
              </Accordion.Body>
            </Accordion.Item>
          ))
          .reverse()}
      </Accordion>
    </Container>
  );
};

export default GameHistory;
