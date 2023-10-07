import { table } from '../src'

// Test one
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const me = new Person('Tyrone', 'Jones')

table(me)

// Test two
const people = [
  ['Tyrone', 'Jones'],
  ['Janet', 'Smith'],
  ['Maria', 'Cruz'],
]

table(people)

// Test three
const tyrone = new Person('Tyrone', 'Jones')
const janet = new Person('Janet', 'Smith')
const maria = new Person('Maria', 'Cruz')

table([tyrone, janet, maria])

// Test four
const family: any = {}

family.mother = new Person('Janet', 'Jones')
family.father = new Person('Tyrone', 'Jones')
family.daughter = new Person('Maria', 'Jones')

table(family, ['firstName'], { theme: 'noBorder' })

// Five

table([tyrone, janet, maria], ['firstName'])
