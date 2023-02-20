import { getItemStorage } from './utils'

export const initialTaskList = ({ storageKey, initialValue }) => getItemStorage(storageKey) || initialValue
