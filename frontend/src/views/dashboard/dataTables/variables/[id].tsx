import { Box, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useSupabase } from "contexts/SupabaseContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PodcastBanner from "../components/PodcastBanner";

export default function PodcastDetail() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const location = useLocation();
    const podcastId = location.pathname.split('/').pop();

    const [podcast, setPodcasts] = useState([])
	const supabase = useSupabase()
	
	useEffect(() => {
		const fetchPodcasts = async () => {
			const { data, error } = await supabase
                .from('podcasts')
                .select('*')
                .eq('id', podcastId);
			if (error) {
				console.error('Error fetching podcasts:', error.message)
			} else {
				console.log(data[0])
				setPodcasts(data[0])
			}
		}

		fetchPodcasts()
	}, [supabase]);

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<PodcastBanner 
                podcastData={podcast}
            />
			<SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
                {/* {collections.find(collection => collection.id === parseInt(collectionId)).episodes.map(episode => (
                    <CollectionItems
                        episode={episode}
                    />
                ))} */}
			</SimpleGrid>
		</Box>
	);
}