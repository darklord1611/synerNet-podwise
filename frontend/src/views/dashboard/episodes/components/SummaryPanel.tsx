// Chakra imports
import { Flex, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link, Tooltip, Box, Tabs, TabList, Tab, TabPanel, TabPanels, TabIndicator, Divider, UnorderedList, ListItem } from '@chakra-ui/react';
// Custom components
import { useLocation } from 'react-router-dom';
import EpisodeBanner from '../components/EpisodeBanner';
import { MdDirectionsBike, MdOutlineSummarize } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { CgTranscript } from "react-icons/cg";
import { VscSymbolKeyword } from "react-icons/vsc";
import { LuHighlighter } from "react-icons/lu";
import { GoDependabot } from "react-icons/go";
import { FaList, FaRegNoteSticky } from "react-icons/fa6";
import GraphPanel from '../components/GraphPanel';
import KeywordCard from 'components/card/KeywordCard';
import HighlightCard from 'components/card/HightlightCard';
import { useRef } from 'react';
import { AudioPlayerComponent, AudioPlayerRef } from './AudioPlayerComponent';
import OutlineItem from './OutlineItem';

const summary = {
    "summary": "This podcast episode delves into profound topics, showcasing the fragility of society, the impact of tribalism and extremism, and the resilient journeys of individuals striving for change. From the turbulent events of the 1960s to the exploration of personal growth, the episode offers valuable insights into the human experience, the challenges faced, and the power of empathy and self-correction.",
    "takeaways": ["The events of the 1960s led to a loss of trust in institutions and a sense of chaos and uncertainty.", "Tribalism and extremism can divide people and prevent common ground.", "Communication and education are essential for a healthy society.", "Discipline is important for developing human potential and overcoming challenges.", "Positive role models can help individuals overcome adversity.", "Empathy and human connection play a transformative role in criminal justice.", "Intentionality and gratitude are key to success and fulfillment.", "Art and storytelling have the power to heal, inspire and bring about positive change."],
    "outlines": [
        {
            "timestamp": 2,
            "title": "The Fragility of Society and the Pendulum of Change",
            "description": "This section discusses the fragility of society and the pendulum of change. The speakers discuss the tumultuous events of the 1960s, including the assassinations of John F. Kennedy, Robert F. Kennedy, Martin Luther King Jr., and Malcolm X. They also discuss the Vietnam War and the anti-war movement. The speakers argue that these events led to a loss of trust in institutions and a sense of chaos and uncertainty. They also discuss the current state of society and the challenges facing law enforcement. The speakers argue that the pendulum of change is swinging back towards a more conservative approach to law enforcement."
        },
        {
            "timestamp": 447,
            "title": "The Un-American Tendency of Tribalism and Extremism",
            "description": "This section discusses the negative consequences of tribalism and extremism in American society. The speakers highlight the dangers of blindly following pundits and celebrities, and emphasize the importance of listening to people with firsthand experience. They also criticize the tendency to divide people into opposing teams and argue that this prevents us from finding common ground and solving problems. The speakers also discuss the importance of being open to different perspectives and willing to learn from others, even those who we disagree with. They argue that this is essential for maintaining a healthy and productive society."
        }
    ]
}

export default function SummaryPanel(props: { onSeek?: (time: number) => void }) {
	// Chakra Color Mode
    const { onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.500', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
    const location = useLocation();

	return (
		<Box pt={{ base: '10px', md: '20px', xl: '10px' }} >
			<VStack spacing='25px' alignItems='start' w='2xl' m='auto'>
                <Box p={3} alignItems='start' bg={boxBg} borderRadius='10px'>
                    <Text 
                        fontWeight={400} 
                        fontSize='16px'
                        color={textColor}
                        >{summary.summary}
                    </Text>
                </Box>
                <VStack spacing='10px' w='full' alignItems='start'>
                    <HStack spacing='5px'>
                        <Icon 
                            as={MdDirectionsBike}
                            w={6}
                            h={6}
                            color={textColorSecondary}
                        />
                        <Text 
                            fontWeight={400} 
                            fontSize='18px'
                            color={textColorSecondary}
                            >
                            Takeaways
                        </Text>
                    </HStack>
                    <Divider borderColor={textColorSecondary}/>
                    <UnorderedList p={3} bg={boxBg} borderRadius='10px'>
                        {summary.takeaways.map((takeaway) => {
                            return (
                                <ListItem 
                                    ml={5}
                                    fontWeight={400} 
                                    color={textColor}
                                    fontSize='16px'
                                    w='full'
                                    >{takeaway}
                                </ListItem>
                            )
                        })}
                    </UnorderedList>
                    <HStack spacing='5px'>
                        <Icon 
                            as={FaList}
                            w={4}
                            h={4}
                            color={textColorSecondary}
                        />
                        <Text 
                            fontWeight={400} 
                            fontSize='18px'
                            color={textColorSecondary}
                            >
                            Outlines
                        </Text>
                    </HStack>
                    <Divider borderColor={textColorSecondary}/>
                    <OutlineItem outline={summary.outlines} onSeek={onSeek}/>
                </VStack>
            </VStack>
		</Box>
	);
}