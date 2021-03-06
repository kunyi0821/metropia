CREATE TABLE `record` (
    record_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "紀錄編號",
    member_id int(11) NOT NULL COMMENT "會員編號 ref.member.member_id",
    fund_id int(11) NOT NULL COMMENT "基金編號 ref.fund.fund_id",

    is_send int(1) DEFAULT 0 COMMENT "是否已經寄送",

    e_mail varchar(100) NOT NULL COMMENT "信箱",
    schedule_send_at datetime NOT NULL COMMENT "預計發送時間"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間"
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4