import { NavItem } from './nav-item';


export const NAVBAR_LIST: NavItem[] = [
  {
    id: 'upcoming-tasks',
    title: 'upcoming tasks',
    current: true,
    router: '/profile',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: 'development'
  },
  {
    id: 'issues',
    title: 'issues',
    current: false,
    router: '',
    rightMenu: false,
    burgerMenu: true,
    hr: '',
    dev: 'development'
  },
  {
    id: 'contact-info',
    title: 'contact info',
    current: false,
    router: 'contact-info',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: 'development'
  },
  {
    id: 'log-out',
    title: 'log out',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: false,
    hr: 'hr',
    dev: 'development',
    logout: true
  },
  {
    id: 'my-profile',
    title: 'my profile',
    current: false,
    router: 'my-profile',
    rightMenu: true,
    burgerMenu: true,
    hr: 'hr',
    dev: 'development'
  },
  {
    id: 'edit-profile',
    title: 'edit profile',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: false,
    hr: 'hr',
    dev: ''
  },
  {
    id: 'create-user',
    title: 'create user',
    current: false,
    router: 'create-user',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: ''
  }
];
