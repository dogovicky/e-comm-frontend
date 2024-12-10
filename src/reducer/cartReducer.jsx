export const initialState = {
  items: [],
  totalAmount: 0,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product_id, title, image_url, description, price } =
        action.payload;
      const existingItem = state.items.find(
        (item) => item.product_id === product_id
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.product_id === product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          { product_id, title, image_url, description, price, quantity: 1 },
        ];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(
        (item) => item.product_id === action.payload.product_id
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }

    case "INCREASE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.product_id === action.payload.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }

    case "DECREASE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.product_id === action.payload.product_id
            ? { ...state, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        ),
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
};
