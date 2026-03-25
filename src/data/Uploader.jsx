import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import { supabase } from "../services/supbase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// Xóa toàn bộ data trong bảng guest
async function deleteGuests() {
  const { error } = await supabase.from("guest").delete().gt("id", 0);
  if (error) console.log(" deleteGuests:", error.message);
}

// Xóa toàn bộ data trong bảng cabins
async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(" deleteCabins:", error.message);
}

// Xóa toàn bộ data trong bảng bookings
async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(" deleteBookings:", error.message);
}

// Tạo guests từ data-guests.js
// Lưu ý: tên cột trong Supabase là "fullname" (chữ thường), không phải "fullName"
async function createGuests() {
  // Map lại để đổi fullName → fullname cho khớp tên cột trong Supabase
  const guestsFixed = guests.map((g) => ({
    fullname: g.fullname,       
    email: g.email,
    nationality: g.nationality,
    nationalID: g.nationalID,
    countryFlag: g.countryFlag,
  }));

  const { error } = await supabase.from("guest").insert(guestsFixed);
  if (error) console.log(" createGuests:", error.message);
  else console.log("✅ createGuests: thành công");
}

// Tạo cabins từ data-cabins.js
async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(" createCabins:", error.message);
  else console.log("✅ createCabins: thành công");
}

// Tạo bookings từ data-bookings.js
// Lưu ý: phải tạo guests và cabins trước để lấy ID thật từ DB
async function createBookings() {
  // Lấy danh sách ID của guest theo thứ tự tăng dần
  const { data: guestsIds } = await supabase
    .from("guest")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((g) => g.id);

  // Lấy danh sách ID của cabins theo thứ tự tăng dần
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((c) => c.id);

  // Map từng booking sang đúng tên cột trong Supabase
  const finalBookings = bookings.map((booking) => {
    // Lấy thông tin cabin tương ứng để tính giá
    const cabin = cabins.at(booking.cabinId - 1);

    // Tính số đêm lưu trú
    const numNight = subtractDates(booking.endDate, booking.startDate);

    // Tính giá cabin (số đêm * (giá gốc - discount))
    const cabinsPrice = numNight * (cabin.regularPrice - cabin.discount);

    // Tính giá bữa sáng nếu có (15$ mỗi người mỗi đêm)
    const extrasPrice = booking.hasBreakfast
      ? numNight * 15 * booking.numGuests
      : 0;

    // Tổng tiền
    const totalPrice = cabinsPrice + extrasPrice;

    // Tính trạng thái booking dựa vào ngày
    let status;
    if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate)))
      status = "checked-out";   // Đã trả phòng
    if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate)))
      status = "unconfirmed";   // Chưa đến ngày
    if (
      (isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";    // Đang ở

    // Trả về object với đúng tên cột trong Supabase
 
    return {
      created_at: booking.created_at,
      startDate: booking.startDate,
      endDate: booking.endDate,
      numGuests: booking.numGuests,
      hasBreakfast: booking.hasBreakfast,
      isPaid: booking.isPaid,
      obvervations: booking.obvervations,   
      // Các field tính toán
      numNight,                              
      cabinsPrice,                          
      extrasPrice,
      totalPrice,
      status,
      // ID thật từ DB sau khi insert
      cabinID: allCabinIds.at(booking.cabinId - 1),   
      guestID: allGuestIds.at(booking.guestId - 1),   
    };
  });

  console.log("📦 finalBookings:", finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(" createBookings:", error.message);
  else console.log(" createBookings: thành công");
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  // Upload tất cả: xóa hết rồi tạo lại guests, cabins, bookings
  async function uploadAll() {
    setIsLoading(true);
    // Phải xóa bookings TRƯỚC (vì có foreign key)
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    // Phải tạo guests và cabins TRƯỚC bookings
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  }

  // Chỉ upload bookings (giữ nguyên guests và cabins)
  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}