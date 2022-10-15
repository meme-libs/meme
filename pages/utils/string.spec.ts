import { camelCase, camelCaseObjKeys, snakeCase } from './string'
import { expect } from 'chai'

describe('String', () => {
  describe('camelCase', () => {
    it('should resolve simple snake case string.', () => {
      expect(camelCase('a_b')).to.be.deep.eq('aB')
    })
    it('should resolve other syntax.', () => {
      expect(camelCase('a-b')).to.be.deep.eq('aB')
      expect(camelCase('a b')).to.be.deep.eq('aB')
      expect(camelCase('a_b-c d')).to.be.deep.eq('aBCD')
      expect(camelCase('a_b-c 1')).to.be.deep.eq('aBC1')
      expect(camelCase('a_b-c_1a')).to.be.deep.eq('aBC1a')
      expect(camelCase('a,b')).to.be.deep.eq('a,b')
    })
  })
  describe('snake_case', () => {
    it('should resolve simple camel case string.', () => {
      expect(snakeCase('aB')).to.be.deep.eq('a_b')
    })
    it('should resolve other syntax.', () => {
      expect(snakeCase('aB')).to.be.deep.eq('a_b')
      expect(snakeCase('aBcD')).to.be.deep.eq('a_bc_d')
      expect(snakeCase('a-b')).to.be.deep.eq('a_b')
      expect(snakeCase('a b')).to.be.deep.eq('a_b')
      expect(snakeCase('a_b-c d')).to.be.deep.eq('a_b_c_d')
      expect(snakeCase('a_b-c 1')).to.be.deep.eq('a_b_c_1')
      expect(snakeCase('a_b-c_1a')).to.be.deep.eq('a_b_c_1a')
      expect(snakeCase('a,b')).to.be.deep.eq('a,b')
    })
  })
  describe('camelCaseObjKeys', () => {
    it('should return right data.', () => {
      expect(camelCaseObjKeys(['http://localhost:8080'])).to.be.deep.eq([
        'http://localhost:8080'
      ])
    })
    it('should not transform number arr.', () => {
      expect(camelCaseObjKeys([1, 2])).to.be.deep.eq([1, 2])
    })
    it('should not transform `,`.', () => {
      expect(camelCaseObjKeys({
        '1,2': 123
      })).to.be.deep.eq({
        '1,2': 123
      })
    })
    it('should exclude options `excludes` prop.', () => {
      expect(camelCaseObjKeys({
        '1,-2A': 123,
        'a_b1_': 456,
        b_c: 0,
        b_d: 0
      }, {
        excludes: [ '1,-2A', /^b.*/ ]
      })).to.be.deep.eq({
        '1,-2A': 123,
        aB1_: 456,
        b_c: 0,
        b_d: 0
      })
    })
  })
})
