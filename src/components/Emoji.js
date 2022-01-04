import React from "react";
import { Text } from "react-native";

const Emoji = (props) => {
  let emo;
  switch (props.quality) {
    case "Hardworking":
      emo = "📚";
      break;

    case "Sweet":
      emo = " 🍬";
      break;
          
    case "Diligent":
      emo = "👓";
      break;
          
    case "Creative":
      emo = "🎨";
      break;
          
    case "Punctual":
      emo = "⏰";
      break;
          
    case "Organized":
      emo = "📁";
      break;
          
    case "Problem Solver":
      emo = "🙅";
      break;
          
    case "Team Player":
      emo = "✊";
      break;
          
    case "Leader":
      emo = "📣";
      break;
          
    case "Helpful":
      emo = "🙋";
      break;
  }
    
  return <Text>{emo}</Text>;
};

export default Emoji;







