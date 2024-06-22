import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const TIMER_DURATION = 30;
const STROKE_WIDTH = 12;
const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Timer = ({ handleClick }) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [offset, setOffset] = useState(CIRCUMFERENCE);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return seconds;
  };

  const getColor = (seconds) => {
    if (seconds <= TIMER_DURATION * 0.1) {
      return "red";
    } else if (seconds <= TIMER_DURATION * 0.3) {
      return "orange";
    } else if (seconds <= TIMER_DURATION * 0.6) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const startTimer = (e) => {
    setTimer(TIMER_DURATION);

    // Clear the old interval at the beginning of the new one
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      const seconds = getTimeRemaining(e);
      if (seconds <= 0) {
        handleClick(null, false);
        clearInterval(Ref.current);
      }

      setTimer(seconds);
      setOffset((seconds / TIMER_DURATION) * CIRCUMFERENCE);
    }, 1000);

    Ref.current = id;
  };

  const getTimerEnd = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + TIMER_DURATION);
    return deadline;
  };

  const resetTimer = () => {
    setOffset(CIRCUMFERENCE);
    startTimer(getTimerEnd());
  };

  useEffect(() => {
    resetTimer();
  }, [handleClick]);

  useEffect(() => {
    startTimer(getTimerEnd());

    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        animation: timer === 0 ? "shake 0.5s" : "none",
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
    </div>
  );
};

Timer.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Timer;
