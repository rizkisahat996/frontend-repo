import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const withAuth = (WrappedComponent: React.ComponentType, requireAuth: boolean = true) => {
  return (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (requireAuth && !user) {
          router.push("/login");
        } else if (!requireAuth && user) {
          router.push("/");
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return <div className="pd-container">Loading...</div>;
    }

    if (requireAuth && !user) {
      return null;
    }

    if (!requireAuth && user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};