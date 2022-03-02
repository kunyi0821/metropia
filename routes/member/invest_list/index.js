const { query } = require('../../../utils/async-db')

/**
 * 會員丁單 列表
 *
 * PS: 此處應該是使用 get /member/invert_list/:member_id
 */
exports.post = async function (ctx) {

    let result = {
        status: true,
        data: {}
    }

    const { member_id } = ctx.request.body;

    try {

        if (!member_id) throw Error(`會員編號必須填寫`)

        let sSql = `
            SELECT 
                o.order_id,
                f.name,
                o.status,
                o.net_assets_value,
                o.quantity,
                o.trade_fee,
                o.total 
            FROM  
                \`order\` o
            LEFT JOIN 
                fund f on o.fund_id = f.fund_id 
            WHERE 
                o.member_id = ?
            ORDER BY 
                o.created_at DESC
        `

        let sResult = await query(sSql, [member_id]);


        result.data = sResult;


    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        ctx.body = result;
    }
}