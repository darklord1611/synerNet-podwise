// Chakra imports
import { Flex, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link, Tooltip, Box, Tabs, TabList, Tab, TabPanel, TabPanels, TabIndicator, Divider, Button } from '@chakra-ui/react';
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
import { useState } from 'react';

export default function UnProcessedPanel(props: { url: string}) {
	// Chakra Color Mode
    const { url } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const location = useLocation();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClick = async () => {
        setIsProcessing(true);

		try {
			const response = await fetch('https://8080-01j7q9srfa9kc6yyskwzg2mbqb.cloudspaces.litng.ai/process_input', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					audio_url: url,
					is_youtube_url: false
				})
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('Error importing YouTube URL:', error);
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<Box 
            pt={{ base: '10px', md: '20px', xl: '10px' }} 
            // px='48'
            >
			<VStack spacing='10px' alignItems='center' w='2xl' m='auto' mt={5}>
                <Text fontSize='18px' fontWeight='bold' color={textColor}>
                    This episode has not been processed yet. Click the button below.
                </Text>
                <Button colorScheme='brand' size='lg' variant='solid' onClick={handleClick}>
                    {isProcessing ? 'Processing...' : 'Continue process'}
                </Button>
            </VStack>
		</Box>
	);
}