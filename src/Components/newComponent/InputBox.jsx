import { BsEmojiSmile } from "react-icons/bs";

export default function InputBox({
  heading,
  description,
  infoIcon,
  textPosition,
  text,
  emoji,
}) {
  return (
    <div>
      {heading ||
        (description && (
          <Heading_Description
            heading={heading}
            description={description}
            infoIcon={infoIcon}
          />
        ))}
      <div
        className={`flex relative ${
          textPosition === "left"
            ? "flex-row"
            : textPosition === "right"
            ? "flex-row-reverse"
            : ""
        }`}
      >
        {textPosition && (
          <div
            className={`text-[#1F1E1F] text-[16.8px] bg-[#F7F7F8] border-y border-[#D5D5DD] shadow-inner px-4 flex justify-center items-center ${
              textPosition === "left"
                ? "rounded-l-md border-l"
                : textPosition === "right"
                ? "rounded-r-md border-r"
                : ""
            }`}
          >
            {text}
          </div>
        )}

        <input
          type="text"
          className={`border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none ${
            textPosition === "left"
              ? "rounded-r-md"
              : textPosition === "right"
              ? "rounded-l-md"
              : "rounded-md"
          }`}
        />
        {textPosition ? (
          <></>
        ) : (
          emoji && <BsEmojiSmile className="absolute right-3 top-3 text-lg" />
        )}
      </div>
    </div>
  );
}
