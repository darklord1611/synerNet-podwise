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

const keywords=[
    {
        word: "cobalt",
        definition: "A transition metal with a wide range of applications, from batteries to magnets. Cobalt is an essential material for the production of lithium-ion batteries, which are used in electric vehicles and consumer electronics. The Democratic Republic of Congo is the world's largest producer of cobalt, and the country's mining industry has been plagued by human rights abuses and environmental degradation."
    },
    {
        word: "cobalt mining",
        definition: "The process of extracting cobalt from the earth. Cobalt mining is a dangerous and labor-intensive process, and it has been linked to a number of health and environmental problems."
    },
    {
        word: "didgeridoo",
        definition: "A wind instrument that is played by the indigenous people of Australia. The didgeridoo is a long, hollow tube that is made from a tree branch. It is played by blowing air into the mouthpiece and vibrating the lips. The didgeridoo has a distinctive, resonant sound that can be used to create a variety of musical effects."
    },
    {
        word: "expat",
        definition: "A person who lives outside of their native country. Expats may live abroad for a variety of reasons, including work, study, or retirement. The expat community in any given country can be quite diverse, and it can offer a unique opportunity to learn about different cultures and perspectives."
    }
]


export default function KeywordPanel(props: { keywords: any}) {
	// Chakra Color Mode
    const { keywords } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const location = useLocation();
    const episodeId = location.pathname.split('/').pop();

	return (
		<Box 
            pt={{ base: '10px', md: '20px', xl: '10px' }} 
            // px='48'
            >
			<VStack spacing='10px' alignItems='start' w='2xl' m='auto'>
                {keywords.map((keyword: { keyword: string; definition: string; }) => (
                    <KeywordCard keyword={keyword} />
                ))}
            </VStack>
		</Box>
	);
}