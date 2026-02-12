import { Button } from "../ui/Button";
import { RiLogoutCircleLine } from "react-icons/ri";

export function Header() {

    const handleLogout = () => {
        // Implement your logout logic here, such as clearing user data and redirecting to the login page
        console.log("User logged out");
    }

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