import { supabase } from "./supbase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message || "Error Login");

  console.log(data);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message || "Error Login");
  console.log(data);
  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message || "Error Login");

  return data?.user ?? null;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message || "Error Logout");
}
