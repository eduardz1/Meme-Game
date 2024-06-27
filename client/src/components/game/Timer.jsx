import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "./Animations.module.css";

const STROKE_WIDTH = 12;
const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Component used to show the countdown timer for the round.
 */
const Timer = ({ handleClick }) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState(
    parseInt(import.meta.env.VITE_TIMER_DURATION),
  );
  const [offset, setOffset] = useState(CIRCUMFERENCE);

  /**
   * Returns the number of seconds remaining.
   */
  const getTimeRemaining = (deadline) => {
    const total = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return seconds;
  };

  /**
   * Changes color based on the time remaining.
   */
  const getColor = (seconds) => {
    if (seconds <= parseInt(import.meta.env.VITE_TIMER_DURATION) * 0.1) {
      return "red";
    } else if (seconds <= parseInt(import.meta.env.VITE_TIMER_DURATION) * 0.3) {
      return "orange";
    } else if (seconds <= parseInt(import.meta.env.VITE_TIMER_DURATION) * 0.6) {
      return "yellow";
    } else {
      return "green";
    }
  };

  /**
   * Starts the timer and updates the offset of the timer circle. If the timer
   * reaches 0, the round is ended. The timer is updated every second by a
   * setInterval.
   */
  const startTimer = (deadline) => {
    setTimer(parseInt(import.meta.env.VITE_TIMER_DURATION));

    // Clear the old interval at the beginning of the new one
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      const seconds = getTimeRemaining(deadline);
      setTimer(seconds);

      if (seconds <= 0) {
        handleClick(null);
        clearInterval(Ref.current);
      }

      setOffset(
        (seconds / parseInt(import.meta.env.VITE_TIMER_DURATION)) *
          CIRCUMFERENCE,
      );
    }, 1000);

    Ref.current = id;
  };

  /**
   * Returns the end time of the timer.
   */
  const getTimerEnd = () => {
    let deadline = new Date();
    deadline.setSeconds(
      deadline.getSeconds() + parseInt(import.meta.env.VITE_TIMER_DURATION),
    );
    return deadline;
  };

  /**
   * Resets the timer to its initial state.
   */
  const resetTimer = () => {
    setOffset(CIRCUMFERENCE);
    startTimer(getTimerEnd());
  };

  /**
   * On click, reset the timer.
   */
  useEffect(() => {
    resetTimer();
  }, [handleClick]);

  /**
   * Starts the timer when the component is mounted. Clears the interval when
   * the component is unmounted.
   */
  useEffect(() => {
    startTimer(getTimerEnd());

    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  return (
    <Container
      className={timer == 1 ? styles.shakeAnimation : ""}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <svg
        style={{
          // Makes the transition between the colors smoother
          "--color": getColor(timer),
        }}
        width={RADIUS * 2 + STROKE_WIDTH * 2}
        height={RADIUS * 2 + STROKE_WIDTH * 2}
      >
        <circle
          stroke="white"
          fill="white"
          strokeWidth={STROKE_WIDTH - 1} // looks a bit better with - 1
          r={RADIUS}
          cx={RADIUS + STROKE_WIDTH}
          cy={RADIUS + STROKE_WIDTH}
        />
        <circle
          style={{
            stroke: "var(--color)",
            transition: "stroke 0.5s ease-in-out",
            strokeLinecap: "round",
          }}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          r={RADIUS}
          cx={RADIUS + STROKE_WIDTH}
          cy={RADIUS + STROKE_WIDTH}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          textAnchor: "middle",
          stroke: "black",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {timer}
      </div>
    </Container>
  );
};

Timer.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Timer;
