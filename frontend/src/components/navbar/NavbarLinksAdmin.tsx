// Chakra Imports
import {
	Avatar,
	Button,
	Flex,
	Icon,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
	useColorMode,
	Tooltip,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalCloseButton,
	ModalContent,
	ModalBody,
	ModalFooter,
	// useToast
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// Assets
import navImage from 'assets/img/layout/Navbar.png';
import { MdInfo } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FaEthereum, FaYoutube, FaRss, FaExternalLinkAlt } from 'react-icons/fa';
import routes from 'routes';
import { ExternalLinkIcon } from '@chakra-ui/icons';
export default function HeaderLinks(props: { secondary: boolean }) {
	const { secondary } = props;
	const { colorMode, toggleColorMode } = useColorMode();
	const [showYtbPopUp, setShowYtbPopUp] = useState(false);
	const [showRssPopUp, setShowRssPopUp] = useState(false);

	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');
	const ethColor = useColorModeValue('gray.700', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const ethBox = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
	const [isProcessing, setIsProcessing] = useState(false);
	// const toast = useToast();

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const url = (event.target as HTMLButtonElement).previousElementSibling?.querySelector('input')?.value;
		setIsProcessing(true);

		try {
			const response = await fetch('https://8080-01j7q9srfa9kc6yyskwzg2mbqb.cloudspaces.litng.ai/process_input', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					audio_url: url,
					is_youtube_url: true
				})
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('Error importing YouTube URL:', error);
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems='center'
			flexDirection='row'
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p='10px'
			borderRadius='30px'
			boxShadow={shadow}>
			<SearchBar
				mb={() => {
					if (secondary) {
						return { base: '10px', md: 'unset' };
					}
					return 'unset';
				}}
				me='10px'
				borderRadius='30px'
			/>
			<SidebarResponsive routes={routes} />
			<Tooltip label='Import from Youtube' placement='bottom'>
				<Button
					variant='no-hover'
					bg='transparent'
					p='0px'
					minW='unset'
					minH='unset'
					h='18px'
					w='max-content'
					onClick={() => setShowYtbPopUp(!showYtbPopUp)}>
						<Icon
							me='10px'
							h='18px'
							w='18px'
							color={navbarIcon}
							as={FaYoutube}
						/>
				</Button>
			</Tooltip>
			<Modal 
				closeOnOverlayClick={true}
				blockScrollOnMount={true} 
				isOpen={showYtbPopUp || showRssPopUp} 
				onClose={() => showYtbPopUp ? setShowYtbPopUp(!showYtbPopUp) : setShowRssPopUp(!showRssPopUp)}
				>
				<ModalOverlay />
					<ModalContent>
					<ModalHeader>Import podcast from {showYtbPopUp ? 'Youtube' : 'RSS'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SearchBar 
							placeholder={
								showYtbPopUp ? 
								'Enter your Youtube channel URL here' : 
								'Enter your RSS feed URL here'
							}
							mb={() => {
								if (secondary) {
									return { base: '10px', md: 'unset' };
								}
								return 'unset';
							}}
							me='10px'
							borderRadius='30px'
						/>
						<Button variant='brand' onClick={handleSubmit} mt='10px' w='100%' h='44px'>
							{isProcessing ? 'Processing...' : 'Import'}
						</Button>
					</ModalBody>

					<ModalFooter>
					{showYtbPopUp ? (
						<Link href='https://blog.podwise.ai/blog/youtube-and-podwise/' isExternal>
							<u>Learn more</u> <ExternalLinkIcon mx='2px' />
						</Link>) : 
						<></>
					}	
					</ModalFooter>
					</ModalContent>
				
			</Modal>
			<Tooltip label='Import from RSS' placement='bottom'>
				<Button
					variant='no-hover'
					bg='transparent'
					p='0px'
					minW='unset'
					minH='unset'
					h='18px'
					w='max-content'
					onClick={() => setShowRssPopUp(!showRssPopUp)}>
						<Icon
							me='10px'
							h='18px'
							w='18px'
							color={navbarIcon}
							as={FaRss}
						/>
				</Button>
			</Tooltip>
			{/* <Menu>
				<MenuButton p='0px'>
					<Icon mt='6px' as={MdNotificationsNone} color={navbarIcon} w='18px' h='18px' me='10px' />
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p='20px'
					borderRadius='20px'
					bg={menuBg}
					border='none'
					mt='22px'
					me={{ base: '30px', md: 'unset' }}
					minW={{ base: 'unset', md: '400px', xl: '450px' }}
					maxW={{ base: '360px', md: 'unset' }}>
					<Flex w='100%' mb='20px'>
						<Text fontSize='md' fontWeight='600' color={textColor}>
							Notifications
						</Text>
						<Text fontSize='sm' fontWeight='500' color={textColorBrand} ms='auto' cursor='pointer'>
							Mark all read
						</Text>
					</Flex>
					<Flex flexDirection='column'>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
							<ItemContent info='Horizon UI Dashboard PRO' />
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
							<ItemContent info='Horizon Design System Free' />
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>

			<Menu>
				<MenuButton p='0px'>
					<Icon mt='6px' as={MdInfoOutline} color={navbarIcon} w='18px' h='18px' me='10px' />
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p='20px'
					me={{ base: '30px', md: 'unset' }}
					borderRadius='20px'
					bg={menuBg}
					border='none'
					mt='22px'
					minW={{ base: 'unset' }}
					maxW={{ base: '360px', md: 'unset' }}>
					<Image src={navImage} borderRadius='16px' mb='28px' />
					<Flex flexDirection='column'>
						<Link w='100%' href='https://horizon-ui.com/pro'>
							<Button w='100%' h='44px' mb='10px' variant='brand'>
								Buy Horizon UI PRO
							</Button>
						</Link>
						<Link w='100%' href='https://horizon-ui.com/documentation/docs/introduction'>
							<Button
								w='100%'
								h='44px'
								mb='10px'
								border='1px solid'
								bg='transparent'
								borderColor={borderButton}>
								See Documentation
							</Button>
						</Link>
						<Link w='100%' href='https://github.com/horizon-ui/horizon-ui-chakra-ts'>
							<Button w='100%' h='44px' variant='no-hover' color={textColor} bg='transparent'>
								Try Horizon Free
							</Button>
						</Link>
					</Flex>
				</MenuList>
			</Menu> */}

			<Button
				variant='no-hover'
				bg='transparent'
				p='0px'
				minW='unset'
				minH='unset'
				h='18px'
				w='max-content'
				onClick={toggleColorMode}>
				<Icon
					me='10px'
					h='18px'
					w='18px'
					color={navbarIcon}
					as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
				/>
			</Button>
			<Menu>
				<MenuButton p='0px'>
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color='white'
						name='Adela Parkson'
						bg='#11047A'
						size='sm'
						w='40px'
						h='40px'
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
					<Flex w='100%' mb='0px'>
						<Text
							ps='20px'
							pt='16px'
							pb='10px'
							w='100%'
							borderBottom='1px solid'
							borderColor={borderColor}
							fontSize='sm'
							fontWeight='700'
							color={textColor}>
							👋&nbsp; Hey, Adela
						</Text>
					</Flex>
					<Flex flexDirection='column' p='10px'>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
							<Text fontSize='sm'>Profile Settings</Text>
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
							<Text fontSize='sm'>Newsletter Settings</Text>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color='red.400'
							borderRadius='8px'
							px='14px'>
							<Text fontSize='sm'>Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
