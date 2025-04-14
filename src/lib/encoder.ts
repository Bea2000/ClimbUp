import Sqids from 'sqids'

const sqids = new Sqids({
  minLength: 5,
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
})

export function encodeIdInBloat(id: number) {
  const encoded = sqids.encode([id])
  return encoded;
}

export function decodeIdInBloat(encoded: string) {
  const numbers = sqids.decode(encoded)
  return numbers[0]
}
