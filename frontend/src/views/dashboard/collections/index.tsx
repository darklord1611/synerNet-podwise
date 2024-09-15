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

import React from 'react';

// Chakra imports
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';

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
import CollectionsCard from 'components/card/CollectionsCard';

export default function Collections() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			{/* Main Fields */}
			<Grid
				mb='20px'
				gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
				gap={{ base: '20px', xl: '20px' }}
				display={{ base: 'block', xl: 'grid' }}>
				<Flex flexDirection='column' gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
					<Banner />
					<Flex direction='column'>
						<Flex
							mt='45px'
							mb='20px'
							justifyContent='space-between'
							direction={{ base: 'column', md: 'row' }}
							align={{ base: 'start', md: 'center' }}>
							<Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
								Trending Collections
							</Text>
						</Flex>
						<SimpleGrid columns={{ base: 1, md: 1 }} gap='20px'>
						<CollectionsCard
							id={1}
							title="Joe Rogan"
							description="The 10 Best Joe Rogan Expierence Podcast Episodes"
							thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						/>
						<CollectionsCard
							id={2}
							title="Health & Fitness"
							description="The Top 6 Health & Fitness Podcasts Episodes"
							thumbnailUrl="https://th.bing.com/th/id/R.7974e78087288a343b28107d54813c80?rik=5mpa%2fB8jOshQMQ&riu=http%3a%2f%2fwww.one55.com.au%2fwp-content%2fuploads%2f2020%2f09%2fshutterstock_1322949296-min.jpg&ehk=YpMsw%2bFx%2bj1w6geoCLP2WXdwsCwuYyxoM%2b6Nrkz09T4%3d&risl=&pid=ImgRaw&r=0"
						/>
						<CollectionsCard
							id={3}
							title="Business"
							description="The 10 Best Business Podcasts Episodes"
							thumbnailUrl="https://th.bing.com/th/id/R.15cc2230b021c4cb6f889e28c52c9393?rik=cXZXwAYWx9Xitw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1166323%2fimages%2fo-BUSINESS-DEAL-facebook.jpg&ehk=5LTrwAZaJng6sgj17zhiMKFusXBTW86A59GFHc9V3ls%3d&risl=&pid=ImgRaw&r=0"
						/>
						<CollectionsCard
							id={4}
							title="Joe Rogan"
							description="The 10 Best Joe Rogan Expierence Podcast Episodes"
							thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						/>
						<CollectionsCard
							id={5}
							title="Joe Rogan"
							description="The 10 Best Joe Rogan Expierence Podcast Episodes"
							thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						/>
						<CollectionsCard
							id={6}
							title="Joe Rogan"
							description="The 10 Best Joe Rogan Expierence Podcast Episodes"
							thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						/>

						</SimpleGrid>
					</Flex>
				</Flex>
				<Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}>
					<Card px='0px' mb='20px'>
						<TableTopCreators tableData={tableDataTopCreators}  />
					</Card>
					<Card p='0px'>
						<Flex
							align={{ sm: 'flex-start', lg: 'center' }}
							justify='space-between'
							w='100%'
							px='22px'
							py='18px'>
							<Text color={textColor} fontSize='xl' fontWeight='600'>
								Listening History
							</Text>
							<Button variant='action'>See all</Button>
						</Flex>
						<CollectionsCard
							id={1}
							title="Joe Rogan"
							description="The 10 Best Joe Rogan Expierence Podcast Episodes"
							thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						/>
						<CollectionsCard
							id={2}
							title="Health & Fitness"
							description="The Top 6 Health & Fitness Podcasts Episodes"
							thumbnailUrl="https://th.bing.com/th/id/R.7974e78087288a343b28107d54813c80?rik=5mpa%2fB8jOshQMQ&riu=http%3a%2f%2fwww.one55.com.au%2fwp-content%2fuploads%2f2020%2f09%2fshutterstock_1322949296-min.jpg&ehk=YpMsw%2bFx%2bj1w6geoCLP2WXdwsCwuYyxoM%2b6Nrkz09T4%3d&risl=&pid=ImgRaw&r=0"
						/>
						<CollectionsCard
							id={3}
							title="Business"
							description="The 10 Best Business Podcasts Episodes"
							thumbnailUrl="https://th.bing.com/th/id/R.15cc2230b021c4cb6f889e28c52c9393?rik=cXZXwAYWx9Xitw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1166323%2fimages%2fo-BUSINESS-DEAL-facebook.jpg&ehk=5LTrwAZaJng6sgj17zhiMKFusXBTW86A59GFHc9V3ls%3d&risl=&pid=ImgRaw&r=0"
						/>
						<CollectionsCard
							id={5}
							title="Joe Rogan"
							description="The 10 Best Joe Rogan Expierence Podcast Episodes"
							thumbnailUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg"
						/>
					</Card>
				</Flex>
			</Grid>
			{/* Delete Product */}
		</Box>
	);
}
