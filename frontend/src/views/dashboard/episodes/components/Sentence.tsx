import { Box, Card, Divider, HStack, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegLightbulb } from "react-icons/fa6";

export default function Sentence(props: { content: string[], start: number, onSeek?: (time: number) => void }) {
    const { content, start, onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'yellow');
	const brandColor = useColorModeValue('brand.100', 'brand.300');
    const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');

    const handleClick = (time: number) => {
        if (onSeek) {
            onSeek(time);
        }
    };
    
    return (
        <Box p={3} alignItems='start' bg={boxBg} borderRadius='10px'>
            {content.map((sentence) => {
                return (
                    <Text 
                        fontWeight={400} 
                        color={textColor}
                        fontSize='16px'
                        _hover={{ bg: brandColor}} 
                        w='fit-content'
                        onClick={() => handleClick(start)}
                        >{sentence}
                    </Text>
                )
            })}
        </Box>
    )
}