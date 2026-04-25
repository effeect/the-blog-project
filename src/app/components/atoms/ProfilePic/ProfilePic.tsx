import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";

const ProfilePic = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Image
        src="/profile.jpeg"
        alt="Oliver's profile"
        width={128}
        height={128}
        style={{
          borderRadius: "50%",
          border: "1px solid white",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default ProfilePic;
