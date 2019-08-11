// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
} from './';


// export default {
//   path: 'comic-translate',
//   name: 'Comic translate',
//   childRoutes: [
//     { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
//   ],
// };

export default {
  path: '/comicworkshop',
  name: 'comicworkshop',
  component: DefaultPage,
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};