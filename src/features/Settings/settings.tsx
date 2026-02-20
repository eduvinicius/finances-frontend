import { UserForm } from "./components";

export function Settings() {

    const handleSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <UserForm 
            onSubmit={handleSubmit}
        />
    );
}