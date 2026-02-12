import { getPaymentMix } from '../../../services/reports';

export const dynamic = 'force-dynamic';

export default async function PaymentMixPage() {
    const mix = await getPaymentMix();

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Mezcla de Pagos</h1>
                <p className="text-slate-500 text-sm mt-1">Análisis de Métodos de Pago</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Método de Pago</th>
                                <th className="px-6 py-3 font-medium text-right">Transacciones</th>
                                <th className="px-6 py-3 font-medium text-right">Total</th>
                                <th className="px-6 py-3 font-medium text-right">% Ingresos</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mix.map((row) => (
                                <tr key={row.method} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 capitalize">{row.method.replace('_', ' ')}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">{row.transaction_count}</td>
                                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                        ${Number(row.total_amount).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-500">
                                        {Number(row.revenue_share_percentage).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg font-medium mb-2 opacity-90">Método Dominante</h3>
                    <p className="text-4xl font-bold mb-1 capitalize">
                        {mix[0]?.method.replace('_', ' ') || 'N/A'}
                    </p>
                    <p className="text-sm opacity-60">
                        Genera el {mix[0]?.revenue_share_percentage || 0}% de los ingresos totales
                    </p>
                </div>
            </div>
        </div>
    );
}
