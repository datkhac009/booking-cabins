import { supabase } from "./supbase";
export async function apiCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
//   console.log(data)
  return data;
}
