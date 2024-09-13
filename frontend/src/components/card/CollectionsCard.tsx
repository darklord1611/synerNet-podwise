// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { IoIosMore } from "react-icons/io";

export default function Default(collection: Collection) {
	const { id, title, description, thumbnailUrl, episodes } = collection;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.700', 'secondaryGray.600');
	const cardColor = useColorModeValue('secondaryGray.400', 'navy.700');

	return (
		<Card py='15px' _hover={{ bg: cardColor}}>
			<Flex 
				my='auto' 
				h='100%' 
				align={{ base: 'center', xl: 'start' }} 
				justify={{ base: 'center', xl: 'center' }}
				justifyContent='space-between'
				>
				<VStack align='start' spacing='10px' alignSelf='center'>
					<Link 
						href={`/dashboard/collections/${id}`} 
						color={textColor} 
						fontSize='28px' 
						textAlign='start' 
						fontWeight='700' 
						lineHeight='100%' 
						_hover={{ opacity: 0.7, textDecoration: 'underline' }}
						>
						{title}
					</Link>
					<Text 
						color={textColorSecondary} 
						fontSize='14px' 
						textAlign='start' 
						fontWeight='500' 
						lineHeight='100%'
						>
						{description}
					</Text>
					<HStack spacing='10px' justifyContent='space-between' w='95%'>
						<Text 
							color={textColorSecondary} 
							fontSize='14px' 
							textAlign='start' 
							fontWeight='300' 
							lineHeight='100%'
							>
							{episodes.length} episodes
						</Text>
						<Spacer />
						<Icon 
                            as={IoIosMore}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                            />
					</HStack>
				</VStack>
				
				
				{thumbnailUrl ? (
					<Image
						src={thumbnailUrl}
						alt={title}
						w='100px'
						h='100px'
						borderRadius='10px'
						objectFit='cover'
						ms='auto'
						ml='10px'
					/>
				) : null}
			</Flex>
		</Card>
	);
}
