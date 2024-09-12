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

export default function EpisodeBanner(props: { episodeData: any}) {
    const { id, name, publishedDate, duration, podcastName, podcastId, thumbnailUrl } = props.episodeData;
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
			{thumbnailUrl ? (
                <Image
                    src={thumbnailUrl}
                    alt={name}
                    w='120px'
                    h='120px'
                    borderRadius='10px'
                    objectFit='cover'
                    // ms='auto'
                    mr='10px'
                />
            ) : null}
            <VStack align='start' spacing='10px' alignSelf='center' maxW='950px'>
                <HStack spacing='10px'>
                    <Text 
                        color={textColorSecondary} 
                        fontSize='14px' 
                        textAlign='start' 
                        fontWeight='400' 
                        lineHeight='100%'
                        >
                        {publishedDate}
                    </Text>
                    <Icon as={PiTimerBold} w={4} h={4} color={textColorSecondary}/>
                    <Text 
                        color={textColorSecondary} 
                        fontSize='14px' 
                        textAlign='start' 
                        fontWeight='400' 
                        lineHeight='100%'
                        >
                        {duration}
                    </Text>
                </HStack>
                <Text 
                    color={textColor} 
                    fontSize='22px' 
                    textAlign='start' 
                    fontWeight='700' 
                    lineHeight='100%'
                    >
                    {name}
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
                        {podcastName}
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
