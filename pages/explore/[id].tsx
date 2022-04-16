import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Input, Button, Heading } from "@chakra-ui/react";
import { ethers } from "ethers";
import Navbar from "../../components/Navbar";

declare const window: any;

const ID = () => {
	const router = useRouter();
	const { id } = router.query;
	const [contractAddress, setContractAddress] = useState<null | string>(null);
	const [abi, setAbi] = useState<null | Array<any>>(null);
	const [params, setParams] = useState<any>();

	let contract: any;

	useEffect(() => {
		let details = JSON.parse(localStorage.getItem("details") as string);
		setContractAddress(details.address);
		setAbi(details.functions);
	}, []);

	useEffect(() => {
		if (window.ethereum !== undefined && contractAddress) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			contract = new ethers.Contract(
				contractAddress as string,
				JSON.stringify(abi),
				signer
			);
		}
	});

	const runTxn = async () => {
		let funcName = abi && abi[parseInt(id as string)].name;
		console.log(contract);
		try {
			let txn = await contract.cutDenominator;
			console.log(txn);
		} catch (e) {
			alert("error occurred, check console");
			console.error(e);
		}
	};

	return (
		<>
			<Navbar />
			<Box p={8}>
				{id && (
					<Flex justify={"center"} align="center" direction="column">
						<Heading my={4}>
							{abi && abi[parseInt(id as string)].name}
						</Heading>
						{abi &&
							abi[parseInt(id as string)].inputs.map(
								(el: any) => (
									<Input
										placeholder={el.name}
										onChange={(e: any) => {
											setParams({
												[el.name]: e.target.value,
											});
										}}
									/>
								)
							)}
						<Button p={4} onClick={runTxn} my={6}>
							Run{" "}
						</Button>
					</Flex>
				)}
			</Box>
		</>
	);
};

export default ID;
