import { CUSTOMER_ACTIONS, initialState } from './customerStore.constants';
import type { CustomerAction, CustomerState } from './customerStore.types';

export const customerReducer = (
  state: CustomerState = initialState,
  action: CustomerAction,
): CustomerState => {
  switch (action.type) {
    case CUSTOMER_ACTIONS.CART_ITEM_ADDED: {
      const { restaurantId, restaurantName, menuItemId, name, unitPrice } = action.payload;
      const existing = state.cartItems.find((item) => {
        return item.menuItemId === menuItemId;
      });

      const cartItems = existing
        ? state.cartItems.map((item) => {
            return item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + 1 } : item;
          })
        : [...state.cartItems, { menuItemId, name, unitPrice, quantity: 1 }];

      return {
        ...state,
        cartRestaurantId: restaurantId,
        cartRestaurantName: restaurantName,
        cartItems,
      };
    }

    case CUSTOMER_ACTIONS.CART_ITEM_INCREMENTED:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          return item.menuItemId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      };

    case CUSTOMER_ACTIONS.CART_ITEM_DECREMENTED: {
      const cartItems = state.cartItems
        .map((item) => {
          return item.menuItemId === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        })
        .filter((item) => {
          return item.quantity > 0;
        });

      return {
        ...state,
        cartItems,
        cartRestaurantId: cartItems.length > 0 ? state.cartRestaurantId : null,
        cartRestaurantName: cartItems.length > 0 ? state.cartRestaurantName : null,
      };
    }

    case CUSTOMER_ACTIONS.CART_CLEARED:
      return { ...state, cartRestaurantId: null, cartRestaurantName: null, cartItems: [] };

    case CUSTOMER_ACTIONS.MY_ORDERS_SUBSCRIBED:
      return { ...state, isMyOrdersLoading: true, error: null };

    case CUSTOMER_ACTIONS.MY_ORDERS_RECEIVED:
      return { ...state, isMyOrdersLoading: false, myOrders: action.payload };

    case CUSTOMER_ACTIONS.MY_ORDERS_FAILED:
      return { ...state, isMyOrdersLoading: false, error: action.payload };

    case CUSTOMER_ACTIONS.MY_ORDERS_CLEARED:
      return { ...state, myOrders: [] };

    default:
      return state;
  }
};
