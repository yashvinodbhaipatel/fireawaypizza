import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <main className="flex items-center justify-center">
                <SignIn />
            </main>
        </div>
    );
}
