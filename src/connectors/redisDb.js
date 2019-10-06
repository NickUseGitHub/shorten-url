/* global Promise */
const defaultExpireTime = 10 * 60

export default class RedisDb {
  constructor({ client }) {
    this.client = client
  }

  setValue(key, value, expireTime = defaultExpireTime) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', expireTime, function(err, reply) {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  getValue(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, function(err, value) {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    })
  }
}
