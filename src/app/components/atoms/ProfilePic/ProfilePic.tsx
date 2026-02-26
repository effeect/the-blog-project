import React from "react";
import Image from "next/image";
const ProfilePic = () => {
  return (
    <div className="is-flex is-justify-content-center mb-2">
      <figure className="image is-128x128">
        <Image
          src="/profile.jpeg"
          alt="Oliver's profile"
          width={128}
          height={128}
          className="is-rounded"
          style={{
            border: "1px solid white",
            objectFit: "cover",
          }}
        />
      </figure>
    </div>
  );
};

export default ProfilePic;
