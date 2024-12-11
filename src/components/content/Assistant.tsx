/* App Assistant Component */

import { snailAssistant, snailAssistantDarkmode } from "../../assets/icons";
import useTheme from "../../hooks/useTheme";

interface AssistantProps {
  message: string | null;
  username?: string;
}

const Assistant: React.FC<AssistantProps> = ({ message, username }) => {
  const { darkmode } = useTheme();
  return (
    <div className="assistant flex items-end justify-end gap-2 mt-10 mr-10">
      <div
        id="assistant-greeting"
        className="assistant__greeting flex flex-col items-center mb-10 p-2 color-p300"
      >
        {username && (
          <p id="assistant__info" className="p-3 ">
            Hello there, <span className="assistant__username">{username}</span>
            !{" "}
          </p>
        )}
        <p className="p-3">{message}</p>
      </div>
      <div>{darkmode ? snailAssistantDarkmode : snailAssistant}</div>
    </div>
  );
};

export default Assistant;
