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

import React, { useEffect, useState } from 'react';

// Chakra imports
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid, Menu, MenuButton, MenuList, MenuItem, HStack } from '@chakra-ui/react';

// Custom components
import Banner from 'views/dashboard/collections/components/Banner';
import TableTopCreators from 'views/dashboard/episodes/components/TableTopCreators';
import HistoryItem from 'views/dashboard/episodes/components/HistoryItem';
import NFT from 'components/card/NFT';
import Card from 'components/card/Card';

// Assets
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import tableDataTopCreators from 'views/dashboard/episodes/variables/tableDataTopCreators'; 
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaFilter } from 'react-icons/fa';
import { ColumnDef, createColumnHelper, getCoreRowModel, getPaginationRowModel, PaginationState, RowModel, Table, useReactTable } from '@tanstack/react-table';
import EpisodeCard from 'components/card/EpisodeCard';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useSupabase } from 'contexts/SupabaseContext';
import PodcastCard from 'components/card/PodcastCard';

const data = [
	{
		id: 1,
		title: "#1554 - Kanye West",
		description: "Kanye West is a rapper, record producer, fashion designer, and current independent candidate for office in the 2020 United States Presidential Election.",
		publishedDate: "Oct 24, 2020",
		duration: "3h 23m",
		podcastName: "Joe Rogan Experience",
		podcastId: 1,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	},
	{
		id: 2,
		title: "#1916 - Jon Bernthal",
		description: "Jon Bernthal is an American actor best known for his roles as Shane Walsh on the AMC series The Walking Dead and as Frank Castle / The Punisher in the Marvel Cinematic Universe.",
		publishedDate: "Oct 21, 2020",
		duration: "4h 12m",
		podcastName: "Joe Rogan Experience",
		podcastId: 2,
		thumbnailUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
	}
]

const columns: ColumnDef<Podcast>[] = [
	{
	  accessorKey: 'name', // Refers to the 'name' field in the data
	  cell: info => info.getValue(),
	},
  ];


export default function Podcast() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	const bg = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const [podcast, setPodcasts] = useState([])
	const supabase = useSupabase()
	
	useEffect(() => {
		const fetchPodcasts = async () => {
			const { data, error } = await supabase.from('podcasts').select('*');
			if (error) {
				console.error('Error fetching podcasts:', error.message)
			} else {
				console.log(data)
				setPodcasts(data)
			}
		}

		fetchPodcasts()
	}, [supabase]);

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	})

	const table = useReactTable({
		data: podcast,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
    	onPaginationChange: setPagination,
		state: {
			pagination,
		},
	})

	const [currentFilter, setCurrentFilter] = React.useState('A-Z');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<HStack spacing='10px' mb='10px'>
				<SearchBar
					mb={{ base: '10px', md: 'unset' }}
					me='10px'
					borderRadius='30px'
					background={bg}
				/>
				<Menu>
					<MenuButton
						minW='135px'
						as={Button} 
						leftIcon={<FaFilter/>}
						rightIcon={<ChevronDownIcon />}
						color={textColor}
						bg={bg}
						defaultValue='asc'
						>
						{currentFilter}
					</MenuButton>
					<MenuList minWidth='150px'>
						<MenuItem 
							value='asc' 
							onClick={() => setCurrentFilter('A-Z')}>
							A-Z
						</MenuItem>
						<MenuItem 
							value='desc' 
							onClick={() => setCurrentFilter('Z-A')}>
							Z-A
						</MenuItem>
						<MenuItem 
							value='latest' 
							onClick={() => setCurrentFilter('Latest')}>
							Latest
						</MenuItem>
						<MenuItem 
							value='oldest' 
							onClick={() => setCurrentFilter('Oldest')}>
							Oldest
						</MenuItem>
					</MenuList>
				</Menu>
				<HStack color={textColor} fontWeight={600} fontSize='sm' spacing='10px'>
					<Button 
						bg={bg}
						borderRadius={10}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						>
						<MdNavigateBefore />
					</Button>
					<Box borderColor={textColor} borderWidth='1px' borderRadius='5px' px='7px'>
						{table.getState().pagination.pageIndex + 1} 
					</Box>
					<Text>of{' '}{table.getPageCount().toLocaleString()}</Text>
					<Button 
						bg={bg}
						borderRadius={10}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						>
						<MdNavigateNext/>
					</Button>
				</HStack>
			</HStack>
			<table width='100%' cellPadding='10px' cellSpacing='10px'>
				<tbody>
					{table.getRowModel().rows.reduce((rows: JSX.Element[], row, index, array) => {
						if (index % 6 === 0) {
							rows.push(
								<tr key={index}>
									{array.slice(index, index + 6).map((row) => {
										return (
											<td key={row.id}>
												<PodcastCard 
													podcast={row.original}
												/>
											</td>
										)
									})}
								</tr>
							);
						}
					return rows;
					}, [])}
				</tbody>
			</table>
		</Box>
	);
}
