"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

import { ComponentType } from "react";

const withAuth = (WrappedComponent: ComponentType) => {
  const AuthenticatedComponent = (
    props: React.ComponentProps<typeof WrappedComponent>
  ) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/");
        } else {
          setIsAuthenticated(true);
        }
      };
      checkUser();
    }, [router]);

    if (!isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;
