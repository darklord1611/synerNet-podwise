import { Button, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import logoWhite from 'assets/img/layout/logoWhite.png';

export default function SidebarDocs() {
	const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';
	const borderColor = useColorModeValue('white', 'navy.800');

	return (
		<Flex
			justify='center'
			direction='column'
			align='center'
			bg={bgColor}
			borderRadius='30px'
			me={{ base: '20px' }}
			position='relative'>
			{/* <Flex
				border='5px solid'
				borderColor={borderColor}
				bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
				borderRadius='50%'
				w='94px'
				h='94px'
				align='center'
				justify='center'
				mx='auto'
				position='absolute'
				left='50%'
				top='-47px'
				transform='translate(-50%, 0%)'>
				<Image src={logoWhite} w='40px' h='40px' />
			</Flex> */}
		</Flex>
	);
}
