// Chakra imports
import { Button, Flex, Link, Text } from '@chakra-ui/react';

// Assets
import banner from 'assets/img/nfts/banner.jpeg';

export default function Banner() {
	// Chakra Color Mode
	return (
		<Flex
			alignItems='end'
			direction='column'
			bgImage={banner}
			bgSize='inherit'
			py={{ base: '30px', md: '56px' }}
			px={{ base: '30px', md: '64px' }}
			borderRadius='30px'>
			<Text
				mt='20px'
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
				Discover, enjoy, and hottest collections
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
				mb='20px'
				lineHeight='28px'>
				Tune in to the latest episodes, explore trending topics, and immerse yourself in stories that captivate!
			</Text>
		</Flex>
	);
}
