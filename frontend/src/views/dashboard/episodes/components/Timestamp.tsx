import { border, Box, Divider, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { LuPlay } from "react-icons/lu";

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds =  Math.floor(seconds % 60);

    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    if (hours > 0) {
        // If hours are greater than 0, include hours in the format
        const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    } else {
        // If hours are 0, skip hours and only include minutes and seconds
        return `${minutesStr}:${secondsStr}`;
    }
}

export default function Timestamp(props: { seconds: number, withAvatar?: boolean, onSeek?: (time: number) => void }) {
    const { seconds, withAvatar, onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
    const brandColor = useColorModeValue('brand.500', 'brand.400');

    const handleClick = (time: number) => {
        if (onSeek) {
            onSeek(time);
        }
    };
    
    return (
        <HStack spacing='5px'>
            {!withAvatar && (<Box h='35px' w='4px' bg='brand.400' borderRadius='5px' mr={4}/>)}
            <Icon 
                as={LuPlay}
                w={4}
                h={4}
                color={textColorSecondary}
                />
            <Text 
                color={textColor}
                fontWeight='bold'
                _hover={{ textDecoration: 'underline', cursor: 'pointer'} } 
                onClick={() => handleClick(seconds)}
                >
                {formatTime(seconds)}
            </Text>
        </HStack>
    )
}