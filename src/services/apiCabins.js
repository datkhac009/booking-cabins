import { supabase } from "./supbase";
//getCabins
export async function apiCabins() {
  const {data,error} = await supabase
  .from("cabins")
  .select("*")
  .order("id",{ascending:true})//ascending:true là tăng dần còn ascending:false là giảm dần
  console.log(data)
  if(error) throw new Error("Error Cabins");
  return data
  
}

//DeleteCabins
export async function deleteCabin(id) {
 const { data, error, count, status } = await supabase
  .from('cabins')
  .delete({ count: 'exact' })
  .eq('id', id)         // thử id chắc chắn có
  .select('id');

console.log({ data, error, count, status });
}
