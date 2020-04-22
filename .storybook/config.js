import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { themeDeco } from 'ui/styleguide/storiesThemeDecorator';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import {logo_large_url, APP_NAME, related_urls} from 'mn-constants';
import { create } from '@storybook/theming';
import StoryRouter from 'storybook-react-router';


const theme = create({
  brandImage: logo_large_url,
  brandTitle: APP_NAME,
  url: related_urls.code
});



addParameters({
  options: {
    theme, 
    showPanel: false
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
    prepareForInline: (storyFn) => storyFn(),

  }
});

addDecorator(withA11y);
addDecorator(themeDeco());
addDecorator(StoryRouter())



// automatically import all files ending in *.stories.tsx
// const req = [
//   require.context('../src/ui/', true, /\.stories\.tsx$/),
//   require.context('../src/ui/', true, /\.stories\.mdx$/),
// ];

// function loadStories() {
//   req.keys().forEach(req);
// }

configure(require.context('../src/ui', true, /\.stories\.(tsx|mdx)$/), module);

// configure(loadStories, module);