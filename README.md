# Frontend Leetcode

Visit the production site here: [Frontend Racers](https://frontend-leetcode.vercel.app/)

### About Frontend Racers: 
Users can attempt a suite of frontend leetcode-styled questions where they are given an expected output. Our <a href="https://github.com/Qingyu255/frontendCodeValidationService">frontend-code-validation-service</a> will then process user submitted code and return the validation outcome. Users can track their progress under _Submissions_

### To Clone Repo: 
```
git clone https://github.com/onebignick/FrontendLeetcode.git
```
### To run next app in localhost:
```
npm i
npm run dev
```
### Set Database environment variables in .env.local
```
.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
POSTGRES_DATABASE=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_PRISMA_URL=
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_URL_NO_SSL=
POSTGRES_USER=

# Code Validation Service Endpoint:
NEXT_PUBLIC_FRONTEND_CODE_VALIDATION_SERVICE_API_ENDPOINT=https://frontendcodevalidationservice-cyz3lynf7q-uc.a.run.app/
```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.