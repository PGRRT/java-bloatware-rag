"use client";
import ContentWrapper from "@/components/ui/ContentWrapper";
import Input from "@/components/ui/Input";
import LinkRenderer from "@/components/ui/LinkRenderer";
import { typography } from "@/constants/typography";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/lib/schemas/registerSchema";

const VerifyEmail = ({
  register,
  errors,
  email,
  children,
}: {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  email: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <h4 css={[typography.textXxl]}>Verify email address</h4>
      <ContentWrapper gap="10px">
        <span css={[typography.textL]}>
          To verify your email , we've sent a One Time Password (OTP) to {email}
        </span>
      </ContentWrapper>
      <ContentWrapper direction="column" gap="25px">
        <Input
          label="Enter security code"
          type="text"
          autoComplete="off"
          {...register("otp")}
          error={errors.otp?.message}
        />

        {children}
      </ContentWrapper>
    </>
  );
};

export default VerifyEmail;
