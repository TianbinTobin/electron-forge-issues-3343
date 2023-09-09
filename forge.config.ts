import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  rebuildConfig: {},
  packagerConfig: {
    asar: true,
  },
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      devServer: {
        hot: 'only',
        open: false,
        liveReload: false,
      },
      mainConfig,
      renderer: {
        nodeIntegration: true,
        config: rendererConfig,
        entryPoints: [
          {
            name: 'main_window',
            js: './src/renderer.ts',
            html: './src/index.html',
            preload: {
              js: './src/window-preload.ts',
            },
          },
          {
            name: 'main_view',
            nodeIntegration: false,
            preload: {
              js: './src/view-preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
