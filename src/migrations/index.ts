import * as migration_20260903_documents_storage from './20260903_documents_storage';
import * as migration_20260904_071603_media_prefix_and_indexes from './20260904_071603_media_prefix_and_indexes';

export const migrations = [
  {
    up: migration_20260903_documents_storage.up,
    down: migration_20260903_documents_storage.down,
    name: '20260903_documents_storage',
  },
  {
    up: migration_20260904_071603_media_prefix_and_indexes.up,
    down: migration_20260904_071603_media_prefix_and_indexes.down,
    name: '20260904_071603_media_prefix_and_indexes'
  },
];
