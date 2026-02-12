import { getSales } from '../../../services/reports';

export const dynamic = 'force-dynamic';

export default async function DailySalesPage({
    searchParams,
}: {
    searchParams: Promise<{ from?: string; to?: string }>;
}) {
    const { from, to } = await searchParams;
    const sales = await getSales(from, to);

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Ventas Diarias</h1>
                    <p className="text-slate-500 text-sm mt-1">Resumen de Rendimiento</p>
                </div>

                <form className="flex gap-3 items-center bg-white p-2 rounded-md border border-slate-200 shadow-sm">
                    <input
                        type="date"
                        name="from"
                        defaultValue={from}
                        className="bg-transparent border-none text-sm text-slate-700 focus:ring-0"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                        type="date"
                        name="to"
                        defaultValue={to}
                        className="bg-transparent border-none text-sm text-slate-700 focus:ring-0"
                    />
                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                    >
                        Filtrar
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-medium">Fecha</th>
                            <th className="px-6 py-3 font-medium text-right">Tickets</th>
                            <th className="px-6 py-3 font-medium text-right">Ingresos</th>
                            <th className="px-6 py-3 font-medium text-right">Ticket Promedio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sales.map((row) => (
                            <tr key={row.sale_date.toString()} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-slate-900 font-medium">
                                    {new Date(row.sale_date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right text-slate-600">{row.total_tickets}</td>
                                <td className="px-6 py-4 text-right text-slate-900 font-semibold">
                                    ${Number(row.total_revenue).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right text-slate-500">
                                    ${Number(row.average_ticket).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
