import { schema } from 'normalizr'

export const career = new schema.Entity(
  'careers',
)

export const careers = new schema.Array(career)