"use server";

import { LoginFormSchema, RegisterFormSchema } from "@/lib/schemas";
import prisma from "@/app/db/index"
import bcrypt from "bcrypt";
import { createSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { RegisterState } from "@/types/type"

export async function register(state: RegisterState, formData: FormData): Promise<RegisterState>{

  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { email, name, password } = validatedFields.data
  const userAvaialble = await prisma.user.findFirst({
    where: {
        email: email
    }
  })
  if(userAvaialble) {
    return {
        errors: {
          email: "Email already exists in our database!",
        },
      };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
        email,
        name,
        password: hashedPassword
    }
  });
  await createSession({
    id: user.id.toString(),
    name: user.name,
  })

  redirect("/onboarding");
}
