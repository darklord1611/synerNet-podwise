import { Box } from "@chakra-ui/react";
import {
    MinChatUiProvider,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader
} from "@minchat/react-chat-ui";
import { useEffect, useState } from "react";
const colorSet = {
    "--input-background-color": "rgb(255, 255, 255)",
    "--messagelist-background-color": "rgb(255, 255, 255)",
    "--incoming-message-text-color": "#1B2559",
    "--incoming-message-name-text-color": "#1B2559",
    "--input-send-color": "#1B2559",
    "--input-placeholder-color": "#1B2559",
}

const myColorSet = {
    // input
    "--input-text-color": "#fff",
    "--input-element-color": "rgb(0, 0, 255)",
    "--input-attach-color": "#fff",

    // message header
    "--message-header-background-color": "#FF0000",
    "--message-header-last-active-color": "rgb(0, 0, 255)",
    "--message-header-back-color": "rgb(255, 255, 255)",

    // chat list header
    "--chatlist-header-background-color": "#FF0000",
    "--chatlist-header-text-color": "rgb(255, 255, 255)",
    "--chatlist-header-divider-color": "rgb(0, 128, 0)",

    //chatlist
    "--chatlist-background-color": "rgb(255, 192, 203)",
    "--no-conversation-text-color": "rgb(255, 255, 255)",

    //chat item
    "--chatitem-background-color": "rgb(0, 0, 255)",
    "--chatitem-selected-background-color": "rgb(255, 255, 0)",
    "--chatitem-title-text-color": "#FF0000",
    "--chatitem-content-text-color": "#FF0000",
    "--chatitem-hover-color": "#FF0000",

    //main container
    "--container-background-color": "rgb(255, 192, 203)",

    //loader
    "--loader-color": "rgb(0, 128, 0)",

    //message list
    "--no-message-text-color": "rgb(255, 255, 255)",

    // incoming message
    "--incoming-message-background-color": "rgb(0, 128, 0)",
    "--incoming-message-timestamp-color": "rgb(255, 255, 255)",
    "--incoming-message-link-color": "#FF0000",
    
    //outgoing message
    "--outgoing-message-text-color": "#FF0000",
    "--outgoing-message-background-color": "rgb(255, 255, 0)",
    "--outgoing-message-timestamp-color": "#FF0000",
    "--outgoing-message-checkmark-color": "#FF0000",
    "--outgoing-message-loader-color": "#FF0000",
    "--outgoing-message-link-color": "rgb(0, 128, 0)",
}


export function ChatbotPanel() {
    const [messages, setMessages] = useState([])

    const handleSendMessage = (message: string) => {
        setMessages(prevMessages => [
            ...prevMessages, // Keep previous messages
            {
                text: message,
                user: {
                    id: "me",
                    name: "User"
                }
            },
            {
                text: "I'm sorry, I'm not sure how to respond to that.",
                user: {
                    id: "bot",
                    name: "Podwise AI"
                }
            }
        ]);
    }

    useEffect(() => {
        setMessages([
            {
                text: "Hello! I'm Podwise AI. How can I help you today?",
                user: {
                    id: "bot",
                    name: "Podwise AI"
                }
            }
        ])
    }, [])

    return (
        <MinChatUiProvider 
            colorSet={colorSet}
            theme="#DDDCDC">
            <Box pt={{ base: '10px', md: '20px', xl: '10px' }} w='75%' m='auto'>
                <MainContainer>
                    <MessageContainer>
                        <MessageList
                            currentUserId="me"
                            messages={messages}
                        />
                    <MessageInput 
                        showAttachButton={false}
                        placeholder="Ask Podwise AI any question here" 
                        showSendButton
                        onSendMessage={handleSendMessage}
                        />
                    </MessageContainer>
                </MainContainer>
            </Box>
        </MinChatUiProvider>
    )
}