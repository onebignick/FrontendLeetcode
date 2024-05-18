import "../globals.css";

export default function ProblemsLayout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <section>
            {children}
        </section>
    );
}