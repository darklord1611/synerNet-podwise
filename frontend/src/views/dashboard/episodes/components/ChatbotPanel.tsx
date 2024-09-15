import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  Box, Input, Button, VStack, HStack, Text, Avatar, FormControl, Accordion, AccordionItem,
  AccordionButton, AccordionIcon, AccordionPanel, useColorModeValue, Tab, TabList, Divider, 
  TabPanels, TabIndicator, TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { text } from 'd3';
import Timestamp from './Timestamp';
import { TypeAnimation } from 'react-type-animation';
import { useLocation } from 'react-router-dom';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  source?: number;
}

const ChatMessage = (props: { message: Message, context: any, onSeek?: (time: number) => void }) => {
  const { sender, text, source } = props.message;
  const { onSeek, context } = props;
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.400', 'brand.300');
  const [currentContext, setCurrentContext] = useState(0);
  const brandColor = useColorModeValue('white', 'brand.400');
  const location = useLocation();

  return (
    <HStack alignSelf={sender === 'user' ? 'flex-end' : 'flex-start'} spacing={3}>
      {sender !== 'user' && <Avatar name="Bot" src="/favicon.ico" />}
      <Box
        maxW={sender === 'user' ? '100%' : '400px'}
        bg={sender === 'user' ? textColorSecondary : boxBg}
        color={sender === 'user' ? 'white' : 'black'}
        px={4}
        py={2}
        borderRadius="lg"
      >
      {sender === 'bot' && 
        <TypeAnimation sequence={[text]} wrapper="span"
        speed={85}
        cursor={false}
        style={{ fontSize: '16px', display: 'inline-block', color: textColor }}/>
      }
      {sender === 'user' &&
        <Text 
          p={2}
          bg={brandColor} 
          borderRadius='10px'
          fontWeight={400} 
          fontSize='16px'
          color={textColor}
          >{text}
        </Text>}
        {(sender === 'bot' && context.length > 0)&& (
          <VStack spacing='5px' mt={2} alignItems={'start'}>
            <Accordion allowMultiple w={"full"}>
              <AccordionItem>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left' >
                            <Text 
                                fontWeight={500} 
                                textDecoration={'underline'}
                                color={textColor}
                                fontSize='14px'
                                w='fit-content'
                                >
                                More information
                            </Text>
                        </Box>
                      {/* <AccordionIcon /> */}
                  </AccordionButton>
                <AccordionPanel pb={4} bg={boxBg} borderRadius='10px'>
                <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton color={textColor} isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                      {currentContext}
                    </MenuButton>
                    <MenuList>
                      {context.map((item: any, index: number) => (
                        <MenuItem color={textColor} key={index} onClick={() => setCurrentContext(index)}>
                          {index}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
              <VStack spacing='5px' p={2} mt={2} alignItems={'start'} bg={brandColor} borderRadius='10px'>
              <HStack
                mt='5px'
                spacing='2px'
                >
                <Text 
                  fontWeight={400} 
                  fontSize='16px'
                  color={textColor}
                  >
                  <Text fontWeight='bold' color={textColor}>Context: </Text>{context[currentContext].context}
                  {/* <Text fontWeight='bold' color={textColor}>Context: </Text>{context} */}
                </Text>
              </HStack>
              <HStack 
                spacing='2px'
                >
                <Text 
                  fontWeight='bold' 
                  color={textColor}
                  >
                  Context Relevancy:
                </Text>
                <Text 
                  fontWeight={400} 
                  fontSize='16px'
                  color={textColor}
                  >
                  {Math.round(context[currentContext].score * 100)}%
                </Text>
              </HStack>
              <HStack>
                <Text 
                  fontWeight='bold' 
                  color={textColor}
                  >
                  Source:
                </Text>
                <Timestamp seconds={context[currentContext].start} onSeek={onSeek} withAvatar={true}/>
              </HStack>
            </VStack>
            </AccordionPanel>
            </AccordionItem>
            </Accordion>
          </VStack>
        )}
      </Box>
      {sender === 'user' && <Avatar name="User" src="/user-avatar.png" />}
    </HStack>
  );
};

export default function ChatbotPanel(props: { onSeek?: (time: number) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { onSeek } = props;
  const boxBg = useColorModeValue('white', 'navy.700');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
  const btnColor = useColorModeValue('secondaryGray.400', 'navy.600');
  const brandColor = useColorModeValue('secondaryGray.400', 'brand.400');
  const location = useLocation();
  const [context, setContext] = useState(null);

  useEffect(() => {
    const getContext = async () => {
      try {
        const response = await fetch('https://8003-01j7q9srfa9kc6yyskwzg2mbqb.cloudspaces.litng.ai/load-context', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: location.pathname.split('/')[3] }),
        })
      } catch (error) {
        console.error('Error when calling chatbot', error);
      }
    }

    getContext();
  }, [location.pathname])

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: input }]);

    setInput('');
        try {
          const response = await fetch('https://8003-01j7q9srfa9kc6yyskwzg2mbqb.cloudspaces.litng.ai/ask-question', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: input }),
          })
          const data = await response.json();
          setContext(data.context)
          console.log(data.context);

          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: data.answer, source: 10 }
          ]);
        } catch (error) {
          console.error('Error when calling chatbot', error);
        }
  };

  return (
    <Box w="80%" mx="auto" p={5} bg={boxBg} borderRadius="lg" boxShadow="md">
      <VStack spacing={4} h="400px" overflowY="scroll" pb={5}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} onSeek={onSeek} context={context}/>
        ))}
      </VStack>

      <FormControl mt={4} as="form" onSubmit={(e) => e.preventDefault()}>
        <HStack spacing={2}>
          <Input
            color={textColor}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            size="md"
          />
          <Button bg={brandColor} onClick={handleSendMessage}>
            Send
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
}
