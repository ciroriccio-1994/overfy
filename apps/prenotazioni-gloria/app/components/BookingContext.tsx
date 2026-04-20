"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type BookingData = {
  serviceSlug: string | null;
  staffId: string | null;
  date: string | null; // YYYY-MM-DD
  time: string | null; // HH:MM
  customer: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
};

const defaultBooking: BookingData = {
  serviceSlug: null,
  staffId: null,
  date: null,
  time: null,
  customer: { name: "", email: "", phone: "", notes: "" },
};

type BookingContextType = {
  booking: BookingData;
  setService: (slug: string) => void;
  setStaff: (id: string) => void;
  setDateTime: (date: string, time: string) => void;
  setCustomer: (customer: BookingData["customer"]) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingData>(defaultBooking);

  const setService = (slug: string) =>
    setBooking((b) => ({ ...b, serviceSlug: slug }));

  const setStaff = (id: string) => setBooking((b) => ({ ...b, staffId: id }));

  const setDateTime = (date: string, time: string) =>
    setBooking((b) => ({ ...b, date, time }));

  const setCustomer = (customer: BookingData["customer"]) =>
    setBooking((b) => ({ ...b, customer }));

  const reset = () => setBooking(defaultBooking);

  return (
    <BookingContext.Provider
      value={{ booking, setService, setStaff, setDateTime, setCustomer, reset }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
