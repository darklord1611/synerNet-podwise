// Chakra imports
import { Flex, useColorModeValue, Text, Image, VStack, Icon, HStack, Spacer, Link, Tooltip } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { IoIosMore } from "react-icons/io";
import { PiTimerBold } from "react-icons/pi";
import { VscBroadcast } from 'react-icons/vsc';

export default function CollectionItems(props: { episode: any }) {
	const { id, name, description, publishedDate, duration, podcastName, thumbnailUrl } = props.episode;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.700', 'secondaryGray.600');
	const cardColor = useColorModeValue('secondaryGray.400', 'navy.700');

	return (
		<Card alignItems='start' py='15px' _hover={{ bg: cardColor}}>
			<Flex 
                my='auto' 
                h='100%' 
                align={{ base: 'center', xl: 'start' }} 
                justify={{ base: 'center', xl: 'center' }}
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
                        mx='20px'
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
					<Link 
                        href={`/dashboard/episodes/${id}`}
                        color={textColor} 
                        fontSize='22px' 
                        textAlign='start' 
                        fontWeight='700' 
                        lineHeight='100%'
                        _hover={{ opacity: 0.7, textDecoration: 'underline' }}
                        >
						{name}
					</Link>
                    <Tooltip label={description}>
                        <Text 
                            color={textColorSecondary} 
                            fontSize='16px' 
                            textAlign='start' 
                            fontWeight='500' 
                            lineHeight='100%'
                            w='100%'
                            maxW='inherit'
                            isTruncated
                            >
                            {description}
                        </Text>
                    </Tooltip>
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
