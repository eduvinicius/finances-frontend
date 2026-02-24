export interface IAppDialogProps {
    buttonText: string;
    headerTitle: string;
    description: string;
    component: React.ReactNode;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}