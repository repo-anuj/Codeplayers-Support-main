export const textSizeForOverflow = () => {
  return {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
};
export const truncateText = (text, maxLength = 26) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
