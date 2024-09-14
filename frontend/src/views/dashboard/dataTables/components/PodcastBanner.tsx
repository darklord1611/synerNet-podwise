// Chakra imports
import { Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';

// Assets
import banner1 from 'assets/img/nfts/Nft1.png';
import banner2 from 'assets/img/nfts/Nft2.png';
import banner3 from 'assets/img/nfts/Nft3.png';
import banner4 from 'assets/img/nfts/Nft4.png';
import banner5 from 'assets/img/nfts/Nft5.png';
import banner6 from 'assets/img/nfts/Nft6.png';

export default function PodcastBanner(props: { podcastData: any}) {
    const { podcastData } = props;
	const banners = [banner1, banner2, banner3, banner4, banner5, banner6];
	// Chakra Color Mode
	return (
		<Flex
			alignItems='center'
			direction='column'
			bgImage={banners[podcastData.id % banners.length]}
			bgSize='cover'
			mb='20px'
			py={{ base: '20px', md: '25px' }}
			px={{ base: '20px', md: '25px' }}
			borderRadius='30px'>
            <HStack spacing='20px'>
                {podcastData.image_url ? (
                    <Image
                        src={podcastData.image_url}
                        alt={podcastData.title}
                        w='120px'
                        h='120px'
                        borderRadius='10px'
                        objectFit='cover'
                        // ms='auto'
                        mr='10px'
                    />
                    ) : null}
                <VStack align='start' spacing='5px'>
                    <Text
                        px='15px'
                        py='5px'
                        borderRadius='10px'
                        bg='purple.900'
                        opacity='0.85'
                        fontSize={{ base: '24px', md: '34px' }}
                        color='white'
                        mb='14px'
                        w='fit-content'
                        fontWeight='700'
                        lineHeight={{ base: '32px', md: '42px' }}>
                        {podcastData.title}
                    </Text>
                    <Text
                        px='15px'
                        py='5px'
                        borderRadius='10px'
                        bg='purple.900'
                        opacity='0.85'
                        fontSize='md'
                        color='white'
                        maxW={'100%'}
                        fontWeight='500'
                        lineHeight='28px'>
                        {podcastData.description}
                    </Text>
                </VStack>
            </HStack>
		</Flex>
	);
}
