import React from "react";

const MailTrashIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="40"
        height="28"
      >
        <rect x="61" y="112" width="170" height="111" fill="#FFC44F" />
        <polygon
          points="232,129 232,112 61,112 61,129 147,180"
          fill="#F7AB49"
        />
        <polygon points="230,112 63,112 147,163" fill="#FFC44F" />

        <polygon points="342,504 104,504 53,197 394,197" fill="#B3B9BF" />
        <path
          d="M383,256l10-59H53l10,59c0,89 30,169 77,217h68c-47-49-77-128-77-217 0-10 0-20 1-30h251z"
          fill="#8E959F"
        />

        <rect
          x="108"
          y="100"
          width="375"
          height="17"
          transform="rotate(23)"
          fill="#68727E"
        />
        <rect x="36" y="197" width="375" height="34" fill="#68727E" />

        <path
          d="M467,189L121,45l7-16c7-17 27-26 45-18l118,49 165,69c17,7 26,27 18,45l-7,16z"
          fill="#8E959F"
        />
        <ellipse cx="256" cy="100" rx="50" ry="20" fill="#333" />
      </svg>
    </div>
  );
};

export default MailTrashIcon;
