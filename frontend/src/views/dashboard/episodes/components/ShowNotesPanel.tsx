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

const notes=[
    {
        description: `Jon Bernthal is an actor known for such roles as Sheriff's Deputy Shane Walsh in "The Walking Dead," vigilante Frank Castle in "The Punisher," and more recently, corrupt cop Wayne Jenkins in HBO's miniseries, "We Own This City." Bernthal is also the host of the weekly interview podcast series "REAL ONES with Jon Bernthal."`,
        youtubeLink: "https://www.youtube.com/channel/UCrOR14O-kBHEyrLQRdHJgDQ"
    },
]


export default function ShowNotesPanel() {
	// Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
    const location = useLocation();
    const episodeId = location.pathname.split('/').pop();

	return (
		<Box 
            pt={{ base: '10px', md: '20px', xl: '10px' }} 
            // px='48'
            >
			<VStack spacing='10px' alignItems='center' w='2xl' m='auto'>
                <Text
                    borderRadius='10px'
                    bg={boxBg}
                    fontSize='18px'
                    color={textColor}
                    fontWeight={500}
                    p={3}
                    >
                    {notes[0].description}
                </Text>
                <Link href={notes[0].youtubeLink} 
                    textDecoration={'underline'}
                    fontSize='16px'
                    color={textColor}
                    fontWeight={500} 
                    isExternal>
                    {notes[0].youtubeLink}
                </Link>
            </VStack>
		</Box>
	);
}