import R from 'ramda'

export default class Parser {
  constructor() {
    this.result = {}
    this.path = []
    this.mode = 'object'
    this.remaining = ''
  }

  async parse(str) {
    const completeStr = this.remaining + str;
    const matches = completeStr.match(/[{}\[\]]|"[^"]*":?|\d+/ig)
    const last = matches[matches.length - 1]
    this.remaining = completeStr.substring(completeStr.lastIndexOf(last) + last.length)
    return this.process(matches)
  }

  set(v) {
    this.result = R.assocPath(this.path, v, this.result)
  }

  get() {
    return this.result
  }

  process(matches) {
    return new Promise((resolve) => {
      while (matches.length) {
        const m = matches.shift()
        if (m.endsWith(':')) {
          const prop = m.replace(/[":]/ig, '')
          const v = matches.shift()
          if (!v) {
            this.remaining = m + this.remaining
            resolve(true)
            return
          }
          this.path.push(prop)
          if (v === '{') {
            this.mode = 'object'
            this.set({})
          } else if (v === '[') {
            this.mode = 'array'
            this.set([])
            this.path.push(-1)
          } else {
            this.set(v.replace(/"/g, ''))
            this.path.pop()
          }
        } else if (m === ']') {
          this.path.pop()
          this.path.pop()
          this.mode = 'object'
        } else if (this.mode === 'array') { // array
          const idx = this.path.pop()
          this.path.push(idx + 1)
          if (m === '{') {
            this.set({})
          } else {
            this.set(m.replace(/"/g, ''))
          }
        }
        if (m === '}') {
          this.path.pop()
        }
      }
      resolve(true)
    })
  }
}
