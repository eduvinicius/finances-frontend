type DialogType = "button" | "icon";

export interface IAppDialogProps {
    dialogType: DialogType;
    buttonText?: string;
    headerTitle: string;
    description: string;
    component: React.ReactNode;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}