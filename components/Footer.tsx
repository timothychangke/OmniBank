import React from "react";
import Image from "next/image";
import { logoutAccount } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const Footer = ({
  user,
  type,
}: {
  user: User;
  type?: "desktop" | "mobile";
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) {
      router.push("/sign-in");
    }
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700 ">{user?.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-normal text-gray-600 font-semibold">
          {user.name}
        </h1>
        <p className="text-14 truncate font-normal text-gray-700 ">
          {user.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image src="/icons/logout.svg" fill alt="logout" />
      </div>
    </footer>
  );
};

export default Footer;
