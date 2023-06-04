import { Typewriter } from "react-simple-typewriter";

const TypingMessage = ({message}) => {
    return <Typewriter words={[`${message}`]} typeSpeed={35} />;
};

export default TypingMessage
