import { defineConfig } from 'dumi';
const publicPath = '/';
export default defineConfig({
  title: '算法',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: `${publicPath}米龙.png`,
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
});
