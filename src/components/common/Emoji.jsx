import React from "react";

const Emoji = (props) => {
  const { setSelectedEmo, setOpenEmojiSelection } = props;

  const handleEmojiSelection = (emo) => {
    setOpenEmojiSelection(false);
    setSelectedEmo(emo);
  };
  return (
    <div className="absolute h-28 w-48 border bottom-0 cursor-pointer">
      <div onClick={() => handleEmojiSelection("\u{1F60A}")}>&#128522;</div>
    </div>
  );
};

export default Emoji;
