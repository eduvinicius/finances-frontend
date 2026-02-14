import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import type { IMenuOption } from "../types/menu.type";

export const MENU_ITEMS: IMenuOption[] = [
    {
        id: "my_account",
        label: "Minha Conta",
        url: "/my-account",
        icon: IoSettingsOutline,
        divider: true,
    },
    {
        id: "notifications",
        label: "Notificações",
        url: "/notifications",
        icon: IoIosNotifications,
        divider: true,
    },
    {
        id: "logout",
        label: "Sair",
        icon: RiLogoutCircleLine,
        onClick: () => {}
    }
]