import { Box, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const FunctionCard = ({ func, index }: any) => {
	return (
		<Link href={`/explore/${index}`}>
			<Button
				borderRadius={8}
				mx={2}
				my={4}
				p={8}
				minHeight={4}
				border={"1px"}
				borderColor="whiteAlpha"
				bgColor={"transparent"}
			>
				<Flex>{func.name}</Flex>
			</Button>
		</Link>
	);
};

export default FunctionCard;
