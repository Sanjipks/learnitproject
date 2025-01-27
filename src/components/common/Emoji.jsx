import React from "react";

const emojis = [
  { code: "\u{1F600}", entity: "😀", name: "Grinning Face" },
  { code: "\u{1F601}", entity: "😁", name: "Beaming Face" },
  { code: "\u{1F602}", entity: "😂", name: "Face with Tears of Joy" },
  { code: "\u{1F603}", entity: "😃", name: "Grinning Face with Big Eyes" },
  { code: "\u{1F604}", entity: "😄", name: "Grinning Face with Smiling Eyes" },
  { code: "\u{1F605}", entity: "😅", name: "Grinning Face with Sweat" },
  { code: "\u{1F606}", entity: "😆", name: "Grinning Squinting Face" },
  { code: "\u{1F607}", entity: "😇", name: "Smiling Face with Halo" },
  { code: "\u{1F608}", entity: "😈", name: "Smiling Face with Horns" },
  { code: "\u{1F609}", entity: "😉", name: "Winking Face" },
  { code: "\u{1F60A}", entity: "😊", name: "Smiling Face with Smiling Eyes" },
  { code: "\u{1F60B}", entity: "😋", name: "Face Savoring Food" },
  { code: "\u{1F60C}", entity: "😌", name: "Relieved Face" },
  { code: "\u{1F60D}", entity: "😍", name: "Smiling Face with Heart-Eyes" },
  { code: "\u{1F60E}", entity: "😎", name: "Smiling Face with Sunglasses" },
  { code: "\u{1F60F}", entity: "😏", name: "Smirking Face" },
  { code: "\u{1F610}", entity: "😐", name: "Neutral Face" },
  { code: "\u{1F611}", entity: "😑", name: "Expressionless Face" },
  { code: "\u{1F612}", entity: "😒", name: "Unamused Face" },
  { code: "\u{1F613}", entity: "😓", name: "Downcast Face with Sweat" },
  { code: "\u{1F614}", entity: "😔", name: "Pensive Face" },
  { code: "\u{1F615}", entity: "😕", name: "Confused Face" },
  { code: "\u{1F616}", entity: "😖", name: "Confounded Face" },
  { code: "\u{1F617}", entity: "😗", name: "Kissing Face" },
  { code: "\u{1F618}", entity: "😘", name: "Face Blowing a Kiss" },
  { code: "\u{1F619}", entity: "😙", name: "Kissing Face with Smiling Eyes" },
  { code: "\u{1F61A}", entity: "😚", name: "Kissing Face with Closed Eyes" },
  { code: "\u{1F61B}", entity: "😛", name: "Face with Stuck-Out Tongue" },
  { code: "\u{1F61C}", entity: "😜", name: "Winking Face with Tongue" },
  { code: "\u{1F61D}", entity: "😝", name: "Zany Face" },
  { code: "\u{1F61E}", entity: "😞", name: "Disappointed Face" },
  { code: "\u{1F61F}", entity: "😟", name: "Worried Face" },
  { code: "\u{1F620}", entity: "😠", name: "Angry Face" },
  { code: "\u{1F621}", entity: "😡", name: "Pouting Face" },
];

const EmojiPicker = (props) => {
  const { setSelectedEmo, setOpenEmojiSelection } = props;

  const handleEmojiSelection = (emo) => {
    setOpenEmojiSelection(false);
    setSelectedEmo(emo);
  };

  return (
    <div className="grid grid-cols-10 gap-3 w-auto bottom-0 h-auto p-2 bg-gray-100 border border-gray-300 rounded-md">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="cursor-pointer text-3xl hover:scale-150 transition-transform"
          onClick={() => handleEmojiSelection(emoji.code)}
          title={emoji.name}
        >
          {emoji.entity}
        </div>
      ))}
    </div>
  );
};

export default EmojiPicker;
