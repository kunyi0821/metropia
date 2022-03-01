const { query } = require('../../utils/async-db')

/**
 * 取得基金列表
 *
 * @param req
 * @returns {Promise<void>}
 */
exports.get = async function (req){

    let result = {
        status: true,
        data: {}
    }

    let sql = `SELECT * FROM fund`;

    let sResult = await query(sql);

    if (sResult.length > 0) {
        result.data = sResult;
    }

    req.body = result;
}


/**
 * 新增編輯 基金資料
 *
 * 需使用 Transaction query, commit, rollback and release
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

        //匯入基金歷史表單中
        let _fundId = fund_id;
        if (fund_id === 0) {
            _fundId = result.data.fund_id;
        }

        let iHistorySql = `
            INSERT INTO fund_history (fund_id, net_assets_value, charge_currency, value, trade_fee, created_id, created_name)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        let iHistoryResult = await query(iHistorySql, [_fundId, net_assets_value, charge_currency, value, trade_fee, user_id, user_name])
        if (iHistoryResult.affectedRows === 0) throw Error(`匯入基金歷史表失敗`)
    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        ctx.body = result;
    }
}