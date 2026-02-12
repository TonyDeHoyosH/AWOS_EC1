'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories, selectedCategory }: {
    categories: { category_name: string }[],
    selectedCategory?: string
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleChange(term: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set('category', term);
        } else {
            params.delete('category');
        }
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="bg-white p-1 rounded-md border border-slate-200">
            <select
                name="category"
                defaultValue={selectedCategory}
                className="bg-transparent border-none text-sm text-slate-700 focus:ring-0 pr-8 cursor-pointer"
                onChange={(e) => handleChange(e.target.value)}
            >
                <option value="">Todas las Categorías</option>
                {categories.map((c) => (
                    <option key={c.category_name} value={c.category_name}>{c.category_name}</option>
                ))}
            </select>
        </div>
    );
}
