import React from "react";
import Link from "next/link";

const NonAuthHeader: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 text-2xl">
      <Link href="/">Discover</Link>
      <Link href="/api/auth/signin">Sign In</Link>
    </div>
  );
};

export default NonAuthHeader;
