import { UserForm, ProfileImageUpload } from "./components";
import { useUser } from "../../hooks/useUser";
import type { UserFormValues } from "@/shared/types/user.types";
import { useEditUser } from "./hooks/useEditUser";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";

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
        <div className="space-y-6 p-6">
            {/* Profile Image Section */}
            <Card className="max-w-[30%]">
                <CardContent>
                    <ProfileImageUpload currentImageUrl={user?.profileImageUrl} />
                </CardContent>
            </Card>

            <Separator />

            {/* User Information Section */}
            <Card>
                <CardHeader>
                    <CardTitle title="Informações Pessoais" />
                </CardHeader>
                <CardContent>
                    <UserForm 
                        onSubmit={handleSubmit}
                        initialValues={user as UserFormValues}
                    />
                </CardContent>
            </Card>
        </div>
    );
}