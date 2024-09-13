// Chakra imports
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text, Image, VStack, Icon, HStack, Button, Link } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { FaArrowCircleRight } from 'react-icons/fa';
import { IoIosMore } from "react-icons/io";

export default function Default({ target }: { target: string }) {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	const cardColor = useColorModeValue('secondaryGray.400', 'navy.700');

	return (
		<Card w='fit-content' py='15px' _hover={{ bg: cardColor}}>
			<Flex my='auto' h='100%' align={{ base: 'center', xl: 'start' }} justify={{ base: 'center', xl: 'center' }}>
				<VStack align='start' spacing='10px' alignSelf='center'>
					<HStack spacing='10px'>
						{/* <Text color={textColor} fontSize='22px' textAlign='start' fontWeight='700' lineHeight='100%'>
							See More
						</Text>
						<Icon 
                            as={IoIosMore}
                            w={5}
                            h={5}
                        /> */}
                        <Icon 
                            as={FaArrowCircleRight}
                            w={7}
                            h={7}
                        />
						<Link 
                            fontSize='18px' 
                            href={`/dashboard/${target}`} 
                            _hover={{ textDecoration: 'underline' }}
                        >
							See more
						</Link>
					</HStack>
				</VStack>
			</Flex>
		</Card>
	);
}
