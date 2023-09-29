import type { Post } from ".prisma/client";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { JsonifyObject } from "type-fest/source/jsonify";
import type { InactivePostView } from "./models/post.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as Record<string, unknown>;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function requestPassword(): string {
  return prompt("Digite a chave mestra") ?? "";
}

export function toUnapprovedPost(
  unapprovedPostJson: JsonifyObject<{
    id: string;
    active: boolean;
    createdAt: Date;
    tags: string;
  }>,
): InactivePostView {
  return {
    ...unapprovedPostJson,
    createdAt: new Date(unapprovedPostJson.createdAt) ?? new Date(),
  };
}

export function toPost(
  postJson: JsonifyObject<{
    id: string;
    active: boolean;
    createdAt: Date;
    tags: string;
    upVotes: number;
    downVotes: number;
    description: string;
    authorName: string;
    authorCity: string;
    authorCountry: string;
  }>,
) {
  return {
    ...postJson,
    upVotes: postJson.upVotes ?? 0,
    downVotes: postJson.downVotes ?? 0,
    createdAt: new Date(postJson.createdAt) ?? new Date(),
  };
}

export function orderByTotalVotes(post: Post, next: Post): number {
  if (post.upVotes + post.downVotes > next.upVotes + next.downVotes) {
    return -1;
  } else {
    return +1;
  }
}

export function orderByCreationTime(
  post: { createdAt: Date },
  next: { createdAt: Date },
) {
  return post.createdAt.getTime() > next.createdAt.getTime() ? -1 : 0;
}
