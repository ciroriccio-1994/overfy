"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type BookingData = {
  serviceSlug: string | null;
  modality: "presenza" | "online" | null;
  date: string | null;
  time: string | null;
  patient: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
};

const defaultBooking: BookingData = {
  serviceSlug: null,
  modality: null,
  date: null,
  time: null,
  patient: { name: "", email: "", phone: "", message: "" },
};

type BookingContextType = {
  booking: BookingData;
  setService: (slug: string) => void;
  setModality: (m: "presenza" | "online") => void;
  setDateTime: (date: string, time: string) => void;
  setPatient: (p: BookingData["patient"]) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingData>(defaultBooking);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setService: (slug) =>
          setBooking((b) => ({ ...b, serviceSlug: slug })),
        setModality: (m) => setBooking((b) => ({ ...b, modality: m })),
        setDateTime: (date, time) =>
          setBooking((b) => ({ ...b, date, time })),
        setPatient: (p) => setBooking((b) => ({ ...b, patient: p })),
        reset: () => setBooking(defaultBooking),
      }}
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
