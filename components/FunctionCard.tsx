import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";

const FunctionCard = ({ func, index }: any) => {
	return (
		<Link href={`/explore/${index}`}>
			<Box
				borderRadius={8}
				mx={2}
				my={4}
				p={8}
				minHeight={4}
				border={"1px"}
				borderColor="whiteAlpha"
			>
				<Flex>{func.name}</Flex>
			</Box>
		</Link>
	);
};

export default FunctionCard;
