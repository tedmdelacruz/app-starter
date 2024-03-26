# App Starter Kit

A minimal app starter kit powered by:
- [Django Ninja](https://django-ninja.dev/)
- [React + Vite](https://vitejs.dev/)
- [and ChakraUI](https://chakra-ui.com/)

## Running the backend API

```sh
cd backend
pip install -r requirements.txt
./manage.py runserver 8000 # Run the dev server
./manage.py test -v3 # Run the tests
```

## Running the frontend app

```sh
cd frontend
cp .env.example .env # Adjust env values accordingly
npm install
npm run dev # Run the dev server
```
