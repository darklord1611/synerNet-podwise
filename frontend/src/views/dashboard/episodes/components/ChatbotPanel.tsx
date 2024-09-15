import { useEffect, useState } from 'react';
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

const data = [
  {
    "id": 36,
    "context": "Basically trying to beat Hatred Incarnate in the Eternal Realm. As a druid. As a druid. And if you... This is really vexing, let me tell you. I mean, the challenge is part of the fun. I have seen directly, like, you're actually, like, a world-class, incredible video game player. Yeah. And I think Diablo, so you're just picking up a new game, and you're figuring out its fundamentals. You're also, with the Paragon board and the build, are not somebody like me who perfectly follows whatever they suggest on the internet. You're also an innovator there. Yeah. Which is hilarious to watch. It's like a mad scientist just trying to figure out the paragon board and the build and the movement. Is there some interesting insights there about if somebody's starting as a druid, do you have advice? I would not recommend playing a druid in the eternal realm. Right now, I think the most powerful character in the seasonal realm is the sorcerer with the lightning balls. The sorks have huge balls in the seasonal realm. Yeah, that's what they say. Sorks have huge balls. They do, Huge balls of lightning. I'll take your word for it. ",
    "score": 0.186709463596344
  },
  {
    "id": 72,
    "context": "structure is messed up because the lawyers at the SEC are not paid well. It's a fairly low paying job. But what they're looking for is a trophy. From the SEC, they're looking for something they put on, basically they're linked in. From that, they can get a job at a high paying law firm. That's exactly what the lawyer here did. And the reason they don't attack the hedge funds is because those hedge funds employ those law firms. And they know if they attack the hedge funds, They're affecting their future career prospects. So they sell small investors down the river For their own career That's what actually happens regulatory capture Yeah, not good So the only reason I accepted the thing, technically was a not an admission, it's neither admit nor deny guilt. But the only reason I agreed to that at all was because I was told Tesla would be bankrupt otherwise. So if there was an SEC investigation like this, banks would suspend funding, we're bankrupt immediately at the time. Now we're in a much stronger position. Take that, Grok. Yes. Unfortunately, grok is Taking too much from the conventional media Also that guy was not a cave diver oh ",
    "score": 0.1825847178697586
  },
  {
    "id": 35,
    "context": "Yeah. I guess maybe the second hardest boss is Duryll. Duryll can't even scratch the paint. So I killed Durel so many times and every other boss in the game, all of them killed him so many times, it's easy. But Uvaleleth, others known as Hatred Incarnate, especially if you're druid and you have no ability to go and to be invulnerable. You, there are these random death waves that come at you. And I'm pretty, you know, I'm really, I'm 52. So my reflex is not what they used to be, but I'm, I have a lifetime of playing video games. At 1 point I was, you know, maybe 1 of the best quake players in the world. Actually won money for, and again, what I think was the first paid e-sports tournament in the U S We were doing 4 person Quake tournaments and we came second. I was the second best person on the team and the actual best person that we were actually winning, we were going to come first except the best person on the team, his computer crashed, halfway through the game. So we gave it a second. But I got money for it and everything. So like basically I got skills, albeit no Norsparing chicken these days. And To be totally frank, it's driving me crazy trying to beat Lilith as a druid. ",
    "score": 0.14980414509773254
  }
]

const ChatMessage = (props: { message: Message, onSeek?: (time: number) => void }) => {
  const { sender, text, source } = props.message;
  const { onSeek } = props;
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.400', 'brand.300');
  const [currentContext, setCurrentContext] = useState(0);
  const brandColor = useColorModeValue('white', 'brand.400');
  const location = useLocation();

  // useEffect(() => {
  //   const getContext = async () => {
  //     try {
  //       const response = await fetch('https://0af3-123-30-177-118.ngrok-free.app/load-context', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ id: location.pathname.split('/')[2] }),
  //       })
  //     } catch (error) {
  //       console.error('Error when calling chatbot', error);
  //     }
  //   }

  //   getContext();
  // }, [location.pathname])

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
        {sender === 'bot' && (
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
                      {data.map((item, index) => (
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
                  <Text fontWeight='bold' color={textColor}>Context: </Text>{data[currentContext].context}
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
                  {Math.round(data[currentContext].score * 100)}%
                </Text>
              </HStack>
              <HStack>
                <Text 
                  fontWeight='bold' 
                  color={textColor}
                  >
                  Source:
                </Text>
                <Timestamp seconds={source} onSeek={onSeek} withAvatar={true}/>
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

  useEffect(() => {
    const getContext = async () => {
      try {
        const response = await fetch('https://5f2e-123-30-177-118.ngrok-free.app/load-context', {
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

    // useEffect(() => {
    //   const callChatbot = async () => {
        try {
          const response = await fetch('https://5f2e-123-30-177-118.ngrok-free.app/ask-question', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: input }),
          })
          const data = await response.json();
          console.log(data);

          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: data.answer, source: 10 }
          ]);
        } catch (error) {
          console.error('Error when calling chatbot', error);
        }
      // }

    //   callChatbot();
    // }, [input])

    // setTimeout(() => {
      
    // }, 1000);
  };

  return (
    <Box w="80%" mx="auto" p={5} bg={boxBg} borderRadius="lg" boxShadow="md">
      <VStack spacing={4} h="400px" overflowY="scroll" pb={5}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} onSeek={onSeek} />
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
