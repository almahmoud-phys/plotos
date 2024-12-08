import { Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <Container size="1" className="py-20">
      <Card size="4">
        <Flex direction="column" gap="5">
          <div className="text-center">
            <Heading size="6" mb="2">Create an account</Heading>
            <Text size="2" color="gray">Get started with Plotos.ai</Text>
          </div>

          <form className="space-y-4">
            <TextField.Root>
              <TextField.Input placeholder="Full name" />
            </TextField.Root>

            <TextField.Root>
              <TextField.Input placeholder="Email" type="email" />
            </TextField.Root>
            
            <TextField.Root>
              <TextField.Input placeholder="Password" type="password" />
            </TextField.Root>

            <TextField.Root>
              <TextField.Input placeholder="Confirm password" type="password" />
            </TextField.Root>

            <Button className="w-full">Sign up</Button>
          </form>

          <Text size="2" className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </Text>
        </Flex>
      </Card>
    </Container>
  );
}
