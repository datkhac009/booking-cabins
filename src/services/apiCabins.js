import { supabase, supabaseUrl } from "./supbase";
//getCabins
export async function apiCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("id", { ascending: true }); //sắp xếp thứ tự: ascending:true là tăng dần còn ascending:false là giảm dần
  console.log(data);
  if (error) throw new Error(error.message || "Error Cabins");
  return data;
}
//Create Cabins và upload ảnh cabins vào storage
export async function createCabins(newCabin) {
  console.log("📦 Received data:", newCabin);
  
  // BƯỚC 1: Xử lý file ảnh
  // Kiểm tra nếu image là FileList (từ input file) thì lấy file đầu tiên
  let imageFile = newCabin.image;
  if (imageFile instanceof FileList) {
    console.log("⚠️ Converting FileList to File");
    imageFile = imageFile[0];
  }

  // Validate: Đảm bảo có file và có tên file
  if (!imageFile || !imageFile.name) {
    throw new Error("Please select an image");
  }

  console.log("📄 Image file:", imageFile);
  console.log("📝 File name:", imageFile.name);

  // BƯỚC 2: Tạo tên file unique và đường dẫn
  // Math.random() tạo số ngẫu nhiên tránh trùng tên
  // replaceAll("/", "") loại bỏ ký tự "/" trong tên file (tránh lỗi path)
  const imgName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
  
  // Tạo URL public để lưu vào database
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-image/${imgName}`;

  console.log("🔗 Image path:", imagePath);

  // BƯỚC 3: Upload ảnh lên Supabase Storage
  console.log("⬆️ Uploading to storage...");
  
  const { data: uploadData, error: storageError } = await supabase.storage
    .from("cabins-image") // Tên bucket storage (phải đã tạo trong Supabase)
    .upload(imgName, imageFile, {
      cacheControl: '3600',
      upsert: false // Không ghi đè file cũ
    });

  // Nếu upload ảnh thất bại thì dừng luôn, không tạo cabin
  if (storageError) {
    console.error("❌ Storage error:", storageError);
    throw new Error(`Image upload failed: ${storageError.message}`);
  }

  console.log("✅ Upload success:", uploadData);

  // BƯỚC 4: Tạo cabin record trong database
  // Destructuring để tách image ra, tránh gửi File object lên database
  const { image, ...cabinData } = newCabin;
    
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }]) // Gửi imagePath (string) thay vì File object
    .select("*");

  // BƯỚC 5: Xử lý lỗi khi tạo cabin
  if (error) {
    console.error("❌ Database error:", error);
    // Rollback: Xóa ảnh đã upload nếu tạo cabin thất bại
    await supabase.storage.from("cabins-image").remove([imgName]);
    throw new Error(`Cabin could not be created: ${error.message}`);
  }

  console.log("✅ Cabin created successfully:", data);

  // BƯỚC 6: Trả về data cabin đã tạo thành công
  return data;
}

//UpdataeCabins
export async function updateCabin(id, newUpdateCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update({ id: newUpdateCabin })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message || "Cabin could not be updated");
  return data;
}

//DeleteCabins
export async function deleteCabin(id) {
  // Lấy thông tin cabin để lấy đường dẫn ảnh trước khi xóa
  const { data: cabinData, error: cabinError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (cabinError) throw new Error(cabinError.message || "Cabin not found");
  const { image } = cabinData;

  // Hàm xóa cabin khỏi database
const { data, error, count, status } = await supabase
.from("cabins")
.delete({ count: "exact" }) // Chỉ định số lượng bản ghi đã xóa
.eq("id", id) // Kiểm tra xem id cabin có tồn tại hay không
.select("id"); // Lấy id của cabin đã xóa

// Kiểm tra nếu có lỗi từ database
if (error) {
  console.error("❌ Database error:", error); // In ra lỗi nếu có
  return null; // Trả về null nếu có lỗi
}

// Xóa ảnh trong Supabase Storage nếu có image
if (image) {
  const imgName = image.split('/').pop(); // Lấy tên file từ đường dẫn ảnh
  const { error: storageError } = await supabase.storage
  .from("cabins-image")
  .remove([imgName]); // Xóa ảnh từ storage dựa trên tên file

  // Kiểm tra nếu có lỗi trong việc xóa ảnh
  if (storageError) {
    console.error("❌ Storage error:", storageError); // In ra lỗi nếu có
  }
}

// Hiển thị thông tin về dữ liệu xóa, lỗi, và trạng thái
console.log({ data, error, count, status });
return data; // Trả về dữ liệu đã xóa
}
