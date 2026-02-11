import { Button } from "@/components/ui/Button"
import { Input } from "./components/ui/Input"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./components/ui/Field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./components/ui/InputGroup/input-group"
import { MailIcon } from "lucide-react"

function App() {

  return (
    <>
      <div>

      </div>
      <p className="var(--font-size-1)">
        Click on the Vite and React logos to learn more
      </p>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
          <Input id="fieldgroup-name" placeholder="Jordan Lee" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <InputGroup>
            <InputGroupInput type="email" placeholder="Enter your email" />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup> 
          <FieldDescription>
            We&apos;ll send updates to this address.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </>
  )
}

export default App
