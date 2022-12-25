const SORT_BY_NAMED = 'SORT-BY-NAMED'
const SORT_CHEAP_FIRST = 'SORT-FIRST-CHEAP'
const SORT_EXPENSIVE_FIRST = 'SORT-EXPENSIVE-FIRST'
const SET_QUANTITY = 'SET-QUANTITY'

export function rootReducer(state, action) {
    switch (action.type) {

        case SORT_BY_NAMED:
            return { ...state, sortFunc: (item1, item2) => item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1 }

        case SORT_CHEAP_FIRST:
            return { ...state, sortFunc: (item1, item2) => item1.price - item2.price }

        case SORT_EXPENSIVE_FIRST:
            return { ...state, sortFunc: (item1, item2) => item2.price - item1.price }

        case SET_QUANTITY:
            return { ...state, quantity: action.data }

        default: return state
    }
}