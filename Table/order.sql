CREATE TABLE `order` (
    order_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "訂單編號",
    member_id int(11) NOT NULL COMMENT "會員編號 ref.member.member_id",
    fund_id int(11) NOT NULL COMMENT "基金編號 ref.fund.fund_id",
    account_id int(11) NOT NULL COMMENT "會員帳戶編號 ref.account.account_id",

    status varchar(10) NOT NULL COMMENT "訂單狀態 DONE=成功 FAIL=失敗",

    net_assets_value int(25) NOT NULL COMMENT "資產淨值",
    quantity int(11) NOT NULL COMMENT "購買數量",

    trade_fee float(11) NOT NULL COMMENT "手續費 (%)",

    total int(11) NOT NULL COMMENT "此訂單共花多少 基金價格 + 手續費",

    updated_at datetime DEFAULT NULL COMMENT "修改時間",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間",
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4