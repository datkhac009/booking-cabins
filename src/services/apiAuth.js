import { supabase } from "./supbase";

export async function login({email, password}) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message || "Error Login");
  console.log(data)
  return data;
}
