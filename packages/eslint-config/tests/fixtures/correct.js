const a = ''

// space-before-function-paren

function b (x) {
  if (x) {
    console.log('hw')
  }
}

b(a)

function foo () {
  // ...
}

foo()

const bar = function () {
  // ...
}

bar()

class Foo {
  constructor () {
    // ...
    this.a = ''
  }
}

const f = new Foo()
console.log(f.a)

const foo2 = {
  bar () {
    // ...
  }
}

foo2()

const foo3 = async (a) => await a

foo3()

// array-bracket-spacing
const arr = [['foo'], 'bar']

console.log(arr)

const obj = { a: 1, b: 2 }

console.log(obj)
