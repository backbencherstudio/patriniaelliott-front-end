import Navbar from "./_components/Navbar";


export default function FrontEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    );
}
