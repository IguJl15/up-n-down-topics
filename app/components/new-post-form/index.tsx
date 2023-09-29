import { Form } from "./form-component";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Obrigatório"),
  name: z.string().min(1, "Obrigatório").min(3, "Pelo menos 3 caracteres"),
  city: z.string().min(1, "Obrigatório").min(3, "Pelo menos 3 caracteres"),
  country: z.string().min(1, "Obrigatório"),
  tags: z.string().min(1, "Obrigatório"),
});

export default function NewPostForm() {
  return (
    <div id="create-post-form">
      <h3>Compartilhe uma opinião</h3>
      <Form className="form" schema={schema} method="post">
        {({ Field, Errors, Button }) => (
          <>
            <Field
              name="title"
              label="Tópico"
              placeholder="O que você quer expressar?"
              className="main-field"
            />
            <Field name="name" label="Nome" className="vertical-field" />
            <div className="form-row">
              <Field name="city" label="Cidade" className="vertical-field" />
              <Field name="country" label="País" className="vertical-field" />
            </div>
            <Field name="tags" label="Tags" className="vertical-field" />
            <Errors itemID="error" />
            <Button>Postar</Button>
          </>
        )}
      </Form>
    </div>
  );
}
