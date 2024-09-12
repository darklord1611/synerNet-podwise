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

const episodes = [
	{
		id: 1,
		name: "do i wanna look pretty or interesting? a talk with emma",
		description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
		publishedDate: "Oct 24, 2020",
		duration: "3h 23m",
		podcastName: "Joe Rogan Experience",
		podcastId: 1,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
	},
	{
		id: 2,
		name: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		name: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		name: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		name: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	}
]


export default function Userreports() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
				<BreadcrumbItem mb={5}>
					<Icon w='20px' h='20px' as={BsCollectionPlayFill} mr='10px'/>
					<BreadcrumbLink href='/dashboard/collections'>Collections</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
				<CollectionsCard
					id={1}
					title="Joe Rogan"
					description="The 10 Best Joe Rogan Expierence Podcast Episodes"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[
						{
							id:1,
							name: "Joe Rogan Experience #1554 - Kanye West",
							description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "Joe Rogan Experience",
							podcastId: 1,
							thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						}
					]}
				/>
				<CollectionsCard
					id={2}
					title="Health & Fitness"
					description="The Top 6 Health & Fitness Podcasts Episodes"
					thumbnailUrl="https://th.bing.com/th/id/R.7974e78087288a343b28107d54813c80?rik=5mpa%2fB8jOshQMQ&riu=http%3a%2f%2fwww.one55.com.au%2fwp-content%2fuploads%2f2020%2f09%2fshutterstock_1322949296-min.jpg&ehk=YpMsw%2bFx%2bj1w6geoCLP2WXdwsCwuYyxoM%2b6Nrkz09T4%3d&risl=&pid=ImgRaw&r=0"
					episodes={[
						{
							id:1,
							name: "Resistance training for time efficiency, body composition, and maximum hypertrophy | Brad Schoenfeld, Ph.D.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "2",
							podcastId: 1,
							thumbnailUrl: "https://th.bing.com/th/id/R.7974e78087288a343b28107d54813c80?rik=5mpa%2fB8jOshQMQ&riu=http%3a%2f%2fwww.one55.com.au%2fwp-content%2fuploads%2f2020%2f09%2fshutterstock_1322949296-min.jpg&ehk=YpMsw%2bFx%2bj1w6geoCLP2WXdwsCwuYyxoM%2b6Nrkz09T4%3d&risl=&pid=ImgRaw&r=0"
						},
						{
							id:1,
							name: "Resistance training for time efficiency, body composition, and maximum hypertrophy | Brad Schoenfeld, Ph.D.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "2",
							podcastId: 1,
							thumbnailUrl: "https://th.bing.com/th/id/R.7974e78087288a343b28107d54813c80?rik=5mpa%2fB8jOshQMQ&riu=http%3a%2f%2fwww.one55.com.au%2fwp-content%2fuploads%2f2020%2f09%2fshutterstock_1322949296-min.jpg&ehk=YpMsw%2bFx%2bj1w6geoCLP2WXdwsCwuYyxoM%2b6Nrkz09T4%3d&risl=&pid=ImgRaw&r=0"
						}
					]}
				/>
				<CollectionsCard
					id={3}
					title="Business"
					description="The 10 Best Business Podcasts Episodes"
					thumbnailUrl="https://th.bing.com/th/id/R.15cc2230b021c4cb6f889e28c52c9393?rik=cXZXwAYWx9Xitw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1166323%2fimages%2fo-BUSINESS-DEAL-facebook.jpg&ehk=5LTrwAZaJng6sgj17zhiMKFusXBTW86A59GFHc9V3ls%3d&risl=&pid=ImgRaw&r=0"
					episodes={[
						{
							id:1,
							name: "Resistance training for time efficiency, body composition, and maximum hypertrophy | Brad Schoenfeld, Ph.D.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "2",
							podcastId: 1,
							thumbnailUrl: "https://th.bing.com/th/id/R.15cc2230b021c4cb6f889e28c52c9393?rik=cXZXwAYWx9Xitw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1166323%2fimages%2fo-BUSINESS-DEAL-facebook.jpg&ehk=5LTrwAZaJng6sgj17zhiMKFusXBTW86A59GFHc9V3ls%3d&risl=&pid=ImgRaw&r=0"
						},
						{
							id:1,
							name: "Resistance training for time efficiency, body composition, and maximum hypertrophy | Brad Schoenfeld, Ph.D.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "2",
							podcastId: 1,
							thumbnailUrl: "https://th.bing.com/th/id/R.15cc2230b021c4cb6f889e28c52c9393?rik=cXZXwAYWx9Xitw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1166323%2fimages%2fo-BUSINESS-DEAL-facebook.jpg&ehk=5LTrwAZaJng6sgj17zhiMKFusXBTW86A59GFHc9V3ls%3d&risl=&pid=ImgRaw&r=0"
						},
						{
							id:1,
							name: "Resistance training for time efficiency, body composition, and maximum hypertrophy | Brad Schoenfeld, Ph.D.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "2",
							podcastId: 1,
							thumbnailUrl: "https://th.bing.com/th/id/R.15cc2230b021c4cb6f889e28c52c9393?rik=cXZXwAYWx9Xitw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1166323%2fimages%2fo-BUSINESS-DEAL-facebook.jpg&ehk=5LTrwAZaJng6sgj17zhiMKFusXBTW86A59GFHc9V3ls%3d&risl=&pid=ImgRaw&r=0"
						}
					]}
				/>
				<CollectionsCard
					id={4}
					title="Joe Rogan"
					description="The 10 Best Joe Rogan Expierence Podcast Episodes"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[
						{
							id:1,
							name: "Joe Rogan Experience #1554 - Kanye West",
							description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "1",
							podcastId: 1,
							thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						}
					]}
				/>
				<CollectionsCard
					id={5}
					title="Joe Rogan"
					description="The 10 Best Joe Rogan Expierence Podcast Episodes"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[
						{
							id:1,
							name: "Joe Rogan Experience #1554 - Kanye West",
							description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
							publishedDate: "Oct 24, 2020",
							duration: "3h 23m",
							podcastName: "1",
							podcastId: 1,
							thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						}
					]}
				/>
				<MoreCard
					target='collections'
				/>
			</SimpleGrid>
			<Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
				<BreadcrumbItem mb={5}>
					<Icon w='20px' h='20px' as={LuLibrary} mr='10px'/>
					<BreadcrumbLink href='/dashboard/episodes'>Episodes</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				{episodes.map((episode) => {
					return (
						<EpisodeCard 
							episode={episode}
						/>
					)
				})}
				<MoreCard 
					target='episodes'
					/>
				{/* <TotalSpent />
				<WeeklyRevenue /> */}
			</SimpleGrid>
			<Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
				<BreadcrumbItem mb={5}>
					<Icon w='20px' h='20px' as={VscBroadcast} mr='10px'/>
					<BreadcrumbLink href='/dashboard/podcast'>Podcasts</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<SimpleGrid columns={{ base: 3, md: 3, xl: 6 }} gap='20px' mb='20px'>
				<PodcastCard
					id={1}
					name="The Joe Rogan Experience"
					description="The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond."
					author="Joe Rogan"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[]}
				/>
				<PodcastCard
					id={1}
					name="The AI election deepfakes have arrived"
					description="The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond."
					author="Joe Rogan"
					thumbnailUrl="https://megaphone.imgix.net/podcasts/5c6a4f4a-e69c-11e8-8066-17a10182e4c8/image/The_Verge_Decoder_Tileart_3000.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress"
					episodes={[]}
				/>
				<PodcastCard
					id={1}
					name="The Joe Rogan Experience"
					description="The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond."
					author="Joe Rogan"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[]}
				/>
				<PodcastCard
					id={1}
					name="The Joe Rogan Experience"
					description="The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond."
					author="Joe Rogan"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[]}
				/>
				<PodcastCard
					id={1}
					name="The Joe Rogan Experience"
					description="The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond."
					author="Joe Rogan"
					thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
					episodes={[]}
				/>
				<MoreCard
					target='podcasts'
				/>
				{/* <CheckTable tableData={tableDataCheck} />
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<DailyTraffic />
					<PieCard />
				</SimpleGrid> */}
			</SimpleGrid>
			<Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
				<BreadcrumbItem mb={5}>
					<Icon w='20px' h='20px' as={VscServerProcess} mr='10px'/>
					<BreadcrumbLink href='/dashboard/latest'>Latest Processed</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				{episodes.map((episode) => {
					return (
						<EpisodeCard 
							episode={episode}
						/>
					)
				})}
			</SimpleGrid>
		</Box>
	);
}
