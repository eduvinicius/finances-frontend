import type { ReactNode } from "react";

export interface IReactNode {
    children: ReactNode;
    fallback?: ReactNode;
}