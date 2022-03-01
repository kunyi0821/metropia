CREATE TABLE `account` (
    account_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "帳戶編號編號",
    member_id int(11) NOT NULL COMMENT "會員編號 ref.member.member_id",
    account_name varchar(100) NOT NULL COMMENT "帳戶名稱 加密",
    account varchar(100) NOT NULL COMMENT "銀行帳戶",
    password varchar(100) NOT NULL COMMENT "銀行密碼 加密",
    is_authorize int(1) DEFAULT 0 COMMENT "是否驗證 0 = 未驗證不可進行交易, 1 = 已驗證成功可以進行交易",
    updated_at datetime DEFAULT NULL COMMENT "修改時間",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間",
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4