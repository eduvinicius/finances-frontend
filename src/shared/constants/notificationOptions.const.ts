export const TARGETING_MODE_LABELS: Record<string, string> = {
  AllUsers: "Todos os usuários",
  SingleUser: "Usuário específico",
  SelectedUsers: "Usuários selecionados",
};

export const DELIVERY_CHANNEL_LABELS: Record<string, string> = {
  InApp: "No app",
  Email: "E-mail",
  Both: "Ambos",
};

export const TARGETING_MODE_OPTIONS = [
  { label: "Todos os usuários", value: 0 as const },
  { label: "Usuário específico", value: 1 as const },
  { label: "Usuários selecionados", value: 2 as const },
];

export const DELIVERY_CHANNEL_OPTIONS = [
  { label: "No app", value: 0 as const },
  { label: "E-mail", value: 1 as const },
  { label: "Ambos", value: 2 as const },
];
