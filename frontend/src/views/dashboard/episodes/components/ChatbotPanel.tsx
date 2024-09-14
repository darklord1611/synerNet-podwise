import { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Avatar, FormControl } from '@chakra-ui/react';
import Timestamp from './Timestamp';

interface Message {
    sender: 'user' | 'bot';
    text: string;
    source?: number;
}

const ChatMessage = (props: { message: Message, onSeek?: (time: number) => void }) => {
    const { sender, text, source } = props.message;
    const { onSeek } = props;
    return (
        <HStack alignSelf={sender === 'user' ? 'flex-end' : 'flex-start'} spacing={3}>
        {sender !== 'user' && <Avatar name="Bot" src="/favicon.ico" />}
        <Box 
            bg={sender === 'user' ? 'blue.500' : 'gray.200'} 
            color={sender === 'user' ? 'white' : 'black'} 
            px={4} py={2} 
            borderRadius="lg"
        >
            <Text>{text}</Text>
            {sender === 'bot' && <Timestamp seconds={source} withAvatar={true} onSeek={onSeek}/>}
        </Box>
        {sender === 'user' && <Avatar name="User" src="/user-avatar.png" />}
        </HStack>
    );
};

export default function ChatbotPanel(props: { onSeek?: (time: number) => void }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { onSeek } = props;

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages([...messages, { sender: 'user', text: input }]);

    // Clear input field
    setInput('');

    // Simulate bot response after 1 second
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'This is a response from the bot!', source: 10 }
      ]);
    }, 1000);
  };

  return (
    <Box w="100%" mx="auto" p={5} bg="gray.50" borderRadius="lg" boxShadow="md">
      <VStack spacing={4} h="400px" overflowY="scroll" pb={5}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} onSeek={onSeek}/>
        ))}
      </VStack>

      <FormControl mt={4} as="form" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            size="md"
          />
          <Button colorScheme="blue" onClick={handleSendMessage}>
            Send
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
};
