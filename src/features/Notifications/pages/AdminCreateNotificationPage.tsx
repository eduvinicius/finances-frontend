import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupInput, InputGroupTextarea } from "@/components/ui/InputGroup";
import { AppSelect } from "@/components/ui/InputSelect/appSelect";
import { createNotificationSchema, type CreateNotificationDto } from "@/shared/schemas/notification.schema";
import { useCreateNotification } from "../hooks/useCreateNotification";

const TARGETING_MODE_OPTIONS = [
  { label: "Todos os usuários", value: 0 as const },
  { label: "Usuário específico", value: 1 as const },
  { label: "Usuários selecionados", value: 2 as const },
];

const DELIVERY_CHANNEL_OPTIONS = [
  { label: "No app", value: 0 as const },
  { label: "E-mail", value: 1 as const },
  { label: "Ambos", value: 2 as const },
];

export function AdminCreateNotificationPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateNotificationDto>({
    resolver: zodResolver(createNotificationSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      body: "",
      targetingMode: 0,
      deliveryChannel: 0,
      targetUserIds: [],
    },
  });

  const { mutate, isPending } = useCreateNotification(() => reset());

  const targetingMode = watch("targetingMode");
  const showTargetUserIds = targetingMode === 1 || targetingMode === 2;

  const onSubmit = (data: CreateNotificationDto) => mutate(data);

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <header className="flex items-center gap-3 mb-8 self-start w-full max-w-md">
        <Bell className="h-7 w-7" />
        <h1 className="text-3xl font-bold">Enviar Notificação</h1>
      </header>

      <form className="flex flex-col items-center gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="w-full max-w-md">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Título</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="title"
                  type="text"
                  placeholder="Título da notificação"
                  aria-invalid={!!errors.title}
                  {...register("title")}
                />
              </InputGroup>
              <FieldDescription className={errors.title ? "text-destructive" : ""}>
                {errors.title?.message ?? ""}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="body">Mensagem</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="body"
                  placeholder="Conteúdo da notificação"
                  rows={4}
                  aria-invalid={!!errors.body}
                  {...register("body")}
                />
              </InputGroup>
              <FieldDescription className={errors.body ? "text-destructive" : ""}>
                {errors.body?.message ?? ""}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Destinatários</FieldLabel>
              <Controller
                name="targetingMode"
                control={control}
                render={({ field }) => (
                  <AppSelect
                    options={TARGETING_MODE_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecione os destinatários"
                  />
                )}
              />
              <FieldDescription className={errors.targetingMode ? "text-destructive" : ""}>
                {errors.targetingMode?.message ?? ""}
              </FieldDescription>
            </Field>

            {showTargetUserIds && (
              <Field>
                <FieldLabel htmlFor="targetUserIds">IDs dos usuários</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="targetUserIds"
                    type="text"
                    placeholder="UUIDs separados por vírgula"
                    aria-invalid={!!errors.targetUserIds}
                    {...register("targetUserIds", {
                      setValueAs: (value: string) =>
                        typeof value === "string"
                          ? value.split(",").map((s) => s.trim()).filter(Boolean)
                          : value,
                    })}
                  />
                </InputGroup>
                <FieldDescription className={errors.targetUserIds ? "text-destructive" : ""}>
                  {errors.targetUserIds?.message ?? "Insira os UUIDs separados por vírgula"}
                </FieldDescription>
              </Field>
            )}

            <Field>
              <FieldLabel>Canal de entrega</FieldLabel>
              <Controller
                name="deliveryChannel"
                control={control}
                render={({ field }) => (
                  <AppSelect
                    options={DELIVERY_CHANNEL_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecione o canal de entrega"
                  />
                )}
              />
              <FieldDescription className={errors.deliveryChannel ? "text-destructive" : ""}>
                {errors.deliveryChannel?.message ?? ""}
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button size="lg" type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Enviando..." : "Enviar Notificação"}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
