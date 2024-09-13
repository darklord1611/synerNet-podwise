// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { IoIosMore } from "react-icons/io";
import { VscBroadcast } from 'react-icons/vsc';

export default function Default(podcast: Podcast) {
	const { id, name, description, author, thumbnailUrl } = podcast;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.700', 'secondaryGray.600');
	const cardColor = useColorModeValue('secondaryGray.400', 'navy.700');

	return (
		<Card py='15px' maxW='175px' _hover={{ bg: cardColor}}>
			<Flex 
                my='auto' 
                h='100%' 
                align={{ base: 'center', xl: 'start' }} 
                justify={{ base: 'center', xl: 'center' }}
                >
                <VStack align='start' spacing='10px' alignSelf='center' alignItems='center'>
                    {thumbnailUrl ? (
                        <Image
                            src={thumbnailUrl}
                            alt={name}
                            w='100px'
                            h='100px'
                            borderRadius='10px'
                            objectFit='cover'
                        />
                    ) : null}
					<HStack justifyContent='space-between' w='100%' spacing='10px'>
                        <Link 
                            href={`/dashboard/podcasts/${id}`}
                            color={textColor} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='700' 
                            lineHeight='100%' 
                            _hover={{ opacity: 0.7, textDecoration: 'underline' }}
                            >
                            {name}
                        </Link>
                            <Spacer />
                            <Icon 
                                as={IoIosMore}
                                w={5}
                                h={5}
                                color={textColorSecondary}
                                />
					</HStack>
				</VStack>
			</Flex>
		</Card>
	);
}
