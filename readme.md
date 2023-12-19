# Process:

1. Read challenge and write down interpretation
2. Design solution
3. Write pseudocode
4. Write code
5. Test locally
6. Test remotely
7. Consider optimization (then repeat 3,4,5,6)
8. Test manually
9. Submit

# Improvements:
- Add linting, syntaxing to Sublime
- Improve Sublime shortcut skills
- Memorize basic javascript methods (trim, join, process.stdout.write)

# Data structures:
- Use object as store (source of truth) i.e. `{"el1":{id:1,key:"el1",value:20}, ...}`
- Store allows easy lookup: `store.el1.value`
- Convert store to array to sort or filter. `Object.keys(store).map(el => store[el])`
- Update store in immutable way:
`
store = {
    ...store,
    'existing_product': {
        ...store.existing_product,
        price: 9000,
    }
}
`

# Languages
C and C++ are the fastest languages. Go is also very fast
Python is considered slow.
C++ is most popular. Possible to find most answers in this language
Javascript is faster than python. 
