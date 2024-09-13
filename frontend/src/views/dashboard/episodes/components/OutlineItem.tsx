import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Divider, HStack, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegLightbulb } from "react-icons/fa6";
import Timestamp from "./Timestamp";

interface OutlineType {
    timestamp: number;
    title: string;
    description: string;
}

export default function OutlineItem(props: { outline: OutlineType[], onSeek?: (time: number) => void }) {
    const { outline, onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'yellow');
	const brandColor = useColorModeValue('brand.100', 'brand.300');
    const boxBg = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
    
    return (
        <Accordion allowMultiple w={"full"}>
            {outline.map((outline) => {
                return (
                    <AccordionItem>
                        <AccordionButton>
                            <VStack spacing='10px' w='full' alignItems='start'>
                                <Timestamp seconds={outline.timestamp} onSeek={onSeek} withAvatar={true}/>
                                <Box as='span' flex='1' textAlign='left' >
                                    <Text 
                                        fontWeight={500} 
                                        color={textColor}
                                        fontSize='18px'
                                        w='fit-content'
                                        >
                                        {outline.title}
                                    </Text>
                                </Box>
                            </VStack>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4} bg={boxBg} borderRadius='10px'>
                            <Text 
                                fontWeight={400} 
                                color={textColor}
                                fontSize='16px'
                                w='fit-content'
                                >
                                {outline.description}
                            </Text>
                            
                        </AccordionPanel>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}