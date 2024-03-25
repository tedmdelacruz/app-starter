import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

interface AlertProps {
	message: string
}


export default function Error({ message }: AlertProps) {
	return (
		message ? <Alert status="error">
			<AlertIcon />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				{message}
			</AlertDescription>
		</Alert>
		: null
	)
}
