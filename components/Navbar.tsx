import React, { useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

declare const window: any;

function Navbar() {
	const [account, setAccount] = useState<string | null>(null);

	const connectWallet = async () => {
		let accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		setAccount(accounts[0]);
	};

	useEffect(() => {
		let conf = localStorage.getItem("Autoconnect");
		if (conf === "true") {
			connectWallet();
		}
	});

	return (
		<Box p={4}>
			<Flex justify={"space-between"} align="center" maxHeight={"3xs"}>
				Some App Name
				{account ? (
					<Button>
						{account.substring(0, 4) +
							"..." +
							account.substring(
								account.length - 4,
								account.length
							)}
					</Button>
				) : (
					<Button onClick={connectWallet}>Connect Wallet</Button>
				)}
			</Flex>
		</Box>
	);
}

export default Navbar;
