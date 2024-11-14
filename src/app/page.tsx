"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// Define the form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const onSubmit = async (values: LoginValues) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        form.setError("root", {
          message: error.message,
        });
      } else {
        router.push("/dashboard");
      }
    } catch {
      form.setError("root", {
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="GMS Logo"
              width={100}
              height={100}
              className="h-20 w-20"
            />
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Login to GMS
          </h2>
        </CardHeader>

        <CardContent>
          {formState.errors.root && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        disabled={isSubmitting}
                        {...field}
                        className={cn(
                          "transition-colors",
                          formState.errors.email && "border-destructive"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Button
                        variant="link"
                        className="px-0 font-normal"
                        type="button"
                        onClick={() => router.push("/forgot-password")}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isSubmitting}
                        {...field}
                        className={cn(
                          "transition-colors",
                          formState.errors.password && "border-destructive"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-sm"
            type="button"
            onClick={() => router.push("/register")}
          >
            Don&apos;t have an account? Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
