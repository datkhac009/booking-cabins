import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "./useUser";
import { supabase } from "../../services/supbase";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();
  const [avatarUrl, setAvatarUrl] = useState("");

  const fullName = user?.user_metadata?.fullName;
  const avatarPath = user?.user_metadata?.avatar;

  useEffect(() => {
    async function loadAvatar() {
      if (!avatarPath) {
        setAvatarUrl("");
        return;
      }

      const { data, error } = await supabase.storage
        .from("avatar")
        .createSignedUrl(avatarPath, 60 * 60);

      if (error) {
        console.error("Error creating signed URL:", error.message);
        setAvatarUrl("");
        return;
      }

      setAvatarUrl(data.signedUrl);
    }

    loadAvatar();
  }, [avatarPath]);

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatarUrl || "/default-user.jpg"}
        alt={`Avatar user ${fullName || "user"}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
