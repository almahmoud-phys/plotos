"use client"

import { useState } from "react"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { Flex, Text } from "@radix-ui/themes"
import { ArrowRight, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import "../styles/LoginDialog.css"

export function LoginDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsOpen(false);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <button 
          type="button"
          className="btn btn-outline"
          onClick={() => setIsOpen(true)}
        >
          Log in
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="LoginDialog__Overlay" />
        <AlertDialog.Content className="LoginDialog__Content">
          <AlertDialog.Cancel asChild>
            <button className="LoginDialog__CloseButton" aria-label="Close">
              <X size={20} />
            </button>
          </AlertDialog.Cancel>
          <form onSubmit={handleSignIn}>
            <Flex direction="column" gap="4">
              <button 
                type="button"
                className="LoginDialog__GoogleButton"
                onClick={() => {/* TODO: Implement Google Sign In */}}
              >
                <Image
                  src="/google.svg"
                  alt="Google logo"
                  width={16}
                  height={16}
                />
                Continue with Google
              </button>

              <div className="LoginDialog__Separator">
                <span className="text-gray-600">or</span>
              </div>

              {error && (
                <Text color="red" className="text-center">
                  {error}
                </Text>
              )}

              <div className="LoginDialog__TextField">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="LoginDialog__TextField">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="LoginDialog__Button"
                disabled={isLoading}
              >
                Log in
              </button>

              <div className="LoginDialog__Links">
                <a href="#" onClick={() => {/* TODO: Implement single sign-on */}}>
                  Use single sign-on
                </a>
                <a href="#" onClick={() => {/* TODO: Implement reset password */}}>
                  Reset password
                </a>
                <span className="text-gray-600">
                  No account?{" "}
                  <a href="#" onClick={() => {/* TODO: Implement create account */}}>
                    Create one
                  </a>
                </span>
              </div>
            </Flex>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
