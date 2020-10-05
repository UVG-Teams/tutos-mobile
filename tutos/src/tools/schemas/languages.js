import {schema} from 'normalizr';

export const language = new schema.Entity(
  'languages',
)

export const languages = new schema.Array(language);