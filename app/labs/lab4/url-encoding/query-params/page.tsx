"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QueryCalculatorContent() {
  const searchParams = useSearchParams();
  const aRaw = searchParams.get("a") || "0";
  const bRaw = searchParams.get("b") || "0";
  const a = parseFloat(aRaw);
  const b = parseFloat(bRaw);
  const sum = a + b;

  return (
    <div style={{ padding: 40 }}>
      <h1>Calculator – Query Parameters</h1>
      <p>a = <code>{aRaw}</code></p>
      <p>b = <code>{bRaw}</code></p>
      <h2 style={{ color: "green" }}>Sum = {sum}</h2>
    </div>
  );
}

export default function QueryCalculator() {
  return (
    <Suspense fallback={<div>fallback error for vercel. not included in original assignment page but vercel wanted it for safety!</div>}>
      <QueryCalculatorContent />
    </Suspense>
  );
}