/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { BsCollectionPlayFill } from "react-icons/bs";
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import CollectionsCard from 'components/card/CollectionsCard';
import IconBox from 'components/icons/IconBox';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
import CheckTable from 'views/dashboard/rtl/components/CheckTable';
import ComplexTable from 'views/dashboard/trending/components/ComplexTable';
import DailyTraffic from 'views/dashboard/trending/components/DailyTraffic';
import PieCard from 'views/dashboard/trending/components/PieCard';
import Tasks from 'views/dashboard/trending/components/Tasks';
import TotalSpent from 'views/dashboard/trending/components/TotalSpent';
import WeeklyRevenue from 'views/dashboard/trending/components/WeeklyRevenue';
import tableDataCheck from 'views/dashboard/trending/variables/tableDataCheck';
import tableDataComplex from 'views/dashboard/trending/variables/tableDataComplex';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { LuLibrary } from 'react-icons/lu';
import MoreCard from 'components/card/MoreCard';
import EpisodeCard from 'components/card/EpisodeCard';
import { VscBroadcast, VscServerProcess } from 'react-icons/vsc';
import PodcastCard from 'components/card/PodcastCard';
import CollectionBanner from '../components/CollectionsBanner';
import { useLocation } from 'react-router-dom';
import CollectionItems from '../components/CollectionItem';

const collections = [
    {
        id: 1,
        title: "Joe Rogan",
        description: "The 10 Best Joe Rogan Expierence Podcast Episodes",
        thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
        episodes: [
            {
                id: 1,
                name: "#1554 - Kanye West",
                description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
                publishedDate: "Oct 24, 2020",
                duration: "3h 23m",
                podcastName: "Joe Rogan Experience",
                thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
            },
            {
                id: 2,
                name: "#1916 - Jon Bernthal",
                description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
                publishedDate: "Oct 21, 2020",
                duration: "4h 12m",
                podcastName: "Joe Rogan Experience",
                thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
            }
        ]
    },
    {
        id: 2,
        title: "Joe Rogan",
        description: "The 10 Best Joe Rogan Expierence Podcast Episodes",
        thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
        episodes: [
            {
                id: 1,
                name: "#1916 - Jon Bernthal",
                description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
                publishedDate: "Oct 21, 2020",
                duration: "4h 12m",
                podcastName: "Joe Rogan Experience",
                thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
            },
            {
                id: 2,
                name: "#1554 - Kanye West",
                description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
                publishedDate: "Oct 24, 2020",
                duration: "3h 23m",
                podcastName: "Joe Rogan Experience",
                thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
            }
        ]
    }
]

export default function CollectionDetail() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const location = useLocation();
    const collectionId = location.pathname.split('/').pop();

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<CollectionBanner 
                collectionData={collections.find(collection => collection.id === parseInt(collectionId))}
            />
			<SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
                {collections.find(collection => collection.id === parseInt(collectionId)).episodes.map(episode => (
                    <CollectionItems
                        episode={episode}
                    />
                ))}
			</SimpleGrid>
		</Box>
	);
}
