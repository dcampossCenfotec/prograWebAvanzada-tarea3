import { ObjectId } from 'mongodb'
import { HttpError } from './HttpError.js'

export function revisarId(id) {
  if (typeof id !== 'string' || !ObjectId.isValid(id)) {
    throw new HttpError(400, 'ID_INVALIDO', 'El identificador no es válido.')
  }
}
