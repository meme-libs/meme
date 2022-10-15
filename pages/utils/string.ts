import {
  isArray,
  isNumber,
  isString,
  isBoolean,
  mapKeys,
  forIn,
  snakeCase
} from 'lodash-es'
import camelCase from 'camelcase'

type DoAllKeys = (o: any) => any;

const doAllKeys =  (doKey: (string?: string) => string): DoAllKeys => (o) => {
  if (o === undefined || o === null) return
  const deal = doAllKeys(doKey)
  if (isArray(o)) {
    return o.map(deal)
  }
  if (isString(o) || isNumber(o)) {
    return o
  }
  const tempObj = mapKeys(o, (value, key) => doKey(key))
  forIn(tempObj, (value, key) => {
    if (!isNumber(value) && !isString(value) && !isBoolean(value)) tempObj[key] = deal(value)
  })
  return tempObj
}

export const snakeCaseObjKeys = doAllKeys(snakeCase)

export const camelCaseObjKeys = doAllKeys(camelCase as (string?: string) => string)
