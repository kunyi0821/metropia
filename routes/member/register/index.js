const { query } = require('../../../utils/async-db')


/**
 * 會員註冊
 *
 * @param ctx
 * @returns {Promise<void>}
 */
exports.post = async function (ctx) {

    let result = {
        status: true,
        data: {}
    }

    const { member_id, name, account, password, e_mail } = ctx.request.body;

    try {

        if (!name) throw Error(`會員名稱必須填寫`);
        if (!account) throw Error(`帳號必須填寫`);
        if (!password) throw Error(`密碼必須填寫`);
        if (!e_mail) throw Error(`電子信箱必須填寫`);


        let secureFilter = [`account = ${account}`];
        if (member_id !== 0) secureFilter.push(`member_id <> ${member_id}`)
        let secureSql = `
            SELECT 
                member_id 
            FROM 
                member
            WHERE 
                ${secureFilter.join(" AND ")}
        `

        let secureResult = await query(secureSql);
        if (secureResult.length > 0) throw Error(`此帳號已有人註冊`);

        if (member_id === 0) {
            //新增
            let iSql = `
                INSERT INTO member (name, account, password, e_mail, updated_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())
            `

            let iResult = await query(iSql, [name, account, password, e_mail]);

            if (iResult.affectedRows === 0) {
                throw Error(`匯入失敗`);
            } else {
                result.data.member_id = iResult.insertId;
            }


        } else {
            //編輯
            let uSql = `
                UPDATE 
                    member
                SET 
                    name = ?, 
                    account = ?, 
                    password = ?,
                    e_mail = ?,
                    updated_at = CURRENT_TIMESTAMP()
                WHERE 
                    member_id = ?
            `

            let uResult = await query(uSql, [name, account, password, e_mail, member_id]);
            if (uResult.affectedRows === 0) {
                throw Error(`編輯失敗`);
            } else {
                result.data.member_id = member_id;
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