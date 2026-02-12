import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  const reports = [
    {
      title: 'Ventas Diarias',
      description: 'Tendencias de ingresos y tickets promedio',
      href: '/reports/daily-sales',
    },
    {
      title: 'Productos Estrella',
      description: 'Ranking por unidades e ingresos',
      href: '/reports/top-products',
    },
    {
      title: 'Riesgo de Inventario',
      description: 'Monitoreo de stock bajo',
      href: '/reports/inventory',
    },
    {
      title: 'Valor del Cliente',
      description: 'Segmentos de clientes de alto valor',
      href: '/reports/customer-value',
    },
    {
      title: 'Mezcla de Pagos',
      description: 'Análisis de métodos de pago',
      href: '/reports/payment-mix',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <header className="mb-12 max-w-5xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
          Inteligencia de <span className="text-blue-600">Cafetería</span>
        </h1>
        <p className="text-lg text-slate-500 font-light">Insights operativos y analítica</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reports.map((report) => (
          <Link
            key={report.href}
            href={report.href}
            className="group block p-8 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
              {report.title}
            </h2>
            <p className="text-slate-500 text-sm">{report.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
