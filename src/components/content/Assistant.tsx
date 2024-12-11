/* App Assistant Component */

import { snailAssistant } from "../../assets/icons";

interface AssistantProps {
  message: string | null;
  username?: string;
}

const Assistant: React.FC<AssistantProps> = ({ message, username }) => {
  return (
    <div className="assistant flex items-end justify-end gap-2 mr-10">
      <div
        id="assistant-greeting"
        className="assistant__greeting flex flex-col items-center mb-10 p-2"
      >
        <p id="assistant__info" className="p-3 color-p300">
          Hello there, <span className="assistant__username">{username}</span>!{" "}
        </p>
        <p>{message}</p>
      </div>
      <div>{snailAssistant}</div>
    </div>
  );
};

export default Assistant;
