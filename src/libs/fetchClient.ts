"use client";
import { getCookie } from "cookies-next";
import { signOut } from "next-auth/react";

export const fetchClient = async (
  path: string,
  init?: RequestInit,
  redirect: boolean = true
): Promise<Response> => {
  const token = getCookie("galaxy-store.session");

  const response = await fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if ((await response).status == 401 && redirect) {
    await signOut();
  }

  return response;
};
