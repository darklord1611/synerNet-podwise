/* eslint-disable */
// Chakra Imports
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocationuter.asPath]);
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';

export default function AdminNavbar(props: {
	secondary: boolean;
	message: string|boolean;
	brandText: string;
	logoText: string;
	fixed: boolean;
	onOpen: (...args: any[]) => any;
}) {
	const [ scrolled, setScrolled ] = useState(false);
	const location = useLocation(); // Use useLocation to get the current route

	useEffect(() => {
		window.addEventListener('scroll', changeNavbar);

		return () => {
			window.removeEventListener('scroll', changeNavbar);
		};
	});

	useEffect(() => {
		// This will re-render the component when the route changes
		console.log(location.pathname);
	}, [location.pathname]);

	const { secondary,  brandText } = props;

	// Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
	let mainText = useColorModeValue('navy.700', 'white');
	let secondaryText = useColorModeValue('gray.700', 'white');
	let navbarPosition = 'fixed' as const;
	let navbarFilter = 'none';
	let navbarBackdrop = 'blur(20px)';
	let navbarShadow = 'none';
	let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
	let navbarBorder = 'transparent';
	let secondaryMargin = '0px';
	let paddingX = '15px';
	let gap = '0px';
	const changeNavbar = () => {
		if (window.scrollY > 1) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	return (
		<Box
			position={navbarPosition}
			boxShadow={navbarShadow}
			bg={navbarBg}
			borderColor={navbarBorder}
			filter={navbarFilter}
			backdropFilter={navbarBackdrop}
			backgroundPosition='center'
			backgroundSize='cover'
			borderRadius='16px'
			borderWidth='1.5px'
			borderStyle='solid'
			transitionDelay='0s, 0s, 0s, 0s'
			transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
			transition-property='box-shadow, background-color, filter, border'
			transitionTimingFunction='linear, linear, linear, linear'
			alignItems={{ xl: 'center' }}
			display={secondary ? 'block' : 'flex'}
			minH='75px'
			justifyContent={{ xl: 'center' }}
			lineHeight='25.6px'
			mx='auto'
			mt={secondaryMargin}
			pb='8px'
			right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
			px={{
				sm: paddingX,
				md: '10px'
			}}
			ps={{
				xl: '12px'
			}}
			pt='8px'
			top={{ base: '12px', md: '16px', xl: '18px' }}
			w={{
				base: 'calc(100vw - 6%)',
				md: 'calc(100vw - 8%)',
				lg: 'calc(100vw - 6%)',
				xl: 'calc(100vw - 160px)',
				'2xl': 'calc(100vw - 365px)'
			}}>
			<Flex
				w='100%'
				flexDirection={{
					sm: 'column',
					md: 'row'
				}}
				alignItems={{ xl: 'center' }}
				mb={gap}>
				<Box mb={{ sm: '8px', md: '0px' }}>
					<Breadcrumb>
						{location.pathname.split('/').map((path, index) => {
							if (index === 0) return null;
							if (index === location.pathname.split('/').length - 1) return null;
							return (
								<BreadcrumbItem color={secondaryText} fontSize='sm'>
									<BreadcrumbLink href={`/${path === 'dashboard' ? path : `dashboard/${path}`}`} color={secondaryText}>
										{path.toUpperCase()}
									</BreadcrumbLink>
								</BreadcrumbItem>
							)
						})}

					</Breadcrumb>
					{/* Here we create navbar brand, based on route name */}
					<Link
						color={mainText}
						href={`/dashboard/${location.pathname.split('/')[2]}`}
						bg='inherit'
						borderRadius='inherit'
						fontWeight='bold'
						fontSize='34px'
						_hover={{ color: { mainText } }}
						_active={{
							bg: 'inherit',
							transform: 'none',
							borderColor: 'transparent'
						}}
						_focus={{
							boxShadow: 'none'
						}}>
						{location.pathname.split('/')[2]?.toUpperCase()}
					</Link>
				</Box>
				<Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
					<AdminNavbarLinks
						onOpen={props.onOpen} 
						secondary={props.secondary}
						fixed={props.fixed} 
					/>
				</Box>
			</Flex> 
		</Box>
	);
}
