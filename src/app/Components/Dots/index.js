"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import s from "./dots.module.scss";

const Dots = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const newDots = Array.from({ length: 2500 }, (_, i) => ({
      id: i,
      blinkDuration: 2 + Math.random() * 11, // Random duration between 0.5s and 3s
    }));
    setDots(newDots);
  }, []);

  return (
    <div className={s.container}>
      {dots.map((dot) => (
        <Dot key={dot.id} blinkDuration={dot.blinkDuration} />
      ))}
    </div>
  );
};

const Dot = ({ blinkDuration }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
    setIsFading(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsFading(true);
    timeoutRef.current = setTimeout(() => {
      setIsFading(false);
    }, 2000);
  }, []);

  return (
    <div
      className={`${s.dot} ${isHovered ? s.hovered : ""} ${
        isFading ? s.fading : ""
      }`}
      style={{
        animationDuration: `${blinkDuration}s`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default Dots;
