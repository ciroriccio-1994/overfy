// Semplice generatore QR basato su qrcode.react logic ma minimale
// Preferisco una lib leggera. Usiamo "qrcode" npm via import dinamico client-side.

"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
};

export function QRCode({
  value,
  size = 280,
  fgColor = "#1a1712",
  bgColor = "transparent",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const qrcode = await import("qrcode");
      if (cancelled || !canvasRef.current) return;
      await qrcode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 0,
        color: {
          dark: fgColor,
          light: bgColor === "transparent" ? "#00000000" : bgColor,
        },
        errorCorrectionLevel: "H",
      });
      setReady(true);
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [value, size, fgColor, bgColor]);

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className={`transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
