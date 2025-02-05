"use server";

import { LoginFormSchema, RegisterFormSchema } from "@/lib/schemas";
import prisma from "@/app/db/index"
import bcrypt from "bcrypt";
import { createSession, decrypt } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { RegisterState, SessionPayload } from "@/types/type"
import { cookies } from "next/headers";

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

export async function login(state: RegisterState, formData: FormData): Promise<RegisterState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { email, password } = validatedFields.data
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  if (!user) return { errors: { email: "Invalid credentials." } };

  const matchedPassword = await bcrypt.compare(password, user.password)
  if(!matchedPassword) return { errors: { email: "Invalid credentails." } }

  await createSession({
    id: user.id.toString(),
    name: user.name,
  })

  redirect("/onboarding")
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}


export default async function getAuthUser(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    if(session) {
        const user = await decrypt(session)
        return user as SessionPayload
    }
    return null
}