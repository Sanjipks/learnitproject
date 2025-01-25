import React from "react";

const Emoji = (props) => {
  const { setSelectedEmo } = props;
  return (
    <div className="absolute h-28 w-48 border bottom-0">
      <div onClick={() => setSelectedEmo("&#128512;")}>&#128512;</div>
    </div>
  );
};

export default Emoji;
