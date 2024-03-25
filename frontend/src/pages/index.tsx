import {
	Box,
	Divider,
	Heading,
} from "@chakra-ui/react"
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"
import Error from "@/components/Error"
import { APP_NAME } from "@constants/config"
import { useEffect, useState } from "react"
import { getUser } from "@/api"

function Index() {
	const initUser = {
		username: "",
	}
	const [ isLoggedIn, setIsLoggedIn ] = useState(false)
	const [ error, setError ] = useState("")
	const [ user, setUser ] = useState(initUser)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await getUser()
				if (!response.ok) {
					debugger
					setError("Please login first.")
					setIsLoggedIn(false)
					return
				}
				setIsLoggedIn(true)
				const data = await response.json()
				setUser(data)
			} catch (error) {
				console.error(error)
				setIsLoggedIn(false)
			}
		}
		fetchUser()
	}, [])

	return (
		<Box>
			<Box padding="6">
				<Heading>{APP_NAME}</Heading>
			</Box>
			<Divider />
			<Box padding="6">
				<Error message={error} />
				{ isLoggedIn ? <Dashboard user={user}/> : <Login /> }
			</Box>
		</Box>
	)
}

export default Index
