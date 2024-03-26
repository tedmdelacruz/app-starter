import {
	Container,
	Card,
	CardBody,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Button,
} from "@chakra-ui/react"
import Success from "@/components/Success"
import Error from "@/components/Error"
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import React, { useState } from "react"
import { login } from "@/api"

function Login() {
	const initFormData = {
		username: "",
		password: "",
	}
	const [ formData, setFormData ] = useState(initFormData)
	const [ error, setError ] = useState("")
	const [ success, setSuccess ] = useState("")

	function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;

		setError("")
		setFormData({
			...formData,
			[name]: value,
		})
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const response = await login(formData)

		if (!response.ok) {
			const errorData = await response.json()
			setError(errorData["detail"])
			return
		}

		const data = await response.json()
		localStorage.setItem("access_token", data.access)
		setSuccess("Successfully logged in! Redirecting...")
		window.location.href = "/"
	}

	return (
		<Container>
			<Card>
				<CardBody>
					<form onSubmit={handleSubmit}>
						<Stack spacing="8">
							<Stack spacing="6">
								<Success message={success} />
								<Error message={error} />
								<FormControl>
									<FormLabel>Username</FormLabel>
									<Input name="username" type="text" onChange={handleInputChange}/>
								</FormControl>
								<FormControl>
									<FormLabel>Password</FormLabel>
									<Input name="password" type="password" onChange={handleInputChange}/>
								</FormControl>
							</Stack>
							<Stack spacing="6">
								<Button type="submit" colorScheme="teal" onClick={handleSubmit}>Login</Button>
							</Stack>
							<Stack spacing="6">
								<ChakraLink as={ReactRouterLink} to='/signup'>
									Don't have an account? Sign up
								</ChakraLink>
							</Stack>
						</Stack>
				</form>
				</CardBody>
			</Card>
		</Container>
	)
}

export default Login