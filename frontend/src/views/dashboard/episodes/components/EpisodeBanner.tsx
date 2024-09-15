// Chakra imports
import { Button, Flex, HStack, Icon, Image, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';

// Assets
import banner1 from 'assets/img/nfts/Nft1.png';
import banner2 from 'assets/img/nfts/Nft2.png';
import banner3 from 'assets/img/nfts/Nft3.png';
import banner4 from 'assets/img/nfts/Nft4.png';
import banner5 from 'assets/img/nfts/Nft5.png';
import banner6 from 'assets/img/nfts/Nft6.png';
import { useState } from 'react';
import { PiTimerBold } from 'react-icons/pi';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { VscBroadcast } from 'react-icons/vsc';

function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.round((duration % 3600) / 60);
    return `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
}

export default function EpisodeBanner(props: { episodeData: any}) {
    const { id, title, published_date, duration, podcast_name, podcastId, image_url } = props.episodeData;
	const banners = [banner1, banner2, banner3, banner4, banner5, banner6];
	// Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
    const [isPlaying, setIsPlaying] = useState(false);
	return (
		<Flex
			alignItems='start'
			direction='row'
			bgImage={banners[id % banners.length]}
			bgSize='cover'
			mb='20px'
			py={{ base: '10px', md: '30px' }}
			px={{ base: '10px', md: '30px' }}
			borderRadius='30px'>
            <Image
                src={image_url ? image_url : 'https://th.bing.com/th/id/R.851e934266b84967cffb27d0993e68aa?rik=eETnV8gBP%2b2fiQ&pid=ImgRaw&r=0'}
                alt={title}
                w='120px'
                h='120px'
                borderRadius='10px'
                objectFit='cover'
                // ms='auto'
                mr='10px'
            />
            <VStack align='start' spacing='10px' alignSelf='center' maxW='950px'>
                <HStack spacing='10px'>
                    <Text 
                        color={textColorSecondary} 
                        fontSize='14px' 
                        textAlign='start' 
                        fontWeight='500' 
                        lineHeight='100%'
                        >
                        {published_date}
                    </Text>
                    <HStack spacing='2px'>
                        <Icon as={PiTimerBold} w={4} h={4} color={textColorSecondary}/>
                        <Text 
                            color={textColorSecondary} 
                            fontSize='14px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >
                            {formatDuration(duration)}
                        </Text>
                    </HStack>
                </HStack>
                <Text 
                    color={textColor} 
                    fontSize='22px' 
                    textAlign='start' 
                    fontWeight='700' 
                    lineHeight='100%'
                    >
                    {title}
                </Text>
                <HStack w='100%' spacing='10px'>
                    <Icon 
                        as={VscBroadcast}
                        w={5}
                        h={5}
                        color={textColorSecondary}
                        />
                    <Link 
                        href={`/dashboard/podcasts/${podcastId}`}
                        color={textColorSecondary} 
                        fontSize='16px' 
                        textAlign='start' 
                        fontWeight='500' 
                        lineHeight='100%'
                        _hover={{ textDecoration: 'underline'}}
                        >
                        {podcast_name ? podcast_name : 'Youtube'}
                    </Link>
                </HStack>
                <Button 
                    colorScheme='gray'
                    variant='solid' 
                    size='sm' 
                    mt='20px'
                    onClick={() => setIsPlaying(!isPlaying)}
                    >
                    <Icon 
                        mr={2}
                        as={isPlaying ? TbPlayerPauseFilled : TbPlayerPlayFilled}
                        w={4}
                        h={4}
                        color={textColorSecondary}
                        />
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
            </VStack>
		</Flex>
	);
}
