const initialState = {
    menu: [],
    loading: true, 
    error: false, 
    items: [], 
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            }

        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            }

        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            }

        case 'ITEM_IN_BASKET':
            const id = action.payload;
            const itemInMenu = state.menu.find(el =>el.id === id)
            const index = state.items.findIndex(el =>el.id === id);
            let newItem = {};
            if (action.subtype === 'ADD_TO_CARD') {
                if (index !== -1) {
                    newItem = {
                        ...state.items[index],
                        count: state.items[index].count + 1
                    }
                    return {
                        ...state,
                        items: [...state.items.slice(0, index), newItem, ...state.items.slice(index+1)],
                        total: state.total + newItem.price
                    }
                } else {
                    newItem = {
                        title: itemInMenu.title,
                        price: itemInMenu.price,
                        url: itemInMenu.url,
                        id: itemInMenu.id,
                        count: 1
                    }
                    return {
                        ...state,
                        items: [...state.items, newItem],
                        total: state.total + newItem.price
                    }
                }
                
            } else if (action.subtype === 'REMOVE_FROM_CARD') {
                return {
                    ...state,
                    total: state.total - state.items[index].price * state.items[index].count,
                    items: [
                        ...state.items.slice(0, index),
                        ...state.items.slice(index+1)
                    ]
                }
            } else if (action.subtype === 'REDUCE_ITEM_COUNT') {
                if (state.items[index].count > 1) {
                    newItem = {
                        title: state.items[index].title,
                        price: state.items[index].price,
                        url: state.items[index].url,
                        id: state.items[index].id,
                        count: state.items[index].count - 1
                    }
                    return {
                        ...state,
                        total: state.total - state.items[index].price,
                        items: [
                            ...state.items.slice(0, index),
                            newItem,
                            ...state.items.slice(index+1, )
                        ]
                    }
                }
                return {
                    ...state,
                    total: state.total - state.items[index].price,
                    items: [
                        ...state.items.slice(0, index),
                        ...state.items.slice(index+1, )
                    ]
                }
            }
            break;

        default:
            return state;
    }
}

export default reducer;