import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

/**
 * Reusable card components used to display a meme with an overlaid caption
 * (that makes it more meme-like) with the points scored for the guess and an
 * indicator of whether the guess was correct or not (green card body for
 * correct, red for incorrect).
 */
const MemeCards = ({ rounds }) => {
  return (
    <Row style={{ alignItems: "stretch" }}>
      {rounds.map((round, index) => (
        <Col className="d-flex" key={index} style={{ minWidth: "340px" }}>
          <Card
            className="mt-3"
            text="light"
            bg={round.score == 0 ? "danger" : "success"}
          >
            <Card.Body
              className="text-center"
              style={{
                position: "relative",
                display: "inline-flex",
              }}
            >
              <Image
                src={`memes/${round.tag}`}
                alt={round.tag.split(".")[0].replace(/-/g, " ")}
                rounded
                className="img-fluid w-100"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  padding: "10px 20px 20px 10px",
                  fontFamily: "Impact",
                  textTransform: "uppercase",
                  fontSize: "1.3rem",
                  color: "white",
                  textAlign: "center",
                  textShadow: `
                          2px 0 black, -2px 0 black, 0 2px black, 0 -2px black,
                          1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black`,
                }}
              >
                {round.caption || <i>No caption selected</i>}
              </div>
            </Card.Body>
            <Card.Footer>
              <h4>Points scored: {round.score}</h4>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

MemeCards.propTypes = {
  rounds: PropTypes.array,
  fontSize: PropTypes.string,
};

export default MemeCards;
