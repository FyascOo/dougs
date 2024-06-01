const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
     join('libs/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
       colors: {
        'grey-basic': '#F3F5F8',
        'light-grey': '#dce4ed'
      },
        flex: {
        '2': '2 2 0%'
      }
    },
  },
  plugins: [],
};
