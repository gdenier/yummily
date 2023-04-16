import { SignIn } from "@clerk/nextjs/app-beta"

export default function SigninPage() {
  return <SignIn signUpUrl="http://localhost:3006/sign-up" />
}
