import React from "react";
import {
  BsSun,
  BsMoon,
  BsVolumeMute,
  BsVolumeUp,
  BsSearch,
  BsTable,
  BsMic,
} from "react-icons/bs";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardReturn,
} from "react-icons/md";
import {
  FaVolumeOff,
  FaVolumeUp as FaVolumeIncrease,
  FaSearch as FaMagnifyingGlass,
  FaApple,
  FaPowerOff,
  FaCog,
} from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import "./Keypad.scss";

const Keypad = () => {
  const renderKey = (content, className = "", icon = null) => (
    <div className={`key ${className}`}>
      {icon && <span className="key-icon">{icon}</span>}
      <span className="key-content">{content}</span>
    </div>
  );

  return (
    <div className="keypad">
      {/* Function Row */}
      <div className="key-row">
        {renderKey("esc", "key-small")}
        {renderKey("F1", "key-fn")}
        {renderKey("F2", "key-fn")}
        {renderKey("F3", "key-fn")}
        {renderKey("F4", "key-fn")}
        {renderKey("F5", "key-fn")}
        {renderKey("F6", "key-fn")}
        {renderKey("F7", "key-fn")}
        {renderKey("F8", "key-fn")}
        {renderKey("F9", "key-fn")}
        {renderKey("F10", "key-fn")}
        {renderKey("F11", "key-fn")}
        {renderKey("F12", "key-fn")}
        {renderKey("", "key-wide key-power", <FaPowerOff />)}
      </div>

      {/* Number Row */}
      <div className="key-row">
        {renderKey("`", "key-symbol")}
        {renderKey("1", "key-number")}
        {renderKey("2", "key-number")}
        {renderKey("3", "key-number")}
        {renderKey("4", "key-number")}
        {renderKey("5", "key-number")}
        {renderKey("6", "key-number")}
        {renderKey("7", "key-number")}
        {renderKey("8", "key-number")}
        {renderKey("9", "key-number")}
        {renderKey("0", "key-number")}
        {renderKey("-", "key-symbol")}
        {renderKey("=", "key-symbol")}
        {renderKey("backspace", "key-wide")}
      </div>

      {/* Letter Rows */}
      <div className="key-row">
        {renderKey("tab", "key-wide")}
        {renderKey("Q")}
        {renderKey("W")}
        {renderKey("E")}
        {renderKey("R")}
        {renderKey("T")}
        {renderKey("Y")}
        {renderKey("U")}
        {renderKey("I")}
        {renderKey("O")}
        {renderKey("P")}
        {renderKey("[", "key-symbol")}
        {renderKey("]", "key-symbol")}
        {renderKey("\\", "key-symbol")}
      </div>

      <div className="key-row">
        {renderKey("capslock", "key-wide")}
        {renderKey("A")}
        {renderKey("S")}
        {renderKey("D")}
        {renderKey("F")}
        {renderKey("G")}
        {renderKey("H")}
        {renderKey("J")}
        {renderKey("K")}
        {renderKey("L")}
        {renderKey(";", "key-symbol")}
        {renderKey("'", "key-symbol")}
        {renderKey("enter", "key-wide")}
      </div>

      <div className="key-row">
        {renderKey("shift", "key-wide")}
        {renderKey("Z")}
        {renderKey("X")}
        {renderKey("C")}
        {renderKey("V")}
        {renderKey("B")}
        {renderKey("N")}
        {renderKey("M")}
        {renderKey(",", "key-symbol")}
        {renderKey(".", "key-symbol")}
        {renderKey("/", "key-symbol")}
        {renderKey("shift", "key-wide")}
      </div>

      {/* Modifier Keys Row */}
      <div className="key-row modifiers">
        {renderKey("⌘", "key-wide")}
        {renderKey("⌥", "key-wide")}
        {renderKey("space", "key-space")}
        {renderKey("⌥", "key-wide")}
        {renderKey("⌘", "key-wide")}
      </div>
    </div>
  );
};

export default Keypad;
