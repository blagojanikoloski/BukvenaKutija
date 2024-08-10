import React from 'react';
import Paths from './Paths';
import Letters from './Letters';
import Circles from './Circles';

export default function Box() {
  return (
    <svg
      height="50svh"
      width="50svh"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
    >
      <rect
        x="100"
        y="100"
        width="400"
        height="400"
        fill="rgba(255,255,255)"
        stroke="black"
      />
      <Paths />
      <Letters />
      <Circles />
    </svg>
  );
}
