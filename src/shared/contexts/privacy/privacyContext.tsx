import { useCallback, useMemo, useState } from "react";
import { PrivacyContext } from "@/hooks/usePrivacy";
import type { IReactNode } from "@/shared/types/reactTypes";

export function PrivacyProvider({ children }: Readonly<IReactNode>) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = useCallback(() => setIsHidden((prev) => !prev), []);

  const value = useMemo(() => ({ isHidden, toggleHidden }), [isHidden, toggleHidden]);

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}
