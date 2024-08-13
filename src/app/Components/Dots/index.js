"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import s from "./dots.module.scss";

const Dots = () => {
  const [gridDimensions, setGridDimensions] = useState({ rows: 50, cols: 50 });
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const updateGridDimensions = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      const baseWidth = 1600;
      const baseHeight = 1600;
      const baseCols = 55;
      const baseRows = 55;

      const cols = Math.floor((containerWidth / baseWidth) * baseCols);
      const rows = Math.floor((containerHeight / baseHeight) * baseRows);

      setGridDimensions({ rows, cols });
    };

    window.addEventListener("resize", updateGridDimensions);
    updateGridDimensions();

    return () => window.removeEventListener("resize", updateGridDimensions);
  }, []);

  useEffect(() => {
    const newDots = Array.from(
      { length: gridDimensions.rows * gridDimensions.cols },
      (_, i) => ({
        id: i,
        blinkDuration: 2 + Math.random() * 11,
      })
    );
    setDots(newDots);
  }, [gridDimensions]);

  const dotsElements = useMemo(() => {
    return dots.map((dot) => (
      <Dot key={dot.id} blinkDuration={dot.blinkDuration} />
    ));
  }, [dots]);

  return (
    <div
      className={s.container}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
        gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`,
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      {dotsElements}
    </div>
  );
};

const Dot = ({ blinkDuration }) => {
  const timeoutRef = useRef(null);

  return (
    <div
      className={`${s.dot}`}
      style={{
        animationDuration: `${blinkDuration}s`,
      }}
    ></div>
  );
};

export default Dots;
