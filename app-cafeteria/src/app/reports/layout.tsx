import Link from 'next/link';

export default function ReportsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { name: 'Panel Principal', href: '/' },
        { name: 'Ventas Diarias', href: '/reports/daily-sales' },
        { name: 'Productos Estrella', href: '/reports/top-products' },
        { name: 'Inventario', href: '/reports/inventory' },
        { name: 'Valor del Cliente', href: '/reports/customer-value' },
        { name: 'Pagos', href: '/reports/payment-mix' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
                <div className="p-6">
                    <Link href="/" className="block">
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            Cafetería <span className="text-blue-400">Intel</span>
                        </h2>
                    </Link>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
