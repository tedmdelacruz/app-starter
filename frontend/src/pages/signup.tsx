import {
	Heading,
	Card,
	CardBody,
	Box,
	Container,
	Stack,
	FormControl,
	FormLabel,
	Divider,
	Input,
	Button,
} from "@chakra-ui/react"
import { APP_NAME } from "@constants/config"
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import React, { useState } from "react"
import { signup } from "@/api"
import Error from "@components/Error"
import Success from "@components/Success"
import { useNavigate } from "react-router-dom"

function Signup() {
	const navigate = useNavigate()
	const initFormData = {
		username: "",
		password: "",
		confirmPassword: "",
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

	async function handleSubmit() {
		const response = await signup(formData)

		if (!response.ok) {
			const errorData = await response.json()
			setError(errorData["detail"])
			return
		}
		setSuccess("Registration successful! Redirecting to login page...")
		navigate("/")
	}

	return (
		<Container maxW="2xl" centerContent>
			<Box padding="6">
				<Heading>{APP_NAME}</Heading>
			</Box>
			<Card maxW="md">
				<CardBody>
					<form onSubmit={handleSubmit}>
						<Stack spacing="6">
							<Stack spacing="6">
								<Success message={success} />
								<Error message={error} />
								<FormControl>
									<FormLabel>Username</FormLabel>
									<Input
										name="username"
										type="text"
										value={formData.username}
										onChange={handleInputChange}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Password</FormLabel>
									<Input
										name="password"
										type="password"
										value={formData.password}
										onChange={handleInputChange}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Confirm Password</FormLabel>
									<Input
										name="confirmPassword"
										type="password"
										value={formData.confirmPassword}
										onChange={handleInputChange}
									/>
								</FormControl>
							</Stack>
							<Stack spacing="6">
								<Button colorScheme="teal" onClick={handleSubmit}>Sign Up</Button>
							</Stack>
							<Divider />
							<Stack spacing="6">
								<ChakraLink as={ReactRouterLink} to='/'>
									Already have an account? Login
								</ChakraLink>
							</Stack>
						</Stack>
					</form>
				</CardBody>
			</Card>
		</Container>
	)
}

export default Signup 
