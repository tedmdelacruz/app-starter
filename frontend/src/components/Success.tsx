import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

interface AlertProps {
	message: string
}


export default function Success({ message }: AlertProps) {
	return (
		message ? <Alert status="success">
			<AlertIcon />
			<AlertDescription>
				{message}
			</AlertDescription>
		</Alert>
		: null
	)
}
