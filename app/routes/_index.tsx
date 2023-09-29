import type { LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "react-router";

export const loader: LoaderFunction = async ({ params, request }) => {
  return redirect("/posts");
};

export default function Index() {
  return <></>;
}
