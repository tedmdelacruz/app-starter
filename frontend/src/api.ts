const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function signup(data: SignUpForm) {
	return await fetch(
		`${BASE_URL}/signup`,
		{
			method: "post",
			body: JSON.stringify(data)
		}
	)
}

export async function login(data: LoginForm) {
	return await fetch(
		`${BASE_URL}/token/pair`,
		{
			method: "post",
			body: JSON.stringify(data)
		}
	)
}

function getAccessToken() {
	return localStorage.getItem("access_token")
}

export async function getUser() {
	const accessToken = getAccessToken()
	if (!accessToken) {
		return Promise.reject("Failed to fetch access token")
	}
	return await fetch(
		`${BASE_URL}/me`,
		{
			method: "get",
			headers: {
				"Authorization": `Bearer ${accessToken}`
			}
		}
	)
	
}
