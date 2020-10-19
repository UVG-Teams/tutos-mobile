import { schema } from 'normalizr'

export const institution = new schema.Entity(
  'institutions',
)

export const institutions = new schema.Array(institution)