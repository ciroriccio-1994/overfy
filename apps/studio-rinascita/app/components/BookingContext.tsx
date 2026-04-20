"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type BookingData = {
  treatmentSlug: string | null;
  doctorId: string | null;
  date: string | null;
  time: string | null;
  patient: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
};

const defaultBooking: BookingData = {
  treatmentSlug: null,
  doctorId: null,
  date: null,
  time: null,
  patient: { name: "", email: "", phone: "", notes: "" },
};

type BookingContextType = {
  booking: BookingData;
  setTreatment: (slug: string) => void;
  setDoctor: (id: string) => void;
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
        setTreatment: (slug) =>
          setBooking((b) => ({ ...b, treatmentSlug: slug })),
        setDoctor: (id) => setBooking((b) => ({ ...b, doctorId: id })),
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
