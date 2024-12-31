"use client";
import { Button, Checkbox, Form, Input, message, Typography } from "antd"; // Import necessary components

import { AllImages } from "@/assets/AllImages";
import { MyLoading } from "@/components/shared/common/my-loading";
import { StatusCode } from "@/constants/code.constant";
import {
  useLoggedInUserQuery,
  useLogInMutation,
} from "@/redux/feature/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleLinkedInLogin from "./GoogleLinkedInLogin";

const LogInPage = () => {
  const router = useRouter();
  const [logIn, { isLoading }] = useLogInMutation();
  const { data, isLoading: isLoadingUser } = useLoggedInUserQuery();

  const onFinish = (values) => {
    const finalData = {
      email: values?.email,
      password: values?.password,
    };
    logIn(finalData)
      .unwrap()
      .then((res) => {
        if (res.code === StatusCode.OK) {
          router.push("/storylining");
        }
      })
      .catch((error) => {
        message.error(error?.data?.message || "Login failed");
      });
  };

  if (isLoadingUser) {
    return <MyLoading />;
  }
  if (data?.code === StatusCode.OK) {
    router.push("/overview");
  }
  return (
    <div className="bg-gray-100 md:px-10 py-10">
      <Image
        src={AllImages.logoBlack}
        alt="logo"
        className=" lg:h-full mx-auto md:mx-0"
      />
      <div className="  h-screen flex flex-col justify-center">
        <div className="flex md:flex-row flex-col ">
          <div className=" flex flex-col justify-center max-w-xl px-6 py-8 bg-white shadow-xl rounded-lg  mx-auto md:w-[50%]">
            <GoogleLinkedInLogin />

            <Form name="login" onFinish={onFinish} layout="vertical">
              {/* Email */}
              <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                Email
              </Typography.Title>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                name="password"
                className="text-primary-color "
              >
                <Input.Password className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
              </Form.Item>

              {/* Terms Checkbox */}
              <div className="flex my-4 items-center justify-between justify-items-center">
                <Form.Item name="terms" valuePropName="checked">
                  <Checkbox className="md:text-base text-sm md:mt-3 pt-6">
                    Keep me logged in
                  </Checkbox>
                </Form.Item>
                <div>
                  <Link
                    href="/forgot-password-email"
                    className="md:text-base text-sm text-black hover:text-yellow-500 underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="bg-gray-900 text-white h-12 text-base font-semibold"
                  block
                  loading={isLoading}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>

            {/* Link to Login Page */}
            <div className="text-center mt-4">
              <span>Don't have an account? </span>
              <Link href="/sign-up" className="text-yellow-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
