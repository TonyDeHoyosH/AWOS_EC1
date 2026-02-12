import { query } from '../lib/db';

export const dynamic = 'force-dynamic';

export async function getSales(from?: string, to?: string) {
    let sql = 'SELECT * FROM vw_sales_daily';
    const params: any[] = [];
    const filters: string[] = [];

    if (from) {
        filters.push(`sale_date >= $${params.length + 1}`);
        params.push(from);
    }
    if (to) {
        filters.push(`sale_date <= $${params.length + 1}`);
        params.push(to);
    }

    if (filters.length > 0) {
        sql += ' WHERE ' + filters.join(' AND ');
    }

    sql += ' ORDER BY sale_date DESC';

    const res = await query(sql, params);
    return res.rows;
}

export async function getTopProducts(search?: string, page: number = 1) {
    const ITEMS_PER_PAGE = 5;
    const offset = (page - 1) * ITEMS_PER_PAGE;
    let sql = 'SELECT * FROM vw_top_products_ranked';
    const params: any[] = [];
    const filters: string[] = [];

    if (search) {
        filters.push(`product_name ILIKE $${params.length + 1}`);
        params.push(`%${search}%`);
    }

    if (filters.length > 0) {
        sql += ' WHERE ' + filters.join(' AND ');
    }

    // Count total for pagination
    const countRes = await query(`SELECT COUNT(*) FROM (${sql}) as sub`, params);
    const totalItems = parseInt(countRes.rows[0].count);

    sql += ` ORDER BY rank_by_revenue ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(ITEMS_PER_PAGE, offset);

    const res = await query(sql, params);
    return { rows: res.rows, totalItems };
}

export async function getInventoryRisk(category?: string) {
    let sql = 'SELECT * FROM vw_inventory_risk';
    const params: any[] = [];
    const filters: string[] = [];

    if (category) {
        filters.push(`category_name = $${params.length + 1}`);
        params.push(category);
    }

    if (filters.length > 0) {
        sql += ' WHERE ' + filters.join(' AND ');
    }

    sql += ' ORDER BY risk_score DESC';

    const res = await query(sql, params);
    return res.rows;
}

export async function getCategories() {
    const res = await query('SELECT DISTINCT category_name FROM vw_inventory_risk ORDER BY category_name');
    return res.rows;
}

export async function getCustomerValue(page: number = 1) {
    const ITEMS_PER_PAGE = 5;
    const offset = (page - 1) * ITEMS_PER_PAGE;
    // Count total
    const countRes = await query('SELECT COUNT(*) FROM vw_customer_value');
    const totalItems = parseInt(countRes.rows[0].count);

    const res = await query(
        'SELECT * FROM vw_customer_value ORDER BY total_spent DESC LIMIT $1 OFFSET $2',
        [ITEMS_PER_PAGE, offset]
    );
    return { rows: res.rows, totalItems };
}

export async function getPaymentMix() {
    const res = await query('SELECT * FROM vw_payment_mix ORDER BY total_amount DESC');
    return res.rows;
}
