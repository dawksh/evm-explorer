import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import FunctionCard from "../../components/FunctionCard";
import { useRouter } from "next/router";

function Explore() {
	const [contractAddress, setContractAddress] = useState<any>(null);
	const [abi, setAbi] = useState<null | Array<any>>(null);

	const router = useRouter();

	useEffect(() => {
		let details = JSON.parse(localStorage.getItem("details") as string);
		setContractAddress(details.address);
		setAbi(details.functions);
	}, []);

	return (
		<Box p={8}>
			<Flex
				direction={"column"}
				justifyItems="center"
				alignItems={"center"}
			>
				<Input
					value={(contractAddress as string) || ""}
					isReadOnly
					maxWidth={"md"}
					my={8}
				/>
				<Flex
					justifyContent={"center"}
					alignItems={"center"}
					direction={"row"}
					wrap="wrap"
				>
					{abi &&
						abi.map((el, idx) => (
							<FunctionCard func={el} key={idx} index={idx} />
						))}
				</Flex>
				<Button
					onClick={(e) => {
						router.push("/");
					}}
					my={4}
					p={4}
				>
					Explore New Contract
				</Button>
			</Flex>
		</Box>
	);
}

export default Explore;
