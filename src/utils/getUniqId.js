import crypto from 'crypto'

const defaultLenByte = 3

export default function getUniqId(lenByte = defaultLenByte) {
  if (isNaN(lenByte)) {
    throw new Error(
      `function getUniqId: required argument lenByte as number but get ${lenByte}`,
    )
  }

  return crypto.randomBytes(lenByte).toString('hex')
}
