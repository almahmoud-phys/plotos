"use client";

import { useState } from "react";
import { Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
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
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="1" className="py-20">
      <Card size="4" className="w-full max-w-md mx-auto">
        <form onSubmit={handleSignIn}>
          <Flex direction="column" gap="5">
            <div className="text-center">
              <Heading size="6" mb="2">Welcome to Plotos.ai</Heading>
              <Text color="gray">Sign in to your account to continue</Text>
            </div>

            {error && (
              <Text color="red" className="text-center">
                {error}
              </Text>
            )}

            <Flex direction="column" gap="3">
              <TextField.Root>
                <TextField.Root
                  size="3"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </TextField.Root>

              <TextField.Root>
                <TextField.Root
                  size="3"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </TextField.Root>
            </Flex>

            <Button size="3" disabled={isLoading}>
              {isLoading ? (
                "Signing in..."
              ) : (
                <Flex align="center" gap="2">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </Flex>
              )}
            </Button>

            <Text className="text-center" color="gray">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </Text>
          </Flex>
        </form>
      </Card>
    </Container>
  );
}
