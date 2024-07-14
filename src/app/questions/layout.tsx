import "../globals.css";

export default function ProblemsLayout({children}: Readonly<{children: React.ReactNode}>) {
    return(
        <section className="px-5 md:px-10 py-5">
            {children}
        </section>
    );
}