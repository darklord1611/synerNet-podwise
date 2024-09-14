import { Icon } from '@chakra-ui/react';
import {
  MdPerson,
  MdLogout,
  MdLibraryMusic,
  MdTrendingUp,
} from 'react-icons/md';
import { VscBroadcast } from "react-icons/vsc";
import { LuLibrary } from "react-icons/lu";

// Admin Imports
import Episode from 'views/dashboard/episodes';
import Profile from 'views/dashboard/profile';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import MainDashboard from 'views/dashboard/trending';
import Collections from 'views/dashboard/collections';
import CollectionDetail from 'views/dashboard/collections/variables/[id]';
import EpisodeDetail from 'views/dashboard/episodes/variables/[id]';
import Podcast from 'views/dashboard/dataTables';
import PodcastDetail from 'views/dashboard/dataTables/variables/[id]';

const routes = [
  {
    name: 'Trending',
    layout: '/dashboard',
    path: '/trending',
    icon: <Icon as={MdTrendingUp} width="22.5px" height="22.5px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Collections',
    layout: '/dashboard',
    path: '/collections',
    component: <Collections />,
  },
  {
    name: 'Collections',
    layout: '/dashboard',
    path: `/collections/:id`,
    component: <CollectionDetail />,
  },
  {
    name: 'Espisode',
    layout: '/dashboard',
    path: '/episodes',
    icon: (
      <Icon
        as={LuLibrary}
        width="22.5px"
        height="22.5px"
        color="inherit"
      />
    ),
    component: <Episode />,
    secondary: true,
  },
  {
    name: 'EpisodeDetails',
    layout: '/dashboard',
    path: `/episodes/:id`,
    component: <EpisodeDetail />,
  },
  {
    name: 'Podcast',
    layout: '/dashboard',
    icon: <Icon as={VscBroadcast} width="22.5px" height="22.5px" color="inherit" />,
    path: '/podcast',
    component: <Podcast />,
  },
  {
    name: 'PodcastDetails',
    layout: '/dashboard',
    path: `/podcasts/:id`,
    component: <PodcastDetail />,
  },
  {
    name: 'Profile',
    layout: '/dashboard',
    path: '/profile',
    icon: <Icon as={MdPerson} width="22.5px" height="22.5px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLogout} width="22.5px" height="22.5px" color="inherit" />,
    component: <SignInCentered />,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
];

export default routes;
