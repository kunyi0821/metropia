const { query } = require('../../../../utils/async-db')

/**
 * 新增帳戶
 *
 */
exports.post = async function (ctx) {

    let result = {
        status: true,
        data: {}
    }

    const { account_id, member_id, account_name, account, password, is_authorize } = ctx.request.body;



    try {

        if (!member_id) throw Error(`會員編號必須填寫`);
        if (!account_name) throw Error(`帳戶名稱必須填寫`);
        if (!account) throw Error(`帳戶必須填寫`);
        if (!password) throw Error(`密碼必須填寫`);
        if (!(is_authorize || !is_authorize)) throw Error(`是否驗證成功必須填寫`); //是否驗證需進行其他邏輯

        let secureFilter = [`member_id = ${member_id}`, `account = ${account}`];
        if (account_id !== 0) secureFilter.push(`account_id <> ${account_id}`)
        let secureSql = `
            SELECT 
                account_id 
            FROM 
                account
            WHERE 
                ${secureFilter.join(" AND ")}
        `

        let secureResult = await query(secureSql);
        if (secureResult.length > 0) throw Error(`此帳戶已使用過`);

        if (account_id === 0) {
            //新增
            let iSql = `
            INSERT INTO account (member_id, account_name, account, password, is_authorize)
            VALUES (?, ?, ?, ?, ?) 
        `

            let iResult = await query(iSql, [member_id, account_name, account, password, is_authorize]);

            if (iResult.affectedRows === 0) throw Error(`帳戶匯入失敗`);

            result.data.account_id = iResult.insertId;

        } else {
            //編輯
            let uSql = `
                UPDATE 
                    account 
                SET 
                    account_name = ?, 
                    account = ?, 
                    password = ?,
                    is_authorize = ?,
                    updated_at = CURRENT_TIMESTAMP()
                WHERE 
                    member_id = ? AND account_id = ?
            `

            let uResult = await query(uSql, [account_name, account, password, is_authorize, member_id, account_id]);
            if (uResult.affectedRows === 0) {
                throw Error(`編輯失敗`);
            } else {
                result.data.account_id = account_id;
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