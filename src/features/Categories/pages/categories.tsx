import { useEffect } from "react";
import { useCategories } from "../hooks/useCategories";

export function Categories() {

    const { data, isLoading, error } = useCategories();
    
    useEffect(() => {
        if (data) {
            console.log("Categories:", data);
        }
    }, [data]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Categories Page</h1>
        </div>
    );
}