"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const session = useSessionContext();
  const { onClose, isOpen, view } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title={view === "sign_in" ? "Welcome Back" : "Welcome to Spotify"}
      description={
        view === "sign_in"
          ? "Log In to your spotify account "
          : "Sign Up to your spotify account"
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        magicLink
        view={view as ViewType}
        theme="dark"
        providers={["github", "google"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22C55E",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
