const menuLoaded = (NewMenu) => { 
    return {
        type: 'MENU_LOADED',
        payload: NewMenu
    }
}

const menuRequested = () => { 
    return {
        type: 'MENU_REQUESTED'
    }
}

const menuError = () => { 
    return {
        type: 'MENU_ERROR'
    }
}

const addedToCard = (id) => { 
    return {
        type: 'ITEM_IN_BASKET',
        subtype: 'ADD_TO_CARD',
        payload: id
    };
}

const deletedFromCard = (id) => { 
    return {
        type: 'ITEM_IN_BASKET',
        subtype: 'REMOVE_FROM_CARD',
        payload: id
    };
}

const reduceItemCount = (id) => {
    return {
        type: 'ITEM_IN_BASKET',
        subtype: 'REDUCE_ITEM_COUNT',
        payload: id
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCard,
    deletedFromCard,
    reduceItemCount
}