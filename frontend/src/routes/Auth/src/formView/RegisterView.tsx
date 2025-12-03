"use client";
import ContentWrapper from "@/components/ui/ContentWrapper";
import Input from "@/components/ui/Input";
import LinkRenderer from "@/components/ui/LinkRenderer";
import { typography } from "@/constants/typography";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/lib/schemas/registerSchema";

const RegisterView = ({
  register,
  errors,
  children,
}: {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <h4 css={[typography.textXxl]}>Sign up</h4>
      <ContentWrapper gap="10px">
        <span css={[typography.textL]}>Already have an account?</span>

        <LinkRenderer href="/login" includeLinkStyles>
          Log in
        </LinkRenderer>
      </ContentWrapper>
      <ContentWrapper direction="column" gap="25px">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          description="Password must be at least 6 characters long and include a mix of letters, numbers."
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirm Password"
          type="password"
          description="Please re-enter your password."
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {children}
      </ContentWrapper>
    </>
  );
};

export default RegisterView;
