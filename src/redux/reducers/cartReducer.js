const initialState = {
    items: [], // array to store the items in the cart
    total: 0 // total price of items in the cart
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // check if item already exists in the cart
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          // if item already exists, update the quantity
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            total: state.total + action.payload.price // update the total price
          };
        } else {
          // if item does not exist, add it to the cart
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
            total: state.total + action.payload.price // update the total price
          };
        }
      case 'REMOVE_FROM_CART':
        // find the index of the item to be removed
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        // get the quantity and price of the item to be removed
        const removedItem = state.items[itemIndex];
        if(removedItem && removedItem.quantity <= 1){
          return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload.id), // remove the item from the cart
            total: state.total - removedItem.price * removedItem.quantity // update the total price
          };
        }else{
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            ),
            total: state.total - action.payload.price // update the total price
          };
        }
      case 'CLEAR_CART':
        return {
          ...state,
          items: [], // empty the items array
          total: 0 // reset the total price
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;