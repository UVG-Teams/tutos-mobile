import { schema } from 'normalizr'

export const location = new schema.Entity(
  'locations',
)

export const locations = new schema.Array(location)