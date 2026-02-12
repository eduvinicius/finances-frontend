import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "../ui/Button";
import { RiLogoutCircleLine } from "react-icons/ri";

export function Header() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="flex justify-between p-4 mb-2 w-full border-b border-b-(--gray-500) bg-(--green-300) shadow-sm">
            <img 
                src="/src/assets/img/fin-verso-logo.png" 
                alt="FinVerso Logo" 
                className="h-8 w-auto"
            />
            <Button
                variant="outline"
                size="default"
                onClick={handleLogout}
                className="flex items-center gap-2"
            >
                <RiLogoutCircleLine className="size-5" />
                <span className="hidden sm:inline">Sair</span>
            </Button>
        </header>
    );
}