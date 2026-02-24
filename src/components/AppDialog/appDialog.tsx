import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import type { IAppDialogProps } from "@/shared/types/dialog.types";

export function AppDialog(props: Readonly<IAppDialogProps>) {
    return (
        <Dialog 
            open={props.isDialogOpen} 
            onOpenChange={props.setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>{props.buttonText}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.headerTitle}</DialogTitle>
                    <DialogDescription>
                        {props.description}
                    </DialogDescription>
                </DialogHeader>
                {props.component}
            </DialogContent>
        </Dialog>
    );
}