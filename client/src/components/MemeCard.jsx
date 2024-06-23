import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";
import React from "react";

const MemesCard = ({ rounds, fontSize }) => {
  return (
    <>
      {rounds.map((round, index) => (
        <Card
          key={index}
          className="mt-3"
          text="light"
          bg={round.score == 0 ? "danger" : "success"}
        >
          <Card.Body className="text-center">
            <Row className="d-flex align-items-center mt-3">
              <Col
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
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    padding: "10px 10px 10px 10px",
                    fontFamily: "Impact",
                    textTransform: "uppercase",
                    fontSize: fontSize || "1.5rem",
                    color: "white",
                    textAlign: "center",
                    width: "95%",
                    textShadow:
                      "-2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 2px 2px 0px black",
                  }}
                >
                  {round.caption || <i>No caption selected</i>}
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <h4>Points scored: {round.score}</h4>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};

MemesCard.propTypes = {
  rounds: PropTypes.array,
  fontSize: PropTypes.string,
};

export default MemesCard;
