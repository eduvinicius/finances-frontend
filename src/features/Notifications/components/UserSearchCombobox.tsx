import { useState, useRef } from "react";
import { X, Search, Loader2 } from "lucide-react";
import { useUserSearch } from "../hooks/useUserSearch";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { UserSearchResult } from "@/shared/types/adminUser.types";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/InputGroup";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

interface UserSearchComboboxProps {
  readonly selectedUsers: UserSearchResult[];
  readonly onSelectionChange: (users: UserSearchResult[]) => void;
  readonly multiSelect: boolean;
  readonly error?: string;
}

export function UserSearchCombobox({
  selectedUsers,
  onSelectionChange,
  multiSelect,
  error,
}: UserSearchComboboxProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(inputValue, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [], isFetching } = useUserSearch(debouncedQuery);

  const isSelected = (user: UserSearchResult) =>
    selectedUsers.some((u) => u.id === user.id);

  function handleSelectUser(user: UserSearchResult) {
    if (isSelected(user)) return;

    const next = multiSelect ? [...selectedUsers, user] : [user];
    onSelectionChange(next);
    setInputValue("");
    setIsOpen(false);
  }

  function handleRemoveUser(id: string) {
    onSelectionChange(selectedUsers.filter((u) => u.id !== id));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setIsOpen(true);
  }

  function handleInputFocus() {
    if (inputValue.trim().length >= 2) {
      setIsOpen(true);
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setIsOpen(false);
      setInputValue("");
    }
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  }

  const showDropdown =
    isOpen && inputValue.trim().length >= 2 && debouncedQuery.trim().length >= 2;

  const filteredResults = results.filter((u) => !isSelected(u));

  return (
    <Field>
      <FieldLabel>
        {multiSelect ? "Usuários destinatários" : "Usuário destinatário"}
      </FieldLabel>

      <div
        ref={containerRef}
        className="relative w-full"
      >
        <InputGroup className={cn(error && "border-destructive ring-destructive/20 ring-[3px]")}>
          <InputGroupAddon align="inline-start" className="pl-3">
            <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            role="combobox"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            placeholder="Buscar usuário pelo nome..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            autoComplete="off"
          />
          {isFetching && (
            <InputGroupAddon align="inline-end" className="pr-3">
              <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden="true" />
            </InputGroupAddon>
          )}
        </InputGroup>

        {showDropdown && (
          <ul
            aria-label="Resultados da busca"
            className="absolute z-50 mt-1 w-full rounded-md border bg-(--green-200) text-popover-foreground shadow-md opacity-100"
          >
            {filteredResults.length === 0 && !isFetching && (
              <li className="px-3 py-2 text-sm text-muted-foreground text-center">
                Nenhum usuário encontrado
              </li>
            )}
            {filteredResults.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer flex-col gap-0.5 px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectUser(user);
                  }}
                >
                  <span className="font-medium">{user.fullName}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedUsers.length > 0 && (
        <ul
          aria-label="Usuários selecionados"
          className="mt-2 flex flex-wrap gap-2"
        >
          {selectedUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium"
            >
              <span>{user.fullName}</span>
              <button
                type="button"
                aria-label={`Remover ${user.fullName}`}
                className="flex items-center rounded-full p-0.5 hover:bg-muted-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => handleRemoveUser(user.id)}
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <FieldDescription className={error ? "text-destructive" : ""}>
        {error ?? (multiSelect
          ? "Busque e selecione um ou mais usuários"
          : "Busque e selecione um usuário")}
      </FieldDescription>
    </Field>
  );
}
