
import{schema} from 'normalizr';

export const tutor = new schema.Entity(
    'tutores',
)

export const tutores = new schema.Array(tutor);