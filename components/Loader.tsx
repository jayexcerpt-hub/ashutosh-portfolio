"use client";
import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [pct, setPct] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val += Math.random() * 20;
      if (val >= 100) {
        val = 100;
        clearInterval(id);
        setPct(100);
        // small pause, then fade
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => {
            setGone(true);
            onDone?.();
          }, 600);
        }, 250);
        return;
      }
      setPct(Math.floor(val));
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-8 z-[10000]"
      style={{
        background: "#081c15",
        transition: "opacity 0.6s ease",
        opacity: hiding ? 0 : 1,
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      <div style={{ fontSize: 36, animation: "pulseGlow 1s infinite" }}>🪲</div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 800,
          letterSpacing: "0.3em",
          color: "#d4ff7d",
          textTransform: "uppercase",
        }}
      >
        Ashutosh Dey
      </div>
      <div
        style={{ width: 200, height: 1, background: "rgba(82,183,136,0.2)" }}
      >
        <div
          style={{
            height: "100%",
            background: "#d4ff7d",
            width: `${pct}%`,
            boxShadow: "0 0 12px rgba(212,255,125,0.6)",
            transition: "width 0.07s linear",
          }}
        />
      </div>
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#52b788",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}
