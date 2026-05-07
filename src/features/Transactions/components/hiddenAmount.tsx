import { usePrivacy } from "@/hooks/usePrivacy";

export function HiddenAmount({ amount }: Readonly<{ amount: number }>) {
  const { isHidden } = usePrivacy();
  return <span>{isHidden ? "••••" : `R$ ${amount.toFixed(2)}`}</span>;
}
