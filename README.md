# react-dom-model

## Notes and some things we may want to support
Every native element will get given

Component name is it's thing

NavItem
NavItem__style
View

{...selector('NavItem')}


get('NavItem').length === 4;
get('NavItem')[0].get('Button').tap();
get('NavItem').props.active === true;


get('NewsItem').length === 0;
get('ScenesHome NewsList Spinner').length === 1;
waitFor(() => get('ScenesHome NewsList Spinner').length === 0);
get('NewsItem').length = 10;
get('HomeScroll').scrollTo('bottom'); // Works if just 1.If more comes back then we complain
get('Home NewsList Spinner').length === 1;
waitFor(() => get('ScenesHome NewsList Spinner').length === 0);
get('NewsItem').length === 20;
get('HomeScroll').scrollTo('bottom');
get('Home NewsList Spinner').length === 1;
waitFor(() => get('Home NewsList Spinner').length === 0);
get('NewsListEndMessage Text').props.text === 'No more news';

# Selections

- .NavItem
- 

# Assertions

- Element has class
- Element has id
- Elements count is
- Element prop is

# Actions

- Tap on element
- Scroll within element
- Type text within element