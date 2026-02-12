import { getInventoryRisk, getCategories } from '../../../services/reports';
import CategoryFilter from './CategoryFilter';

export const dynamic = 'force-dynamic';

export default async function InventoryRiskPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const risks = await getInventoryRisk(category);
    const categories = await getCategories();

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Riesgo de Inventario</h1>
                    <p className="text-slate-500 text-sm mt-1">Análisis de Niveles de Stock</p>
                </div>

                <CategoryFilter categories={categories} selectedCategory={category} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {risks.map((item) => (
                    <div key={item.product_id} className="group bg-white p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category_name}</span>
                                <h3 className="text-lg font-semibold text-slate-900">{item.product_name}</h3>
                            </div>
                            <div className={`h-2 w-2 rounded-full ${item.stock_level === 'Critical' || item.stock_level === 'Out of Stock' ? 'bg-slate-900' :
                                item.stock_level === 'Warning' ? 'bg-slate-400' : 'bg-blue-200'
                                }`} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-50">
                            <div>
                                <p className="text-xs text-slate-500">Nivel de Stock</p>
                                <p className={`text-xl font-medium ${item.stock === 0 ? 'text-red-600' : 'text-slate-900'}`}>
                                    {item.stock}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 text-right">Puntaje de Riesgo</p>
                                <p className="text-xl font-medium text-slate-900 text-right">{item.risk_score}%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
