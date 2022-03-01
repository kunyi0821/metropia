const { query } = require('../../../utils/async-db')

/**
 * 帳戶 列表
 *
 * PS: 此處應該是使用 get /member/account/:member_id
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
                a.account_name,
                a.account,
                a.password,
                a.is_authorize
            FROM    
                member m
            LEFT JOIN
                account a on m.member_id = a.member_id
            WHERE 
                m.member_id = ?
        `

        let sResult = await query(sSql, [member_id]);

        if (sResult.length > 0) {
            for (const row of sResult) {
                row.is_authorize = Boolean(row.is_authorize);
            }
        }

        result.data = sResult;


    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        ctx.body = result;
    }
}