const { query } = require('../../utils/async-db')
const notifyLetter = require("../../service/notify/index");

/**
 * 下單
 *
 * @param req
 * @returns {Promise<void>}
 */
exports.get = async function (ctx){

    let result = {
        status: true,
        data: {}
    }

    const { member_id, fund_id, account_id, net_assets_value, quantity, trade_fee } = ctx.request.body;

    try {

        if (!member_id) throw Error(`會員編號必須填寫`);
        if (!fund_id) throw Error(`基金編號必須填寫`);
        if (!account_id) throw Error(`帳戶編號必須填寫`);
        if (!net_assets_value) throw Error(`資產淨值必須填寫`);
        if (!quantity) throw Error(`數量必須填寫`);
        if (!trade_fee) throw Error(`手續費必須填寫`);

        let total = (net_assets_value * quantity) + (net_assets_value * quantity * trade_fee);

        let status = "DONE";

        //region 這段需直接串接銀行 確認是否有餘額 開發環境直接成立訂單
        let uSql = `
            UPDATE 
                account
            SET 
                balance = balance - ?
                updated_at = CURRENT_TIMESTAMP()
            WHERE
                member_id = ? AND account_id = ? AND balance - ? > 0
        `
        //endregion

        let iSql = `
            INSERT INTO order (member_id, fund_id, account_id, status, net_assets_value, quantity, trade_fee, total) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `
        let iResult = await query(iSql, [member_id, fund_id, account_id, status, net_assets_value, quantity, trade_fee, total]);
        let order_id = iResult.insertId;

        if (status !== "DONE") {
            //訂單不成功 呼叫通知信

            let options = {
                order_id, member_id, fund_id
            }

            //呼叫寄送通知信
            await notifyLetter(options);

            throw Error(`訂單成立失敗`)

        }
    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        ctx.body = result;
    }
}
