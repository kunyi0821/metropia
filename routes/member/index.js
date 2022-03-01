/**
 * 會員登入 基金資料
 *
 * @param ctx
 * @returns {Promise<void>}
 */
exports.post = async function (ctx) {

    let result = {
        status: true,
        data: {}
    }

    const { fund_id, name, net_assets_value, type, prospectus, value, trade_fee, charge_currency, user_id, user_name } = ctx.request.body;

    try {

        if (!name) throw Error(`基金名稱必須填寫`);
        if (!net_assets_value) throw Error(`資產淨值必須填寫`);
        if (!type) throw Error(`基金類型必須填寫`);
        if (!prospectus) throw Error(`招股說明書必須填寫`);

        if (!value) throw Error(`基金價格必須填寫`);
        if (!trade_fee) throw Error(`手續費必須填寫`);

        //交易貨幣需要有資料維護
        if (!charge_currency) throw Error(`交易貨幣必須填寫`);

        if (fund_id === 0) {
            //新增
            let iSql = `
                INSERT INTO fund (name, net_assets_value, type, prospectus, charge_currency, value, trade_fee, created_id, created_name, updated_id, updated_name, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())
            `

            let iResult = await query(iSql, [name, net_assets_value, type, prospectus, charge_currency, value, trade_fee, user_id, user_name, user_id, user_name]);

            if (iResult.affectedRows === 0) {
                throw Error(`匯入失敗`);
            } else {
                result.data.fund_id = iResult.insertId;
            }


        } else {
            //編輯
            let uSql = `
                UPDATE 
                    fund
                SET 
                    name = ?, 
                    net_assets_value = ?, 
                    type = ?, 
                    prospectus = ?, 
                    charge_currency = ?, 
                    value = ?, 
                    trade_fee = ?, 
                    updated_id = ?, 
                    updated_name = ?, 
                    updated_at = CURRENT_TIMESTAMP()
                WHERE 
                    fund_id = ?
            `

            let uResult = await query(uSql, [name, net_assets_value, type, prospectus, charge_currency, value, trade_fee, user_id, user_name, fund_id]);
            if (uResult.affectedRows === 0) {
                throw Error(`編輯失敗`);
            } else {
                result.data.fund_id = fund_id;
            }

        }
    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        ctx.body = result;
    }
}