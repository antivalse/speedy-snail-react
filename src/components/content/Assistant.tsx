/* App Assistant Component */

import Typewriter from "typewriter-effect";

import { snailAssistant, snailAssistantDarkmode } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

interface AssistantProps {
  message: string | null;
}

const Assistant: React.FC<AssistantProps> = ({ message }) => {
  const { darkmode } = useTheme();
  return (
    <div className="assistant flex items-end justify-end gap-2 mt-10 mr-10">
      <div
        id="assistant-greeting"
        className="assistant__greeting flex flex-col items-center mb-10 p-2 color-p300"
      >
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(message || "")
              .callFunction(() => {})
              // .pauseFor(2500)
              // .deleteAll()
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
