import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      <p className="text-muted-foreground max-w-sm">
        A rota que você está tentando acessar não existe ou foi removida.
      </p>
      <Button onClick={() => navigate("/")}>Voltar para o início</Button>
    </div>
  );
}
