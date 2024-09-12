import { VStack, Image, HStack,Text, useColorModeValue, Icon } from "@chakra-ui/react";
import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import Timestamp from "./Timestamp";

export function SpeakerAvatar(props: { sentence: any, onSeek: (time: number) => void }) {
    const { sentence, onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
    const brandColor = useColorModeValue('brand.100', 'brand.300');
    const avatars = [avatar1, avatar2, avatar3];
    return (
        <HStack spacing='10px' borderRadius='15px' bg={brandColor} py={1} px={2}>
            <Image
                src={avatars[sentence.speaker]}
                alt={sentence.speaker}
                w='40px'
                h='40px'
                borderRadius='50%'
                />
            <VStack align='start' spacing='2px' alignSelf='center' maxW='950px'>
                <Timestamp seconds={sentence.start} withAvatar={true} onSeek={onSeek}/>
                <Text 
                    color={textColor} 
                    fontSize='18px' 
                    textAlign='start' 
                    fontWeight='600' 
                    lineHeight='100%'
                    >
                    Speaker {sentence.speaker}
                </Text>
            </VStack>
        </HStack>
    )
}