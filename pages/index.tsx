import type { NextPage } from "next";
import { Box, Flex, Heading, Textarea, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const Home: NextPage = () => {
	const [contractAddress, setContractAddress] = useState<null | string>(null);
	const [abi, setAbi] = useState<null | string>(null);

	const router = useRouter();

	const explore = () => {
		if (!contractAddress || !abi) {
			alert("Fill all the fields");
		} else {
			if (ethers.utils.isAddress(contractAddress)) {
				let arr: Array<any> = JSON.parse(abi);
				let filteredArr = arr.filter((el) => el.type == "function");
				const details = {
					address: contractAddress,
					functions: filteredArr,
				};
				localStorage.setItem("details", JSON.stringify(details));
				router.push("/explore");
			} else {
				alert("Contract Address is not valid!");
			}
		}
	};

	return (
		<Box p={8}>
			<Flex justify={"center"} alignItems={"center"} direction={"column"}>
				<Heading my={6}>EVM Explorer</Heading>
				<Input
					my={4}
					placeholder={"Contract address"}
					onChange={(e) => setContractAddress(e.target.value)}
					required
				/>
				<Textarea
					my={4}
					placeholder="ABI"
					required
					minHeight={400}
					onChange={(e) => setAbi(e.target.value)}
				/>
				<Button my={4} onClick={explore}>
					Explore Contract
				</Button>
			</Flex>
		</Box>
	);
};

export default Home;
