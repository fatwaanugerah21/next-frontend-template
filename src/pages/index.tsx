import React from "react";
import SEO from "../components/seo.component";
import MainLayout from "../layouts/main.layout";
import { Button, Card, Flex, Group, Input, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import InputComponent from "../components/input.component";
import FormComponent from "@/components/form.component";
import Link from "next/link";
import { ROUTES } from "@/constants/routes.constant";
import { useAuthContext } from "@/contexts/auth.context";
import { deleteBrowserAuthTokenCookie, getAuthTokenFromSSRContext } from "@/utils/auth.util";
import { useRouter } from "next/router";

interface IHomepageProps {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const token = getAuthTokenFromSSRContext(req);
  if (!token) {
    return {
      redirect: { destination: ROUTES.LOGIN, permanent: false },
    };
  }
  return {
    props: {},
  };
};

const Homepage: React.FC<IHomepageProps> = ({}) => {
  const { loggedInUser } = useAuthContext();
  const { replace } = useRouter();

  function handleLogout() {
    deleteBrowserAuthTokenCookie();
    replace(ROUTES.LOGIN);
  }
  return (
    <>
      <SEO title={"Price Simulator"} />

      <MainLayout>
        <Stack py={"xl"}>
          <Title>Halo {loggedInUser?.name}</Title>

          <Button onClick={handleLogout}>Logout</Button>
        </Stack>
      </MainLayout>
    </>
  );
};
export default Homepage;
