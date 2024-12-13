/* App Assistant Component */

import Typewriter from "typewriter-effect";

import { snailAssistant, snailAssistantDarkmode } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";
import { useEffect, useState } from "react";

interface AssistantProps {
  message: string | null;
}

const Assistant: React.FC<AssistantProps> = ({ message }) => {
  const { darkmode } = useTheme();
  const [key, setKey] = useState(0); // To force a re-render of Typewriter when message changes

  useEffect(() => {
    if (message !== null) {
      setKey((prevKey) => prevKey + 1); // Increment key to reset the Typewriter effect
    }
  }, [message]);

  return (
    <div className="assistant flex items-end justify-end gap-2 mt-10 mr-10">
      <div
        id="assistant-greeting"
        className="assistant__greeting flex flex-col items-center mb-10 p-2 color-p300"
      >
        <Typewriter
          key={key} // Ensure Typewriter restarts when key changes
          onInit={(typewriter) => {
            typewriter
              .typeString(message || "")
              .callFunction(() => {})
              .start();
          }}
        />
      </div>

      <div>{darkmode ? snailAssistantDarkmode : snailAssistant}</div>
    </div>
  );
};

export default Assistant;
