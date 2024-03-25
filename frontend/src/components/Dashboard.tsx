import { Box, VStack, Button } from "@chakra-ui/react"
import React from "react"


type DashboardProps = {
	user: User
}

function handleLogout() {
	localStorage.removeItem("access_token")
	window.location.href = "/"
}

export default function Dashboard(props: DashboardProps) {
	return (
		<Box>
			<VStack
				spacing={4}
				align="stretch"
			>
				<Box h="100px">
					<h1>Hello, {props.user.username}</h1>
				</Box>
				<Box h="40px"><Button onClick={handleLogout}>Logout</Button></Box>
			</VStack>
		</Box>
	)
}
