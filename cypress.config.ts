import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'o3bk9r',
  trashAssetsBeforeRuns: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
