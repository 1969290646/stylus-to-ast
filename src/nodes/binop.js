import noop from 'lodash/noop'
import { get as _get } from 'nosjs'

export default class BinOp extends Node {
  constructor (op, left, right) {
    super()
    Node.call(this)
    this.op = op
    this.left = left
    this.right = right
  }

  clone (parent) {
    const { op, val, left, right, lineno, column, filename } = this
    const binop = new BinOp(op)
    if (val) binop.val = _get(val, 'clone', noop)(parent, binop)
    return Object.assign(binop, {
      left: _get(left, 'clone', noop)(parent, binop),
      right: _get(right, 'clone', noop)(parent, binop),
      lineno,
      column,
      filename
    })
  }

  toString () {
    const { op, left, right } = this
    return `${left.toString()} ${op} ${right.toString()}`
  }

  toJSON () {
    const { op, val, left, right, lineno, column, filename } = this
    const json = { op, left, right, lineno, column, filename }
    return val ? { ...json, val } : json
  }
}
