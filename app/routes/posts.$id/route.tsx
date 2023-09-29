import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { useEffect } from "react";
import type { LoaderFunctionArgs } from "react-router";
import type { Post } from "~/models/post.server";
import { deletePost, getPost, togglePostActive } from "~/models/post.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("ACTION id");
  const formData = await request.formData();

  if (request.method == "POST") {
    const updatedPostId = (formData.get("id")?.valueOf() as string) ?? "";
    const updatePass = (formData.get("password")?.valueOf() as string) ?? "";

    await togglePostActive({ id: updatedPostId, password: updatePass });

    return redirect("/");
  }
  if (request.method == "DELETE") {
    const deletedPostId = (formData.get("id")?.valueOf() as string) ?? "";
    const deletePass = (formData.get("password")?.valueOf() as string) ?? "";

    await deletePost({ id: deletedPostId, password: deletePass });

    return redirect("/");
  }
  console.log("fim do action sem fazer nada");
  return null;
};

type LoaderData = {
  post: Post | null;
  password: string;
};

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pass = url.searchParams.get("pass");

  if (params["id"] && pass) {
    const post: Post | null = await getPost({
      id: params["id"],
      password: pass,
    });

    return json({ post: post, password: pass });
  }

  return null;
};

export default function ViewPost() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const data = useLoaderData<LoaderData | null>();

  useEffect(() => {
    if (data?.post != null) {
      const confirmPublish = confirm(
        `Tópico: ${data.post.description}
        \nAutor: ${data.post.authorName}
        \nLocal: ${data.post.authorCity}, ${data?.post?.authorCountry}
        
        Para APAGAR o Tópico clique em CANCELAR.
        Para PUBLICAR o Tópico clique em OK.`,
      );

      const method = confirmPublish ? "POST" : "DELETE";
      console.log(`metodo: ${method}`);
      console.log(`senha: ${data.password}`);
      console.table(data);

      fetcher.submit(
        { id: data.post.id, password: data.password },
        {
          method: method,
          preventScrollReset: true,
        },
      );

      navigate("/");
    }
  }, []);

  return <div>ViewPost. data: {data?.post?.description.toString()}</div>;
}
