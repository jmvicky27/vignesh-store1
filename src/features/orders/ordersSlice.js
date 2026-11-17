import { createSlice } from '@reduxjs/toolkit';

const mockOrders = [
  { id: 'ORD-2024-001', date: '2024-11-10', status: 'delivered', total: 13798,
    items: [{ name: 'Linen Relaxed Blazer', qty: 1, price: 6299 }, { name: 'Merino Turtleneck Sweater', qty: 1, price: 3849 }, { name: 'Handcrafted Leather Wallet', qty: 1, price: 2799 }],
    tracking: { current: 'Delivered', steps: ['Order Placed','Confirmed','Shipped','Out for Delivery','Delivered'], currentStep: 4 },
    address: 'Chennai, Tamil Nadu' },
  { id: 'ORD-2024-002', date: '2024-11-14', status: 'shipped', total: 8999,
    items: [{ name: 'Premium Wireless Earbuds', qty: 1, price: 8999 }],
    tracking: { current: 'Shipped', steps: ['Order Placed','Confirmed','Shipped','Out for Delivery','Delivered'], currentStep: 2 },
    address: 'Chennai, Tamil Nadu' },
];

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { orders: mockOrders, currentOrder: null },
  reducers: {
    placeOrder: (state, action) => {
      const order = { ...action.payload, id: `ORD-${Date.now()}`, date: new Date().toISOString().split('T')[0],
        status: 'confirmed', tracking: { current: 'Confirmed', steps: ['Order Placed','Confirmed','Shipped','Out for Delivery','Delivered'], currentStep: 1 }};
      state.orders.unshift(order);
      state.currentOrder = order;
    },
    setCurrentOrder: (state, action) => { state.currentOrder = action.payload; },
  },
});

export const { placeOrder, setCurrentOrder } = ordersSlice.actions;
export const selectOrders = s => s.orders.orders;
export const selectCurrentOrder = s => s.orders.currentOrder;
export default ordersSlice.reducer;
