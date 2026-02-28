"use client";

import { useReadContract } from "wagmi";
import factoryJson from "@/abi/MovieFactory.json";

const FACTORY_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`;

export default function InvestPage() {
  const { data: movies } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryJson.abi,
    functionName: "getAllMovies",
  });

  console.log("Movies:", movies);

  return (
    <div style={{ padding: 40 }}>
      <h1>Investor Page</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
}