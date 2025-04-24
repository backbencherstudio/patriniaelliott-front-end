
export default function FrontEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <div>{children}</div>
        </div>
    );
}
