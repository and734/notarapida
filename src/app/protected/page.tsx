"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user?.name || session.user?.email}!</h1>
        <p>This is a protected page.</p>
      </div>
    );
  }

  return null; // Or a loading spinner while redirecting
};

export default ProtectedPage;