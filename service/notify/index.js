const { query } = require('../../utils/async-db')
/**
 * 驗證信 付款失敗 通知信
 * @returns {Promise<void>}
 */
module.exports = async (options) => {

    let result = {
        status: true
    }

    let order_id = options.order_id;
    let member_id = options.member_id;
    let fund_id = options.fund_id;

    //抓取 會員 基金相關資訊

    let sSql = `
        SELECT
            *
        FROM 
            order o
        JOIN 
            member m on o.member_id = m.member_id
        WHERE 
            order_id = ? AND member_id = ? AND fund_id = ?
    `

    let sResult = await query(sSql, [order_id, member_id, fund_id]);
    let row = sResult[0];

    let iSql = `
        INSERT INTO (member_id, fund_id, e_mail, schedule_send_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP());
    `

    let iResult = await query(iSql, [member_id, fund_id, row.e_mail])
    let record_id = iResult.insertId;

    //組成信件寄出

    //成功寄出需回呀 record 狀態

    let uSql = `
        UPDATE 
            record
        SET
            is_send = true
        WHERE
            record_id = ?
    `
    await query(uSql, [record_id]);

    return result
}