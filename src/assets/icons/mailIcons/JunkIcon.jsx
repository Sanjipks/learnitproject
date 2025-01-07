import React from "react";

const JunkIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="40"
        height="28"
      >
        <path fill="#e95612" stroke="#333" strokeWidth="2" d="M3 16h94v68H3z" />

        <path fill="rgb(113, 42, 7)" d="M4 16l34 33c7 7 15 7 23 0L96 16z" />

        <path
          fill="none"
          stroke="#333"
          stroke-width="2"
          d="M96 84L59 51M4 84L40 51"
        />

        <g transform="scale(0.6) translate(56 56)">
          <path
            fill="#DDD"
            d="M84 31s-28 16-67 1l5 53s4 11 27 11c26 0 30-11 30-11l5-54z"
          />
          <path
            fill="#762F00"
            stroke="#200C00"
            d="M80 63c-10-10-13 18-27 10-4-4-1-10-7-10s-12 3-14 8c-4-9-10-13-10-13l1 27s3 10 26 10c26 0 29-10 29-10z"
          />
          <path
            fill="#888"
            stroke="#444"
            strokeWidth="2"
            d="M84 31s-28 16-67 1l5 53s4 11 27 11c26 0 30-11 30-11l5-54zM27 40h1c4 1 4 5 4 5l4 37s0 4-3 3c-3-1-3-5-3-5L26 44s-1-4 1-4zM73 40c3 0 2 4 2 4l-4 36s-1 5-4 5c-3 0-2-4-2-4l4-36s1-5 4-5zM50 44c4 0 4 3 4 3v38s-1 3-4 3-4-3-4-3V47s0-3 4-3z"
          />
          <ellipse cx="50" cy="23" rx="42" ry="17" fill="#555" />
          <ellipse cx="50" cy="19" rx="42" ry="17" fill="#aaa" />
          <ellipse cx="50" cy="18" rx="37" ry="13" fill="#333" />
          <ellipse cx="50" cy="20" rx="37" ry="12" fill="#666" />
          <path
            fill="#aaa"
            stroke="rgb(81, 65, 65)"
            strokeWidth="1"
            d="M32 19c0-17 18-17 18-17s18 0 18 17h-5c0-12.1-13-12.1-13-12.1S37 6.9 37 19z"
          />
        </g>
      </svg>
    </div>
  );
};

export default JunkIcon;
