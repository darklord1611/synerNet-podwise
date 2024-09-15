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
import KeywordPanel from '../components/KeywordPanel';
import TranscriptPanel from '../components/TranscriptPanel';

import 'assets/css/player.css'
import { useAudio } from 'contexts/AudioContext';
import { useEffect, useRef, useState } from 'react';
import HighlightPanel from '../components/HighlightPanel';
import { AudioPlayerComponent, AudioPlayerRef } from '../components/AudioPlayerComponent';
import SummaryPanel from '../components/SummaryPanel';
import ShowNotesPanel from '../components/ShowNotesPanel';
import ChatbotPanel from '../components/ChatbotPanel';
import { useSupabase } from 'contexts/SupabaseContext';
import UnProcessedPanel from '../components/UnProcessedPanel';

const episodes=[
    {
        id: 1,
        name: "#1916 - Jon Bernthal",
        description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
        publishedDate: "Oct 21, 2020",
        duration: "4h 12m",
        podcastName: "Joe Rogan Experience",
        podcastId: 1,
        thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
        audioUrl: "https://www.youtube.com/watch?v=c5ozndz2N9s"
    },
    {
        id: 2,
        name: "#1554 - Kanye West",
        description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
        publishedDate: "Oct 24, 2020",
        duration: "3h 23m",
        podcastName: "Joe Rogan Experience",
        podcastId: 2,
        thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
    }
]


export default function EpisodeDetail() {
	// Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const playerColor = useColorModeValue('secondaryGray.300', 'navy.800');
    const location = useLocation();
    const episodeId = location.pathname.split('/').pop();
    const [episode, setEpisode] = useState<any | null>(null);
    // const episode = episodes.find(episode => episode.id === parseInt(episodeId));
    const audioPlayerRef = useRef<AudioPlayerRef>(null);
    const supabase = useSupabase();
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchEpisodes = async () => {
            console.log('episode_id', episodeId)
            if (!episodeId) return; // Ensure episodeId is defined

            const { data, error } = await supabase
                .from('episode_view')
                .select('*')
                .eq('id', episodeId)
            if (error) {
                console.log('Error fetching episodes', error);
            } else {
                console.log('Episodes fetched', data);
                setEpisode(data[0]);
            }
            setIsLoading(false); // Set loading to false after fetching
        }

        fetchEpisodes();
    }, [episodeId]);

    const handleSeek = (time: number) => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.handleSeek(time);
        }
    };

    if (isLoading) {
        return <Text>Loading...</Text>; // Show loading state while fetching data
    }

    if (!episode) {
        return <Text>Episode not found</Text>; // Show a message if no episode is found
    }

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<EpisodeBanner episodeData={episode} />
            <Tabs position='relative' variant='unstyled'>
            <TabList>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={MdOutlineSummarize}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Summary 
                        </Text>
                    </HStack>
                </Tab>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={RiMindMap}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Mindmap 
                        </Text>
                    </HStack>
                </Tab>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={CgTranscript}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Transcript 
                        </Text>
                    </HStack>
                </Tab>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={VscSymbolKeyword}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Keywords 
                        </Text>
                    </HStack>
                </Tab>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={LuHighlighter}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Highlights
                        </Text>
                    </HStack>
                </Tab>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={FaRegNoteSticky}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Show notes 
                        </Text>
                    </HStack>
                </Tab>
                <Tab>
                    <HStack spacing='5px'>
                        <Icon 
                            as={GoDependabot}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                        />
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >   
                            Ask Chatbot
                        </Text>
                    </HStack>
                </Tab>
            </TabList>
            <Divider borderColor='brand'/>
            <TabIndicator mt='-1.5px' height='4px' bg={brandColor} borderRadius='1px' />
            <TabPanels>
                <TabPanel>
                    {episode.summary ? 
                    (<SummaryPanel summary={episode.summary} onSeek={handleSeek}/>):
                    <UnProcessedPanel url={episode.audio_url}/>
                }
                </TabPanel>
                <TabPanel>
                    {episode.keypoints ? 
                    (<GraphPanel keypoints={episode.keypoints.keypoints} onSeek={handleSeek}/>):
                    <UnProcessedPanel url={episode.audio_url}/>
                }
                </TabPanel>
                <TabPanel>
                    {episode.transcript ?
                    (<TranscriptPanel 
                        transcripts={episode.transcript}
                        onSeek={handleSeek}
                        />):
                    <UnProcessedPanel url={episode.audio_url}/>
                    }
                </TabPanel>
                <TabPanel alignItems='center'>
                    {episode.keywords ?
                    (<KeywordPanel keywords={episode.keywords.keywords}/>):
                    <UnProcessedPanel url={episode.audio_url}/>
                    }
                </TabPanel>
                <TabPanel alignItems='center'>
                    {episode.highlights ?
                    (<HighlightPanel highlights={episode.highlights} onSeek={handleSeek}/>):
                    <UnProcessedPanel url={episode.audio_url}/>
                    }
                </TabPanel>
                <TabPanel>
                    <ShowNotesPanel />
                </TabPanel>
                <TabPanel>
                    <ChatbotPanel onSeek={handleSeek}/>
                </TabPanel>
            </TabPanels>
            <AudioPlayerComponent ref={audioPlayerRef} episode={episode} />
            </Tabs>
		</Box>
	);
}