import * as migration_20260119_011801_add_external_url_to_media from './20260119_011801_add_external_url_to_media';

export const migrations = [
  {
    up: migration_20260119_011801_add_external_url_to_media.up,
    down: migration_20260119_011801_add_external_url_to_media.down,
    name: '20260119_011801_add_external_url_to_media'
  },
];
