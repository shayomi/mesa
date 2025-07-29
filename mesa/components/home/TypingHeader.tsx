"use client";

import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypingHeader = () => {
  const [text] = useTypewriter({
    words: ["Describe your business or startup..."],
    loop: 0,
    delaySpeed: 1000,
  });

  return (
    <h2 className="text-2xl font-semibold text-white mb-6">
      {text}
      <Cursor cursorColor="#8ab4f8" />
    </h2>
  );
};

export default TypingHeader;
