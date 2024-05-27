// pages/testEnv.js

const TestEnv = () => {
    return (
      <div>
        <p>CLERK_SECRET_KEY: {process.env.CLERK_SECRET_KEY}</p>
        <p>NEXT_PUBLIC_BACKEND_API_URL: {process.env.NEXT_PUBLIC_BACKEND_API_URL}</p>
      </div>
    );
  };
  
  export default TestEnv;
  