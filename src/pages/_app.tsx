import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { mantineProviderTheme } from "@/themes/mantine.theme";
import { appWithTranslation } from "next-i18next";
import { Notifications } from "@mantine/notifications";
import { Poppins } from "next/font/google";
import AuthContextProvider from "@/contexts/auth.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Create a client
const queryClient = new QueryClient();

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineProviderTheme}>
        <AuthContextProvider>
          <main className={poppins.className}>
            <Notifications />
            <Component {...pageProps} />
          </main>
        </AuthContextProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
