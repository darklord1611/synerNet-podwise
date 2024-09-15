// Chakra imports
import { Flex, Image, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column' w='100px'>
			<Image 
				src='https://api.iowen.cn/favicon/podwise.xyz.png' 
				alt='Podwise'
				w='64px' 
				h='64px' 
				color={logoColor}
				borderRadius={15}
			/>
			<HSeparator mb='20px' mt='20px' />
		</Flex>
	);
}

export default SidebarBrand;
