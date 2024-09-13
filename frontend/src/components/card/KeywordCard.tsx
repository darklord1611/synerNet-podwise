import { Box, Card, Divider, HStack, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegLightbulb } from "react-icons/fa6";

export default function KeywordCard(props: { keyword: { word: string, definition: string} }) {
    const { word, definition } = props.keyword;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'yellow');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
    const hover = useColorModeValue('gray.300', 'navy.600');
    const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
    
    return (
        <Box p={3} alignItems='start' w='full'>
            <VStack align='start' spacing='10px' alignSelf='center' w='full'>
                <HStack spacing='5px'>
                    <Icon 
                        as={FaRegLightbulb}
                        w={4}
                        h={4}
                        color={textColorSecondary}
                    />
                    <Text 
                        color={textColor} 
                        fontSize='18px' 
                        textAlign='start' 
                        fontWeight='600' 
                        lineHeight='100%'
                        >
                        {word}
                    </Text>
                </HStack>
                <Divider w='full' borderColor='brand'/>
                <Card mt={3} p={3} bg={boxBg} borderRadius='10px' w='full' _hover={{ bg: hover}}>
                    <Text 
                        color={textColor} 
                        fontSize='16px' 
                        textAlign='start' 
                        fontWeight='400' 
                        lineHeight='175%'
                        >
                        {definition}
                    </Text>
                </Card>
            </VStack>
        </Box>
    )
}