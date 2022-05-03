import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Input, Button, Heading, Textarea } from "@chakra-ui/react";
import { ethers } from "ethers";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

declare const window: any;

const ID = () => {
	const router = useRouter();
	const { id } = router.query;
	const [contractAddress, setContractAddress] = useState<null | string>(null);
	const [abi, setAbi] = useState<null | Array<any>>(null);
	const [params, setParams] = useState<any>("");
	const [fee, setFee] = useState<any>("0");
	const [response, setResponse] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);

	let contract: any;

	useEffect(() => {
		let details = JSON.parse(localStorage.getItem("details") as string);
		setContractAddress(details.address);
		setAbi(details.functions);
		toast("Select the network in metamask before running the function");
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

	const paidTxn = async () => {
		setLoading(true);
		let funcName = abi && abi[parseInt(id as string)].name;
		console.log(contract);
		console.log(...Object.values(params));
		try {
			let txn = await contract[funcName](...Object.values(params), {
				value: ethers.utils.parseEther(fee),
			});
			console.log(txn);
			if (typeof txn === "object") {
				setResponse(JSON.stringify(txn));
				setLoading(false);
			} else {
				setResponse(txn);
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			alert("error occurred, check console");
			console.error(e);
		}
	};

	const runTxn = async () => {
		setLoading(true);
		let funcName = abi && abi[parseInt(id as string)].name;
		console.log(contract);
		try {
			let txn = await contract[funcName](...Object.values(params));
			console.log(txn);
			if (typeof txn === "object") {
				setResponse(JSON.stringify(txn));
				setLoading(false);
			} else {
				setResponse(txn);
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			alert("error occurred, check console");
			console.error(e);
		}
	};

	const transact = async () => {
		if (abi && abi[parseInt(id as string)].stateMutability === "payable") {
			await paidTxn();
		} else {
			await runTxn();
		}
	};

	return (
		<>
			<Box p={8}>
				<Button onClick={(e) => router.back()}>🔙 Go Back</Button>
				{id && (
					<Flex justify={"center"} align="center" direction="column">
						<Heading my={4}>
							{abi && abi[parseInt(id as string)].name}
						</Heading>
						{abi &&
							abi[parseInt(id as string)].inputs.map(
								(el: any) => (
									<Input
										key={el.name}
										type={el.type}
										required
										placeholder={el.name}
										my={4}
										onChange={(e: any) => {
											let val: any;
											if (el.type == "uint256") {
												val = ethers.utils.parseEther(
													e.target.value
												);
											} else {
												val = e.target.value;
											}
											setParams({
												...params,
												[el.name]: val,
											});
										}}
									/>
								)
							)}
						{abi &&
						abi[parseInt(id as string)].stateMutability ===
							"payable" ? (
							<Input
								value={fee}
								my={4}
								type="number"
								placeholder="Value in Ether"
								onChange={(e) => setFee(e.target.value)}
								variant="flushed"
							/>
						) : (
							false
						)}
						<Button
							isLoading={loading}
							p={4}
							onClick={transact}
							my={6}
						>
							Run{" "}
						</Button>
						{response ? (
							<Textarea
								minHeight={"sm"}
								value={response}
								isReadOnly
							/>
						) : (
							false
						)}
					</Flex>
				)}
			</Box>
		</>
	);
};

export default ID;
