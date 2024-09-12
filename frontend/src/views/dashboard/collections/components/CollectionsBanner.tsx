// Chakra imports
import { Button, Flex, Link, Text } from '@chakra-ui/react';

// Assets
import banner1 from 'assets/img/nfts/Nft1.png';
import banner2 from 'assets/img/nfts/Nft2.png';
import banner3 from 'assets/img/nfts/Nft3.png';
import banner4 from 'assets/img/nfts/Nft4.png';
import banner5 from 'assets/img/nfts/Nft5.png';
import banner6 from 'assets/img/nfts/Nft6.png';

export default function CollectionBanner(props: { collectionData: any}) {
    const { collectionData } = props;
	const banners = [banner1, banner2, banner3, banner4, banner5, banner6];
	// Chakra Color Mode
	return (
		<Flex
			alignItems='center'
			direction='column'
			bgImage={banners[collectionData.id % banners.length]}
			bgSize='cover'
			mb='20px'
			py={{ base: '20px', md: '56px' }}
			px={{ base: '20px', md: '64px' }}
			borderRadius='30px'>
			<Text
				px='15px'
				py='5px'
				borderRadius='25px'
				bg='purple.900'
				opacity='0.85'
				fontSize={{ base: '24px', md: '34px' }}
				color='white'
				mb='14px'
				maxW={{
					base: '100%',
					md: '64%',
					lg: '46%',
					xl: '70%',
					'2xl': '50%',
					'3xl': '42%'
				}}
				fontWeight='700'
				lineHeight={{ base: '32px', md: '42px' }}>
				{collectionData.title}
			</Text>
			<Text
				px='15px'
				py='5px'
				borderRadius='25px'
				bg='purple.900'
				opacity='0.85'
				fontSize='md'
				color='white'
				maxW={{
					base: '100%',
					md: '64%',
					lg: '40%',
					xl: '56%',
					'2xl': '46%',
					'3xl': '34%'
				}}
				fontWeight='500'
				lineHeight='28px'>
				{collectionData.description}
			</Text>
		</Flex>
	);
}
