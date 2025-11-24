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
export async function createEditCabins(newCabin, id) {
  if (!newCabin) throw new Error("newCabin is required in createEditCabins");

  console.log("📦 Received data:", newCabin);
  console.log("🆔 ID:", id);

  // BƯỚC 1: Kiểm tra xem có phải đang edit và image đã tồn tại chưa
  const hasImgPath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith?.(supabaseUrl);

  let imagePath = newCabin.image; // Giữ nguyên nếu đã có path

  // BƯỚC 2: Nếu có file mới thì upload
  if (!hasImgPath) {
    let imageFile = newCabin.image;

    // Kiểm tra nếu image là FileList thì lấy file đầu tiên
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

    // Tạo tên file unique và đường dẫn
    const imgName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-image/${imgName}`;

    console.log("🔗 Image path:", imagePath);

    // Upload ảnh lên Supabase Storage
    console.log("⬆️ Uploading to storage...");
    const { data: uploadData, error: storageError } = await supabase.storage
      .from("cabins-image")
      .upload(imgName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) {
      console.error("❌ Storage error:", storageError);
      throw new Error(`Image upload failed: ${storageError.message}`);
    }

    console.log("✅ Upload success:", uploadData);
  }

  // BƯỚC 3: Chuẩn bị data để insert/update (bỏ image object, chỉ giữ path)
  const { image, ...cabinData } = newCabin;

  let query = supabase.from("cabins");
  let data, error;

  // BƯỚC 4: Create hoặc Edit cabin
  if (!id) {
    // CREATE: Thêm cabin mới
    console.log("➕ Creating new cabin...");
    ({ data, error } = await query
      .insert([{ ...cabinData, image: imagePath }])
      .select()
      .single());
  } else {
    // EDIT: Cập nhật cabin hiện có
    console.log("✏️ Editing cabin with ID:", id);
    ({ data, error } = await query
      .update({ ...cabinData, image: imagePath })
      .eq("id", id)
      .select()
      .single());
  }

  // BƯỚC 5: Xử lý lỗi
  if (error) {
    console.error("❌ Database error:", error);
    // Rollback: Xóa ảnh đã upload nếu create/edit thất bại (chỉ khi upload ảnh mới)
    if (!hasImgPath && imagePath) {
      const imgName = imagePath.split("/").pop();
      await supabase.storage.from("cabins-image").remove([imgName]);
    }
    throw new Error(
      `Cabin could not be ${id ? "updated" : "created"}: ${error.message}`
    );
  }

  console.log("✅ Cabin saved successfully:", data);
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
    const imgName = image.split("/").pop(); // Lấy tên file từ đường dẫn ảnh
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
