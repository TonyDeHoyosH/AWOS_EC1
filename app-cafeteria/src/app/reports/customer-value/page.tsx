import { getCustomerValue } from '../../../services/reports';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 5;

export default async function CustomerValuePage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = parseInt(page || '1');
    const { rows, totalItems } = await getCustomerValue(currentPage);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Valor del Cliente</h1>
                <p className="text-slate-500 text-sm mt-1">Clientes Frecuentes y de Alto Valor</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm mb-6">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-medium">Cliente</th>
                            <th className="px-6 py-3 font-medium">Email</th>
                            <th className="px-6 py-3 font-medium text-center">Segmento</th>
                            <th className="px-6 py-3 font-medium text-right">Pedidos</th>
                            <th className="px-6 py-3 font-medium text-right">Total Gastado</th>
                            <th className="px-6 py-3 font-medium text-right">Ticket Promedio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.map((row) => (
                            <tr key={row.customer_id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{row.customer_name}</td>
                                <td className="px-6 py-4 text-slate-500">{row.email}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.customer_segment === 'VIP' ? 'bg-slate-900 text-white' :
                                        row.customer_segment === 'Regular' ? 'bg-slate-100 text-slate-800' :
                                            'bg-white border border-slate-200 text-slate-600'
                                        }`}>
                                        {row.customer_segment}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-slate-600">{row.orders_count}</td>
                                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                    ${Number(row.total_spent).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right text-slate-500">
                                    ${Number(row.avg_ticket_value).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-sm text-slate-500">Página {currentPage} de {Math.max(1, totalPages)}</span>
                <div className="flex gap-2">
                    <Link
                        href={`/reports/customer-value?page=${Math.max(1, currentPage - 1)}`}
                        className={`px-3 py-1.5 text-sm rounded border border-slate-200 text-slate-600 ${currentPage <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50'}`}
                    >
                        Anterior
                    </Link>
                    <Link
                        href={`/reports/customer-value?page=${Math.min(totalPages, currentPage + 1)}`}
                        className={`px-3 py-1.5 text-sm rounded border border-slate-200 text-slate-600 ${currentPage >= totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50'}`}
                    >
                        Siguiente
                    </Link>
                </div>
            </div>
        </div>
    );
}
