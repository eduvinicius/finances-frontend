import { UserForm } from "./components";
import { useUser } from "./hooks/useUser";
import type { UserFormValues } from "@/shared/types/user.types";
import { useEditUser } from "./hooks/useEditUser";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";

export function Settings() {

    const { data: user, isLoading, error } = useUser();
    const { mutate, isPending } = useEditUser();

    const handleSubmit = (formData: UserFormValues) => {
        mutate(formData);
    }

    if (isLoading || isPending) {
        return <Spinner className="size-12 mx-auto" />;
    }

    if (error) {
        toast.error(`Erro ao carregar dados do usuário: ${error.message}`);
    }

    return (
        <UserForm 
            onSubmit={handleSubmit}
            initialValues={user}
        />
    );
}