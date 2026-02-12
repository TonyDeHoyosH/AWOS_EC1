import { getTopProducts } from '../../../services/reports';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 5;

export default async function TopProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; page?: string }>;
}) {
    const { q, page } = await searchParams;
    const currentPage = parseInt(page || '1');
    const { rows, totalItems } = await getTopProducts(q, currentPage);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Productos Estrella</h1>
                    <p className="text-slate-500 text-sm mt-1">Clasificados por Ingresos</p>
                </div>

                <form className="relative">
                    <input
                        type="text"
                        name="q"
                        defaultValue={q}
                        placeholder="Buscar..."
                        className="pl-3 pr-10 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 w-64"
                    />
                </form>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm mb-6">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-medium w-16">#</th>
                            <th className="px-6 py-3 font-medium">Producto</th>
                            <th className="px-6 py-3 font-medium">Categoría</th>
                            <th className="px-6 py-3 font-medium text-right">Unidades</th>
                            <th className="px-6 py-3 font-medium text-right">Ingresos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.map((row) => (
                            <tr key={row.product_id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-400">{row.rank_by_revenue}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{row.product_name}</td>
                                <td className="px-6 py-4 text-slate-600">{row.category_name}</td>
                                <td className="px-6 py-4 text-right text-slate-600">{row.total_units_sold}</td>
                                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                    ${Number(row.total_revenue).toFixed(2)}
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
                        href={`/reports/top-products?page=${Math.max(1, currentPage - 1)}${q ? `&q=${q}` : ''}`}
                        className={`px-3 py-1.5 text-sm rounded border border-slate-200 text-slate-600 ${currentPage <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50'}`}
                    >
                        Anterior
                    </Link>
                    <Link
                        href={`/reports/top-products?page=${Math.min(totalPages, currentPage + 1)}${q ? `&q=${q}` : ''}`}
                        className={`px-3 py-1.5 text-sm rounded border border-slate-200 text-slate-600 ${currentPage >= totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50'}`}
                    >
                        Siguiente
                    </Link>
                </div>
            </div>
        </div>
    );
}
