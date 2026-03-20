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

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1 Update password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message || "Error Update");
  }
  if (!avatar) return data;

  //2 Upload the avatar image bucket private
  const fileExt = avatar.name.split(".").pop();
  const fileName = `avatar-${data.user.id}-${Date.now()}.${fileExt}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message || "Error avatarImg");
  }

  //3 Update avatar in the user

  const { data: updateAvatarUser, error: errorAvatarUser } =
    await supabase.auth.updateUser({
      data: {
        fullName: fullName ?? data.user.user_metadata.fullName,
        avatar: fileName,
      },
    });
  if (errorAvatarUser) {
    throw new Error(errorAvatarUser.message || "Error User");
  }
  return updateAvatarUser;
}
