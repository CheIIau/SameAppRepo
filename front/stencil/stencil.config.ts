import { Config } from '@stencil/core';
import tailwind, { tailwindGlobal, tailwindHMR } from 'stencil-tailwind-plugin';
import tailwindConfig from './tailwind.config';

export const config: Config = {
  namespace: 'stencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    tailwind({
      tailwindConf: tailwindConfig,
    }),
    tailwindHMR(),
  ],
  testing: {
    browserHeadless: 'new',
  },
};
