import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/inter";
import { DefaultSeo } from "next-seo";
import splitbee from "@splitbee/web";
import { useEffect } from "react";

const theme = extendTheme({
	fonts: {
		heading: "Inter",
		body: "Inter",
	},
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	styles: {
		global: (props: any) => ({
			body: {
				color: mode("gray.800", "whiteAlpha.900")(props),
				bg: mode("gray.100", "#141214")(props),
			},
		}),
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		splitbee.init();
	}, []);

	return (
		<ChakraProvider theme={theme}>
			<DefaultSeo
				openGraph={{
					type: "website",
					locale: "en_IE",
					url: "https://evm-explorer.vercel.app/",
					site_name: "EVM Explorer",
				}}
				twitter={{
					handle: "@0xDak",
					site: "@0xDak",
					cardType: "summary_large_image",
				}}
			/>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
