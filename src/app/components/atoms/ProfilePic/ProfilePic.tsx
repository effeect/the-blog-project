import React from "react";
import Image from "next/image";
const ProfilePic = () => {
  return (
    <div className="is-flex is-justify-content-center mb-5">
      <figure className="image is-128x128">
        <Image
          src="/profile.jpeg"
          alt="Oliver's profile"
          width={128}
          height={128}
          className="is-rounded"
          style={{
            border: "4px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            objectFit: "cover",
          }}
        />
      </figure>
    </div>
  );
};

export default ProfilePic;
