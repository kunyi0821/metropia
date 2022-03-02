const { query } = require('../../../utils/async-db')

/**
 * 取得基金 歷史牌價 列表
 *
 * @param req
 * @returns {Promise<void>}
 */
exports.get = async function (ctx){

    let result = {
        status: true,
        data: {}
    }

    let sql = `
        SELECT 
            f.fund_id, 
            f.name, 
            CONCAT('[',
                GROUP_CONCAT(
                    JSON_OBJECT(
                        "fund_history_id", fh.fund_history_id,
                        "net_assets_value", fh.net_assets_value,
                        "trade_fee", fh.trade_fee, 
                        "value", fh.value,
                        "charge_currency", fh.charge_currency 
                    )
                ORDER BY fh.created_at DESC), ']' 
            )  as history_list
        FROM fund f
        LEFT JOIN fund_history fh on fh.fund_id = f.fund_id 
        GROUP BY f.fund_id 
    `;

    let sResult = await query(sql);

    if (sResult.length > 0) {
        for (const row of sResult) {
            row.history_list = JSON.parse(row.history_list);

            if (row.history_list[0].value === null) row.history_list = [];

        }
    }

    if (sResult.length > 0) {
        result.data = sResult;
    }

    ctx.body = result;
}
