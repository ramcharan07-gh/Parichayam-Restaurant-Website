"use client";

import { useSyncExternalStore } from "react";

export type OrderStatus = "New" | "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  notes?: string;
  deliveryMode: "delivery" | "pickup";
  paymentMethod: "cash" | "upi";
  isBeyond3km?: boolean;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    specialOffer?: string;
  }[];
  subtotal: number;
  status: OrderStatus;
}

export interface ReservationRecord {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

const ORDERS_STORAGE_KEY = "parichayam-orders-v1";
const ORDERS_CHANGE_EVENT = "parichayam-orders-change";
const RESERVATIONS_STORAGE_KEY = "parichayam-reservations-v1";
const RESERVATIONS_CHANGE_EVENT = "parichayam-reservations-change";

const INITIAL_MOCK_ORDERS: OrderRecord[] = [
  {
    id: "ord-101",
    orderNumber: "PAR-101",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    customerName: "Karthik Reddy",
    phone: "9876543210",
    address: "Boys Hostel 3, Room 204, Near MITS College, Angallu",
    landmark: "Behind Gate 2",
    notes: "Please make it spicy and deliver extra onions.",
    deliveryMode: "delivery",
    paymentMethod: "cash",
    items: [
      { id: "chicken-dum-biryani", name: "Chicken Dum Biryani", quantity: 2, price: 129, specialOffer: "Free 250ml Coke + Water Bottle" },
      { id: "chicken-lollipop", name: "Chicken Lollipop", quantity: 1, price: 199, specialOffer: "Free 250ml Coke + Water Bottle" }
    ],
    subtotal: 457,
    status: "Preparing"
  },
  {
    id: "ord-102",
    orderNumber: "PAR-102",
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    customerName: "Ananya Sharma",
    phone: "9123456780",
    address: "Sai Krupa Ladies PG, Main Road, Angallu",
    deliveryMode: "delivery",
    paymentMethod: "upi",
    items: [
      { id: "paneer-biryani", name: "Paneer Biryani", quantity: 1, price: 149, specialOffer: "Free Chocolate Milkshake" },
      { id: "oreo-blast-milkshake", name: "Oreo Blast Milkshake", quantity: 1, price: 70 }
    ],
    subtotal: 219,
    status: "Out for Delivery"
  },
  {
    id: "ord-103",
    orderNumber: "PAR-103",
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    customerName: "Venkatesh Rao",
    phone: "9001122334",
    address: "Dine-in / Pickup Counter",
    deliveryMode: "pickup",
    paymentMethod: "cash",
    items: [
      { id: "mughalai-biryani", name: "Mughalai Biryani", quantity: 1, price: 199, specialOffer: "Free 250ml Coke + Water Bottle + Ice Cream" }
    ],
    subtotal: 199,
    status: "Delivered"
  }
];

function getOrdersSnapshot(): string {
  if (typeof window === "undefined") return JSON.stringify(INITIAL_MOCK_ORDERS);
  const data = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!data) {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ORDERS));
    return JSON.stringify(INITIAL_MOCK_ORDERS);
  }
  return data;
}

function subscribeOrders(callback: () => void) {
  window.addEventListener(ORDERS_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(ORDERS_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function saveOrderToStore(order: Omit<OrderRecord, "id" | "orderNumber" | "createdAt" | "status">): OrderRecord {
  const currentSnapshot = getOrdersSnapshot();
  const currentOrders: OrderRecord[] = JSON.parse(currentSnapshot);
  const orderNum = `PAR-${Math.floor(100 + Math.random() * 900)}`;
  const newOrder: OrderRecord = {
    ...order,
    id: `ord-${Date.now()}`,
    orderNumber: orderNum,
    createdAt: new Date().toISOString(),
    status: "New"
  };
  const updated = [newOrder, ...currentOrders];
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(ORDERS_CHANGE_EVENT));
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const currentSnapshot = getOrdersSnapshot();
  const currentOrders: OrderRecord[] = JSON.parse(currentSnapshot);
  const updated = currentOrders.map((o) => (o.id === orderId ? { ...o, status } : o));
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(ORDERS_CHANGE_EVENT));
}

export function deleteOrderFromStore(orderId: string) {
  const currentSnapshot = getOrdersSnapshot();
  const currentOrders: OrderRecord[] = JSON.parse(currentSnapshot);
  const updated = currentOrders.filter((o) => o.id !== orderId);
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(ORDERS_CHANGE_EVENT));
}

export function useOrders() {
  const raw = useSyncExternalStore(subscribeOrders, getOrdersSnapshot, () => JSON.stringify(INITIAL_MOCK_ORDERS));
  let orders: OrderRecord[] = [];
  try {
    orders = JSON.parse(raw);
  } catch {
    orders = INITIAL_MOCK_ORDERS;
  }
  return { orders, updateStatus: updateOrderStatus, deleteOrder: deleteOrderFromStore };
}

// Reservations store
function getReservationsSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(RESERVATIONS_STORAGE_KEY) ?? "[]";
}

function subscribeReservations(callback: () => void) {
  window.addEventListener(RESERVATIONS_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(RESERVATIONS_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function saveReservationToStore(res: Omit<ReservationRecord, "id" | "createdAt" | "status">): ReservationRecord {
  const raw = getReservationsSnapshot();
  const list: ReservationRecord[] = JSON.parse(raw || "[]");
  const newRes: ReservationRecord = {
    ...res,
    id: `res-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Pending"
  };
  const updated = [newRes, ...list];
  window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(RESERVATIONS_CHANGE_EVENT));
  return newRes;
}

export function useReservations() {
  const raw = useSyncExternalStore(subscribeReservations, getReservationsSnapshot, () => "[]");
  let reservations: ReservationRecord[] = [];
  try {
    reservations = JSON.parse(raw);
  } catch {
    reservations = [];
  }
  return { reservations };
}
