/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	//   Chakra color mode
	let location = useLocation();
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	let activeIcon = useColorModeValue('brand.500', 'white');
	let textColor = useColorModeValue('secondaryGray.500', 'white');
	let brandColor = useColorModeValue('brand.500', 'brand.400');

	const { routes } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[], 
	) => {
		return routes.map(
			(
				route: RoutesType,
				index: number
			) => {
				if ((route.layout === '/dashboard' || 
					route.layout === '/auth' || 
					route.layout === '/rtl') && 
					(route.name !== 'Collections' && 
					route.name !== 'EpisodeDetails'
					)) {
					return (
						<NavLink key={index} to={route.layout + route.path}>
							{route.icon ? (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Flex w='100%' alignItems='center' justifyContent='center'>
											<Tooltip label={route.name} placement='right-end'>
												<Box
													color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
													me='18px'>
													{route.icon}
												</Box>
											</Tooltip>
										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
											borderRadius='5px'
										/>
									</HStack>
								</Box>
							) : (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Text
											me='auto'
											color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
											fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
											{route.name}
										</Text>
										<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
									</HStack>
								</Box>
							)}
						</NavLink>
					);
				}
			}
		);
	};
	//  BRAND
	return <>{createLinks(routes)}</>
}

export default SidebarLinks;
