## React Patterns----------------------

__SIR CLASS POINT------------------------------------__ 
## clean up function ??????????
* if use **addEventListener** in **useEffect()**
* only runs on dev level. not in production.
* to faster in the development cycle in React pattern

## UI return -> array element -> should not use curly braces {} in arrow function ??????????????

## Unique **key** __prop__ is must for each **child** while __iterating/loop__
    - bcz in virtual dom react will think every child as same, finding **no change**
    - unique: id, the names of the elements (eg, theme names)

## Code splitting ???????????

## Components:
# data fetching : different Component
# UI update :  different Component : Parent Component bcz it can pass the data over to children components.
**ways of modulation/ code splitting / folder structure**
* - named components or, shared components or, shared\components
* - pages\home\components\Home.jsx 
    (page wise components)
* - components\products\Productard.jsx, ProductContainer.jsx
* - shared\hooks

## React Devtools -----------