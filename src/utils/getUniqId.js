import crypto from 'crypto'

export default function getUniqId(lenByte) {
  if (isNaN(lenByte) && lenByte > 0) {
    throw new Error(
      `function getUniqId: required argument lenByte as number but get ${lenByte}`,
    )
  }

  return crypto.randomBytes(lenByte).toString('hex')
}
