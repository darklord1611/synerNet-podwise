// Chakra imports
import { Flex, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { IoIosMore } from "react-icons/io";
import { VscBroadcast } from 'react-icons/vsc';

export default function Default(props: {episode: Espisode}) {
	const { id, name, description, publishedDate, duration, podcastName, podcastId, thumbnailUrl } = props.episode;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.700', 'secondaryGray.600');
	const cardColor = useColorModeValue('secondaryGray.400', 'navy.700');

	return (
		<Card py='15px' _hover={{ bg: cardColor}}>
			<Flex 
                my='auto' 
                h='100%' 
                align={{ base: 'center', xl: 'start' }} 
                justify={{ base: 'center', xl: 'start' }}
                // justifyContent='space-between'
                >
				{thumbnailUrl ? (
					<Image
						src={thumbnailUrl}
						alt={name}
						w='100px'
						h='100px'
						borderRadius='10px'
						objectFit='cover'
						// ms='auto'
                        mr='10px'
					/>
				) : null}
                <VStack align='start' spacing='10px' alignSelf='center' w={'full'}>
					<Link 
                        href={`/dashboard/episodes/${id}`}
                        maxW='380px' 
                        color={textColor} 
                        fontSize='22px' 
                        textAlign='start' 
                        fontWeight='700' 
                        lineHeight='100%'
                        _hover={{ opacity: 0.7, textDecoration: 'underline' }}
                        >
						{name}
					</Link>
					<HStack justifyContent='space-between' w='100%' spacing='10px'>
                        <Icon 
                            as={VscBroadcast}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                            />
						<Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            >
                            {podcastName}
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
			</Flex>
		</Card>
	);
}
