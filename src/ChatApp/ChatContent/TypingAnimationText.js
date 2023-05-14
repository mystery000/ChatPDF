import { useEffect, useState } from 'react'
import parse from 'html-react-parser'

const TypingAnimationText = ({ message, isLastMessage, chatPanelElement }) => {
    const [text, setText] = useState('')
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setText(message.text)
    }, [message])

    useEffect(() => {
        if (isLastMessage) {
            if (!!message.typingAnimation && index < message.text.length) {
                setTimeout(() => {
                    setText(text + message.text[index])
                    setIndex(index + 1)
                }, 30)
            } else {
                setText(message.text)
            }
        } else {
            setText(message.text)
        }
        const scrollingElement = chatPanelElement.current
        scrollingElement.scrollTop = scrollingElement.scrollHeight
    }, [index])

    return <>{parse(text.replace(/\n/g, '<br />'))}</>
}

export default TypingAnimationText
