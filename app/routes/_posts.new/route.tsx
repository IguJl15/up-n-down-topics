import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { CreatePostDto } from "~/models/post.server";
import { createPost } from "~/models/post.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const post: CreatePostDto = {
    description: (formData.get("post")?.valueOf() as string) ?? "",
    authorName: (formData.get("name")?.valueOf() as string) ?? "",
    authorCity: (formData.get("city")?.valueOf() as string) ?? "",
    authorCountry: (formData.get("country")?.valueOf() as string) ?? "",
    tags: (formData.get("tags")?.valueOf() as string) ?? "",
  };

  await createPost(post);

  return redirect("/");
};

export default function NewPost() {
  return (
    <div>
      <form method="post">
        <div>
          <label htmlFor="post">Tópico</label>
          <input type="text" name="post" id="post" />
        </div>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="city">Cidade</label>
          <input type="text" name="city" id="city" />
        </div>
        <div>
          <label htmlFor="country">País</label>
          <input type="text" name="country" id="country" />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
