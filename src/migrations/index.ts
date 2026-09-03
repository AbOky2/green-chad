import * as migration_20260903_documents_storage from './20260903_documents_storage';

export const migrations = [
  {
    up: migration_20260903_documents_storage.up,
    down: migration_20260903_documents_storage.down,
    name: '20260903_documents_storage',
  },
];
