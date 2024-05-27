import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '97vh', backgroundColor: 'white' }}>
        <main className="flex items-center justify-center">
            <SignUp path="/sign-up" />
        </main>
    </div>
    )
        ;
}