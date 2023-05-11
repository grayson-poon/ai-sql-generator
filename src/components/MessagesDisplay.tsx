import MessageDisplay from "./MessageDisplay";

interface UserMessage {
	role: string,
	content: string
}

interface MessagesDisplayProps {
  userMessages: UserMessage[],
}

const MessagesDisplay = ({ userMessages }: MessagesDisplayProps) => {
  return (
    <div className="messages-display">
			{userMessages.map((userMessage, i) => <MessageDisplay key={i} message={userMessage} />)}
    </div>
  );
};

export default MessagesDisplay;
