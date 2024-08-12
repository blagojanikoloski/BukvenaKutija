import React from 'react';
import Paths from './Paths';
import Letters from './Letters';
import Circles from './Circles';

export default function Box() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      className="box-svg"
    >
      <rect
        x="100"
        y="100"
        width="400"
        height="400"
        fill="#c7c7c7"
        stroke="black"
      />
      <Paths />
      <Letters />
      <Circles />
    </svg>
  );
}
