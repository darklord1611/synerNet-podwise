import { Box, Card, Divider, HStack, Icon, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import Sentence from "views/dashboard/episodes/components/Sentence";
import Timestamp from "views/dashboard/episodes/components/Timestamp";

export default function HighlightCard(props: { hightlight: { highlight: string, timestamp: number}, onSeek?: (time: number) => void }) {
    const { highlight, timestamp } = props.hightlight;
    const { onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'yellow');
	const brandColor = useColorModeValue('brand.100', 'brand.300');
    const hover = useColorModeValue('gray.300', 'navy.600');
    const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
    const buttonColor = useColorModeValue('white', 'brand.400');

    const toast = useToast()
    
    return (
        <Box p={3} alignItems='start' w='full'>
            <VStack align='start' spacing='10px' alignSelf='center' w='full'>
                <Card 
                    mt={3} 
                    p={3} 
                    bg={boxBg} 
                    borderRadius='10px' 
                    w='full' 
                    _hover={{ bg: hover}}>
                        {/* {sentence.map((sentence) => {
                        return ( */}
                            <Text 
                                fontWeight={400} 
                                color={textColor}
                                _hover={{ bg: brandColor}} 
                                w='fit-content'
                                >{highlight}
                            </Text>
                        {/* )
                    })} */}
                    <HStack mt={2} spacing='10px'>
                        <Box 
                            px={2} 
                            py={1} 
                            w='fit-content' 
                            bg={buttonColor} 
                            borderRadius='5px' 
                            borderColor={boxBg}>
                            <Timestamp seconds={timestamp} withAvatar={true} onSeek={onSeek}/>
                        </Box>
                        <Box 
                            px={2} 
                            py={1} 
                            w='fit-content' 
                            bg={buttonColor} 
                            borderRadius='5px' 
                            borderColor={boxBg} 
                            _hover={{ opacity: 0.8}}>
                            <Icon 
                                as={FaCopy}
                                w={4}
                                h={4}
                                borderRadius='5px'
                                onClick={() =>
                                    toast({
                                      title: 'Copy to clipboard',
                                      status: 'info',
                                      duration: 2500,
                                      isClosable: true,
                                    })
                                  }
                                />
                        </Box>
                    </HStack>
                </Card>
            </VStack>
        </Box>
    )
}