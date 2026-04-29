interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface IdConfiguration {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface Google {
  accounts: {
    id: {
      initialize: (config: IdConfiguration) => void;
      prompt: () => void;
      revoke: (hint: string, done: () => void) => void;
    };
  };
}

declare const google: Google;
