CREATE TABLE `fund_history` (
    fund_history_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "基金歷史編號",
    fund_id int(11) NOT NULL COMMENT "基金編號 ref.fund.fund_id",
    net_assets_value int(25) NOT NULL COMMENT "資產淨值",

    charge_currency VARCHAR(25) NOT NULL COMMENT "交易貨幣",
    value int(11) NOT NULL COMMENT "基金價格",
    trade_fee float(11) NOT NULL COMMENT "手續費 (%)",

    created_id int(11) NOT NULL COMMENT "創建人編號",
    created_name varchar(25) NOT NULL COMMENT "創建人名稱",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間"
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4