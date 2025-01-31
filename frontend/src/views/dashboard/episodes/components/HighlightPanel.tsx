// Chakra imports
import { Flex, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link, Tooltip, Box, Tabs, TabList, Tab, TabPanel, TabPanels, TabIndicator, Divider } from '@chakra-ui/react';
// Custom components
import { useLocation } from 'react-router-dom';
import EpisodeBanner from '../components/EpisodeBanner';
import { MdOutlineSummarize } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { CgTranscript } from "react-icons/cg";
import { VscSymbolKeyword } from "react-icons/vsc";
import { LuHighlighter } from "react-icons/lu";
import { GoDependabot } from "react-icons/go";
import { FaRegNoteSticky } from "react-icons/fa6";
import GraphPanel from '../components/GraphPanel';
import KeywordCard from 'components/card/KeywordCard';
import HighlightCard from 'components/card/HightlightCard';
import { useRef } from 'react';
import { AudioPlayerComponent, AudioPlayerRef } from './AudioPlayerComponent';

const hightlights = [
    {
        "timestamp": 100,
        "highlight": "What makes urban legends so fascinating is their ability to persist through the ages, often with no clear origin, yet somehow they seem familiar to everyone."
    },
    {
        "timestamp": 100,
        "highlight": "These stories tap into our deepest fears, desires, and curiosities, often reflecting the societal anxieties of the time."
    },
    {
        "timestamp": 100,
        "highlight": "The 'Vanishing Hitchhiker' legend can be traced back to the early 19th century and has appeared in various forms in different cultures."
    },
    {
        "timestamp": 100,
        "highlight": "The beauty of this legend lies in its adaptability; it changes with the times, taking on new forms while maintaining its eerie core."
    },
    {
        "timestamp": 100,
        "highlight": "The story gained traction in the 1950s, an era when car culture and teenage dating were becoming more mainstream."
    },
    {
        "timestamp": 100,
        "highlight": "The legend served as a cautionary tale, warning teens about the dangers of being alone in remote places and, perhaps, engaging in activities that were considered risky or immoral."
    },
    {
        "timestamp": 100,
        "highlight": "The fear of mirrors and what they might reveal is deeply embedded in many cultures, and this legend plays on that primal fear."
    },
    {
        "timestamp": 100,
        "highlight": "The mirror itself acts as a symbol of self-reflection, making the legend a psychological test as much as a spooky challenge."
    },
    {
        "timestamp": 100,
        "highlight": "Urban legends aren't just about scares—they also serve as social commentary, reflecting the values, fears, and concerns of the times in which they are told."
    },
    {
        "timestamp": 100,
        "highlight": "This legend taps into the fear of being followed or watched, but it also touches on issues of trust and vulnerability, especially for women traveling alone."
    },
    {
        "timestamp": 100,
        "highlight": "Urban legends are also fascinating because of how they spread. Before the internet, these stories were passed down orally, changing slightly with each retelling."
    },
    {
        "timestamp": 100,
        "highlight": "The internet has also given rise to 'creepypasta,' a form of online horror fiction that often blurs the line between fiction and reality, creating new urban legends for a digital generation."
    },
    {
        "timestamp": 100,
        "highlight": "Stories like 'Slender Man' and 'The Russian Sleep Experiment' are prime examples of how the internet has become a breeding ground for modern myths that resonate with contemporary fears."
    },
    {
        "timestamp": 100,
        "highlight": "Perhaps it’s because they offer a way to explore our fears in a safe and controlled environment."
    },
    {
        "timestamp": 100,
        "highlight": "These stories also serve as a form of social bonding. Whether you're sharing a ghost story around a campfire or discussing a creepy tale with friends online, urban legends bring people together through shared experiences of fear and curiosity."
    },
    {
        "timestamp": 100,
        "highlight": "Urban legends often leave us with more questions than answers, and it’s that lingering sense of mystery that keeps us coming back for more."
    },
    {
        "timestamp": 100,
        "highlight": "They serve as a mirror, reflecting back our deepest fears and desires, often revealing more about ourselves than we might realize."
    }
]


export default function HighlightPanel(props: { highlights: any, onSeek?: (time: number) => void }) {
	// Chakra Color Mode
    const { highlights, onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const location = useLocation();

	return (
		<Box pt={{ base: '10px', md: '20px', xl: '10px' }} >
			<VStack spacing='10px' alignItems='start' w='2xl' m='auto'>
                {hightlights.map((highlight) => (
                    <HighlightCard hightlight={highlight} onSeek={onSeek}/>
                ))}
            </VStack>
		</Box>
	);
}