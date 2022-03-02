CREATE TABLE IF NOT EXISTS  fund (
    fund_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "基金編號",
    name varchar(50) NOT NULL COMMENT "基金名稱",
    net_assets_value int(25) NOT NULL COMMENT "資產淨值",
    type varchar(5) NOT NULL COMMENT "基金類型 ",
    prospectus text COMMENT "招股說明書",
    charge_currency VARCHAR(25) NOT NULL COMMENT "交易貨幣",
    trade_fee float(11) NOT NULL COMMENT "手續費 (%)",
    updated_id int(11) NOT NULL COMMENT "更改人編號",
    updated_name varchar(25) NOT NULL COMMENT "更改人名稱",
    updated_at TIMESTAMP  COMMENT "更改時間",
    created_id int(11) NOT NULL COMMENT "創建人編號",
    created_name varchar(25) NOT NULL COMMENT "創建人名稱",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間"
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4