import { ROUTES } from "@/constants/routes.constant";
import { useAuthContext } from "@/contexts/auth.context";
import { Button, Card, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Form, useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import FormComponent from "@/components/form.component";
import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "@/apis/auth.api";
import { IApiBaseResponse, IApiLoginResponse } from "@/types/api.type";
import { getAuthTokenFromSSRContext, setBrowserAuthTokenCookie } from "@/utils/auth.util";
import { apiGetMe } from "@/apis/me.api";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const token = getAuthTokenFromSSRContext(req);
  if (!!token) {
    return {
      redirect: { destination: ROUTES.HOMEPAGE, permanent: false },
    };
  }
  return {
    props: {},
  };
};

interface ILoginPageProps {}

type TFormValues = {
  username: string;
  password: string;
};

const loginSchema = yup.object<TFormValues>({
  username: yup.string().required("Silahkan input username"),
  password: yup.string().required("Silahkan input password"),
});

const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const { isLogin, setLoggedInUser } = useAuthContext();
  const { replace } = useRouter();
  const { getInputProps, onSubmit, setErrors, setValues } = useForm<TFormValues>({
    initialValues: {
      password: "",
      username: "",
    },
    validate: yupResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["api-login"],
    mutationFn: apiLogin,
    onSuccess: handleLoginResponse,
  });

  useEffect(() => {
    if (!!isLogin) {
      replace(ROUTES.HOMEPAGE);
    }
  }, [isLogin, replace]);

  async function handleLoginResponse(resp: IApiBaseResponse<IApiLoginResponse>) {
    if (!resp.success) {
      setValues({
        password: "",
      });
      setErrors({
        password: resp.errors![0].detail,
      });
    }

    setBrowserAuthTokenCookie(resp.data!.token);
    const me = await apiGetMe();
    if (me.success) setLoggedInUser(me.data!.user);
  }

  async function handleSubmit(values: TFormValues) {
    await mutate({ password: values.password, username: values.username });
  }

  return (
    <Group h={"100vh"} w={"100vw"} align="center" position="center">
      <Card withBorder>
        <FormComponent onSubmit={onSubmit(handleSubmit)}>
          <Stack miw={"25rem"}>
            <TextInput label="Username" {...getInputProps("username")} />
            <PasswordInput label="Password" {...getInputProps("password")} />

            <Button loading={isPending} type="submit">
              Login
            </Button>
          </Stack>
        </FormComponent>
      </Card>
    </Group>
  );
};
export default LoginPage;
