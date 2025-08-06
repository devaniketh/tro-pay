import ConnectButton from "@/components/ConnectButton";
import SwapForm from "@/components/SwapForm";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tropay</h1>
      <ConnectButton />
      <SwapForm />
    </div>
  );
}