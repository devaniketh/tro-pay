import ConnectButton from "@/components/ConnectButton";
import { div } from "motion/react-client";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tropay </h1>
      <ConnectButton />
    </div>
  )
}