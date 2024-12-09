/*
Navicat MySQL Data Transfer

Source Server         : localhost_3300
Source Server Version : 80032
Source Host           : localhost:3300
Source Database       : clubmanagemant

Target Server Type    : MYSQL
Target Server Version : 80032
File Encoding         : 65001

Date: 2024-06-08 20:57:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clubId` int NOT NULL COMMENT '社团id',
  `time` datetime NOT NULL COMMENT '时间',
  `money` float(8,2) NOT NULL COMMENT '金额',
  `detail` varchar(255) NOT NULL COMMENT '描述',
  `balance` float(8,2) NOT NULL COMMENT '余额',
  `activityId` int NOT NULL COMMENT '活动id ',
  `type` tinyint(1) NOT NULL,
  `userId` int NOT NULL COMMENT '缴费用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of account
-- ----------------------------

-- ----------------------------
-- Table structure for `activity`
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL COMMENT '标题',
  `imgURL` varchar(255) NOT NULL COMMENT '展示图片',
  `clubId` int NOT NULL COMMENT '社团id',
  `type` tinyint(1) NOT NULL COMMENT '报名类型0不需审核1需要审核',
  `amount` float(10,2) NOT NULL COMMENT '缴费金额',
  `RTE` text NOT NULL COMMENT '富文本编辑器内容',
  `startTime` datetime NOT NULL COMMENT '开始时间',
  `endTime` datetime NOT NULL COMMENT '结束时间',
  `state` tinyint(1) NOT NULL COMMENT '审核状态0未审核1已审核2已拒绝3暂停活动',
  `num` int NOT NULL,
  PRIMARY KEY (`id`,`startTime`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', '大学生书法大赛', 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/shufa.png', '38', '1', '0.00', '悠悠五千年，中华民族是具有悠久的历史文化的民族。中国有着无人能及的灿烂的过去，也有着令人惊叹的辉煌的现代。从古至今，中国在各个领域都有群英荟萃，众采纷层。历史的车轮碾过，留下的是沉重的印记。08的夏季，北京奥运在画卷上肆意的演绎着中华民族五千年的精彩与美丽。而在这个冬季，我们东华理工将用书法大赛释放与涂描青春的绚丽多彩。书法是一种高层次、高品位的艺术。而艺术可以提高一个人的素质，陶冶一个人的情操，体现一个人的气质，固而有人说“字如其人”。铺开一张宣纸，勾勒出那一笔笔或浓或淡的水墨丹青，动作如高山流水倾泻而出。激情在笔与纸上凝聚；今日东华理工，浓缩着青春的声息，正把崭新的历史不断向前推移。', '2023-03-01 14:35:18', '2023-03-13 14:35:24', '1', '16');
INSERT INTO `activity` VALUES ('3', '摄影大师赛', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '28', '1', '0.00', '寻找摄影大师', '2023-01-13 14:38:38', '2023-02-13 14:38:43', '1', '4');
INSERT INTO `activity` VALUES ('4', '摄影大赛2.0', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '28', '1', '0.00', '寻找摄影大师', '2023-02-16 08:00:00', '2023-03-14 00:00:54', '1', '6');
INSERT INTO `activity` VALUES ('5', '诗歌朗诵', 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg', '4', '1', '0.00', '鉴赏诗词，品优秀文化', '2023-02-01 14:59:00', '2023-02-05 14:59:13', '1', '16');
INSERT INTO `activity` VALUES ('6', '百词大赛', 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/baicidasai.png', '3', '1', '0.00', '百词竞赛，秀出风采', '2023-07-01 16:01:54', '2023-07-20 16:02:01', '1', '24');
INSERT INTO `activity` VALUES ('10', '管理', 'https://cdn.acwing.com/media/user/profile/photo/189222_lg_e98d5f43bb.jpg', '32', '0', '10.00', '管理员', '2023-06-20 00:00:00', '2023-06-22 00:00:00', '0', '0');
INSERT INTO `activity` VALUES ('11', '123123', 'https://cdn.acwing.com/media/user/profile/photo/189222_lg_e98d5f43bb.jpg', '11', '0', '10.00', '管理员发布的活动', '2023-06-06 00:00:00', '2023-06-22 00:00:00', '0', '0');
INSERT INTO `activity` VALUES ('21', '篮球对抗赛', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-chuck-2834917.jpg', '18', '0', '10.00', '冠军会花落谁家', '2021-01-01 00:00:00', '2021-01-01 00:00:00', '0', '0');
INSERT INTO `activity` VALUES ('24', '', 'https://cdn.acwing.com/media/user/profile/photo/189222_lg_e98d5f43bb.jpg', '4', '0', '10.00', '不过分吧', '2021-01-01 00:00:00', '2021-01-01 00:00:00', '0', '0');

-- ----------------------------
-- Table structure for `activitymember`
-- ----------------------------
DROP TABLE IF EXISTS `activitymember`;
CREATE TABLE `activitymember` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activityId` int NOT NULL COMMENT '活动id',
  `userId` int NOT NULL COMMENT '成员id',
  `isClubMember` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1是本社团成员0不是',
  `state` tinyint(1) DEFAULT NULL COMMENT '审核状态0未审核1已同意2已拒绝',
  `payment` tinyint(1) DEFAULT '0' COMMENT '1已缴费0未缴费',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of activitymember
-- ----------------------------
INSERT INTO `activitymember` VALUES ('1', '2', '3', '1', '1', '1');
INSERT INTO `activitymember` VALUES ('2', '3', '2', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('3', '2', '1', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('4', '2', '1', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('5', '1', '4', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('6', '1', '5', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('7', '3', '6', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('8', '2', '8', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('9', '1', '7', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('10', '5', '9', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('11', '1', '26', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('12', '1', '26', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('13', '9', '1', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('14', '9', '1', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('15', '1', '1', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('16', '1', '1', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('17', '1', '29', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('19', '1', '49', '0', '0', '0');
INSERT INTO `activitymember` VALUES ('23', '11', '49', '0', '1', '0');
INSERT INTO `activitymember` VALUES ('27', '10', '49', '1', '1', '0');
INSERT INTO `activitymember` VALUES ('30', '5', '49', '1', '1', '0');

-- ----------------------------
-- Table structure for `characteristic`
-- ----------------------------
DROP TABLE IF EXISTS `characteristic`;
CREATE TABLE `characteristic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `characteristic` varchar(10) NOT NULL COMMENT '特征名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of characteristic
-- ----------------------------
INSERT INTO `characteristic` VALUES ('1', '理论研究类');
INSERT INTO `characteristic` VALUES ('2', '体育竞技类');
INSERT INTO `characteristic` VALUES ('3', '公共关系类');
INSERT INTO `characteristic` VALUES ('4', '专业实践类');
INSERT INTO `characteristic` VALUES ('5', '科技创新类');
INSERT INTO `characteristic` VALUES ('6', '艺术特长类');
INSERT INTO `characteristic` VALUES ('7', '文化传承类');
INSERT INTO `characteristic` VALUES ('8', '社会服务类');

-- ----------------------------
-- Table structure for `chat`
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `sender` int NOT NULL COMMENT '发送者id 可为社团id或用户id -1为管理员',
  `receiver` int NOT NULL COMMENT '接收者id',
  `time` datetime NOT NULL COMMENT '发送时间',
  `details` varchar(255) NOT NULL COMMENT '聊天内容',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0发送者为用户 1为社团 2为管理员',
  `isRead` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0未读 1已读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES ('1', '49', '17', '2023-05-09 00:00:00', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('2', '49', '17', '2023-05-30 00:00:00', '恭喜你加入我们社团！！！', '0', '0');
INSERT INTO `chat` VALUES ('3', '3', '49', '2023-05-09 00:00:00', 'dsfdsfdsf', '0', '0');
INSERT INTO `chat` VALUES ('5', '49', '15', '2023-06-09 09:38:04', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('6', '49', '26', '2023-06-09 09:38:51', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('7', '49', '12', '2023-06-09 14:29:25', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('9', '49', '56', '2023-06-12 16:05:24', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('10', '49', '57', '2023-06-13 15:30:58', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('11', '49', '11', '2024-02-18 16:53:22', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('12', '49', '25', '2024-02-18 16:53:23', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('13', '49', '57', '2024-05-08 10:01:59', '恭喜你加入我们社团！！！', '1', '0');
INSERT INTO `chat` VALUES ('14', '49', '19', '2024-05-08 11:49:00', '恭喜你加入我们社团！！！', '0', '0');
INSERT INTO `chat` VALUES ('15', '49', '20', '2024-05-08 11:49:00', '恭喜你加入我们社团！！！', '0', '0');

-- ----------------------------
-- Table structure for `club`
-- ----------------------------
DROP TABLE IF EXISTS `club`;
CREATE TABLE `club` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '社团名',
  `imgURL` varchar(255) NOT NULL COMMENT '图片',
  `slogan` varchar(255) NOT NULL DEFAULT '欢迎加入我们社团！' COMMENT '标语',
  `intro` varchar(255) NOT NULL COMMENT '简介',
  `characteristicID` int NOT NULL COMMENT '特征id',
  `number` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `club_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of club
-- ----------------------------
INSERT INTO `club` VALUES ('3', '英语社', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%8B%B1%E8%AF%AD.jpg', '欢迎加入我们社团！！！', 'dcdcdefrw', '1', '3');
INSERT INTO `club` VALUES ('4', '古今诗词学社', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%AF%97%E8%AF%8D.jpg', '云想衣裳花想容 春风拂槛露华浓', '古今', '1', '2');
INSERT INTO `club` VALUES ('5', '周易研究学会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%91%A8%E6%98%93.jpg', '欢迎加入我们社团！', '周易', '1', '2');
INSERT INTO `club` VALUES ('6', '军事爱好者协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%86%9B%E4%BA%8B.jpg', '欢迎加入我们社团！', '军事', '1', '2');
INSERT INTO `club` VALUES ('7', '马克思主义研究协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E9%A9%AC%E5%85%8B%E6%80%9D.jpg', '欢迎加入我们社团！', '马克思', '1', '2');
INSERT INTO `club` VALUES ('8', '武术协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E6%AD%A6%E6%9C%AF.jpg', '欢迎加入我们社团！', '武术协会', '2', '2');
INSERT INTO `club` VALUES ('9', '跆拳道协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%B7%86%E6%8B%B3%E9%81%93.jpg', '欢迎加入我们社团！', '跆拳道', '2', '2');
INSERT INTO `club` VALUES ('10', '轮滑协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%BD%AE%E6%BB%91.jpg', '欢迎加入我们社团！', '轮滑', '2', '2');
INSERT INTO `club` VALUES ('11', '足球协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%B6%B3%E7%90%83.jpg', '欢迎加入我们社团！', '足球', '2', '1');
INSERT INTO `club` VALUES ('12', '心理协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%BF%83%E7%90%86.jpg', '欢迎加入我们社团！', '心理', '3', '2');
INSERT INTO `club` VALUES ('13', '天文爱好者协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%A4%A9%E6%96%87.jpg', '欢迎加入我们社团！', '天文', '3', '2');
INSERT INTO `club` VALUES ('14', '旅游爱好者协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '旅游', '3', '2');
INSERT INTO `club` VALUES ('15', '演讲协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '演讲', '3', '3');
INSERT INTO `club` VALUES ('16', '教师职业爱好者', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '教师爱好', '3', '3');
INSERT INTO `club` VALUES ('17', '兵乓球协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '兵乓球', '2', '5');
INSERT INTO `club` VALUES ('18', '篮球协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E7%AF%AE%E7%90%83.jpg', '欢迎加入我们社团！', '篮球', '2', '6');
INSERT INTO `club` VALUES ('19', '羽毛球协会', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-shvets-production-8007157.jpg', '欢迎加入我们社团！', '羽毛球', '2', '3');
INSERT INTO `club` VALUES ('20', '象棋协会', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-rgsk97-814133.jpg', '欢迎加入我们社团！', '象棋', '2', '3');
INSERT INTO `club` VALUES ('21', '商务协会', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-rgsk97-814133.jpg', '欢迎加入我们社团！', '商务', '4', '5');
INSERT INTO `club` VALUES ('22', '自主创业协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%BB%BA%E7%AD%91.jpg', '欢迎加入我们社团！', '自主创业', '4', '6');
INSERT INTO `club` VALUES ('23', '编程爱好者协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '编程爱好者', '4', '7');
INSERT INTO `club` VALUES ('24', '新农学会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%BB%BA%E7%AD%91.jpg', '欢迎加入我们社团！', '新农', '4', '3');
INSERT INTO `club` VALUES ('25', '电子协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E7%94%B5%E5%AD%90%E5%8D%8F%E4%BC%9A.jpg', '欢迎加入我们社团！', '电子', '5', '5');
INSERT INTO `club` VALUES ('26', '电脑爱好者协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E7%94%B5%E8%84%91.jpg', '欢迎加入我们社团！', '电脑爱好者', '5', '7');
INSERT INTO `club` VALUES ('27', '建筑模型设计', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%BB%BA%E7%AD%91.jpg', '欢迎加入我们社团！', '建筑模型', '5', '6');
INSERT INTO `club` VALUES ('28', '摄影与DV爱好者协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E6%91%84%E5%BD%B1.jpg', '成就不一样的你', '摄影', '5', '3');
INSERT INTO `club` VALUES ('29', '师范生风采协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '师范生', '5', '5');
INSERT INTO `club` VALUES ('30', '动漫社', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%8A%A8%E6%BC%AB.jpg', '欢迎加入我们社团！', '动漫', '6', '4');
INSERT INTO `club` VALUES ('31', '百声器乐协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E4%B9%90%E5%99%A8.jpg', '欢迎加入我们社团！', '器乐', '6', '5');
INSERT INTO `club` VALUES ('32', '街舞协会', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%A1%97%E8%88%9E.jpg', '欢迎加入我们社团！', '街舞', '6', '6');
INSERT INTO `club` VALUES ('33', '晨风剧社', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E6%96%87%E5%8C%96%E5%89%A7.jpg', '欢迎加入我们社团！', '剧社', '6', '6');
INSERT INTO `club` VALUES ('34', '国风学堂', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '国风', '7', '7');
INSERT INTO `club` VALUES ('35', '汉服协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '汉服', '7', '6');
INSERT INTO `club` VALUES ('36', '民俗风采协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '民俗', '7', '5');
INSERT INTO `club` VALUES ('37', '手工协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '手工', '7', '4');
INSERT INTO `club` VALUES ('38', '书法协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '学习传统书法之美', '书法', '7', '3');
INSERT INTO `club` VALUES ('39', '环保协会', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！', '环保', '8', '3');
INSERT INTO `club` VALUES ('50', '陶瓷协会', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-cottonbro-3094041.jpg', '欢迎加入我们社团！', 'adfafdsdaad', '1', '1');
INSERT INTO `club` VALUES ('61', '生活小妙招', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg', '欢迎加入我们社团！！！', '1231231231qw', '2', '1');
INSERT INTO `club` VALUES ('62', '自行车go', 'https://cdn.acwing.com/media/user/profile/photo/189222_lg_e98d5f43bb.jpg', '欢迎加入我们社团！！！', '123456789', '4', '1');
INSERT INTO `club` VALUES ('63', '胶囊时刻', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-pixabay-159211.jpg', '欢迎加入我们mnbvcx社团！！！', 'zxcvbn', '2', '1');
INSERT INTO `club` VALUES ('64', '090', 'http://scdwjow71.hn-bkt.clouddn.com/1686206999496.jpg', '欢迎加入我们090社团！！！', 'vcvc', '5', '1');

-- ----------------------------
-- Table structure for `clubapplication`
-- ----------------------------
DROP TABLE IF EXISTS `clubapplication`;
CREATE TABLE `clubapplication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户id',
  `clubName` varchar(30) NOT NULL COMMENT '社团名',
  `imgURL` varchar(255) DEFAULT NULL COMMENT '图片',
  `slogan` varchar(255) NOT NULL COMMENT '口号',
  `intro` varchar(255) NOT NULL COMMENT '简介',
  `characteristicID` int NOT NULL COMMENT '特征',
  `time` datetime NOT NULL COMMENT '申请时间',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0未审核1已同意2已拒绝',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of clubapplication
-- ----------------------------
INSERT INTO `clubapplication` VALUES ('1', '23', 'mnbvcx', 'bkt.clouddn.com/1686226425048.jpg', 'zxcvbn', 'mnbvcx', '2', '2023-06-07 14:22:37', null, '0');
INSERT INTO `clubapplication` VALUES ('2', '25', '4121', 'bkt.clouddn.com/1686226425048.jpg', '123', '1234', '1', '2023-06-07 15:00:31', null, '0');
INSERT INTO `clubapplication` VALUES ('7', '49', '是的', 'http://tmp/gEc8v3Dlryd39463549b69d0fabb5c14bb5dddca043a.png', '欢迎加入我们是的社团！！！', '但是', '1', '2024-05-08 11:59:37', '0000', '0');
INSERT INTO `clubapplication` VALUES ('8', '49', '发布答辩', 'http://scdwjow71.hn-bkt.clouddn.com/images/club_background/%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.png', '欢迎加入我们发布答辩社团！！！', '的甘肃省 ', '1', '2024-05-08 12:03:54', '0000', '0');

-- ----------------------------
-- Table structure for `clubinformation`
-- ----------------------------
DROP TABLE IF EXISTS `clubinformation`;
CREATE TABLE `clubinformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clubId` int NOT NULL COMMENT '社团id',
  `backgroundurl` varchar(255) DEFAULT NULL COMMENT '背景图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of clubinformation
-- ----------------------------
INSERT INTO `clubinformation` VALUES ('1', '2', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('2', '3', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('3', '1', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('4', '20', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('5', '38', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('6', '61', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('7', '63', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-pixabay-159211.jpg');
INSERT INTO `clubinformation` VALUES ('8', '64', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('9', '66', 'http://rvvfyy1xi.hn-bkt.clouddn.com/1686641625033.jpg');
INSERT INTO `clubinformation` VALUES ('10', '67', 'http://tmp/O5y2YAJb2AR7dfd729086f768a4c94004c774c0b0869.png');
INSERT INTO `clubinformation` VALUES ('11', '68', 'http://tmp/nKOtWs9JeMco83fc0eccf800958612a78d4471f755ef.png');
INSERT INTO `clubinformation` VALUES ('12', '4', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%AF%97%E8%AF%8D.jpg');
INSERT INTO `clubinformation` VALUES ('13', '32', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%A1%97%E8%88%9E.jpg');
INSERT INTO `clubinformation` VALUES ('14', '23', 'http://scdwjow71.hn-bkt.clouddn.com/news-details-img-1.jpg');
INSERT INTO `clubinformation` VALUES ('15', '26', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E7%94%B5%E8%84%91.jpg');
INSERT INTO `clubinformation` VALUES ('16', '32', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E8%A1%97%E8%88%9E.jpg');
INSERT INTO `clubinformation` VALUES ('17', '5', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%91%A8%E6%98%93.jpg');
INSERT INTO `clubinformation` VALUES ('18', '6', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%86%9B%E4%BA%8B.jpg');
INSERT INTO `clubinformation` VALUES ('19', '19', 'http://scdwjow71.hn-bkt.clouddn.com/pexels-shvets-production-8007157.jpg');
INSERT INTO `clubinformation` VALUES ('20', '69', 'http://tmp/4SQEu1IrhKJn83fc0eccf800958612a78d4471f755ef.png');
INSERT INTO `clubinformation` VALUES ('21', '18', 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E7%AF%AE%E7%90%83.jpg');

-- ----------------------------
-- Table structure for `clubmember`
-- ----------------------------
DROP TABLE IF EXISTS `clubmember`;
CREATE TABLE `clubmember` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clubId` int NOT NULL COMMENT '社团id',
  `userId` int NOT NULL COMMENT '用户id',
  `role` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0成员 1社长 2副社长',
  PRIMARY KEY (`id`),
  UNIQUE KEY `clubmember_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of clubmember
-- ----------------------------
INSERT INTO `clubmember` VALUES ('2', '20', '3', '1');
INSERT INTO `clubmember` VALUES ('3', '28', '2', '1');
INSERT INTO `clubmember` VALUES ('8', '3', '8', '0');
INSERT INTO `clubmember` VALUES ('9', '3', '9', '0');
INSERT INTO `clubmember` VALUES ('13', '3', '13', '0');
INSERT INTO `clubmember` VALUES ('14', '4', '14', '0');
INSERT INTO `clubmember` VALUES ('15', '3', '1', '0');
INSERT INTO `clubmember` VALUES ('16', '4', '1', '0');
INSERT INTO `clubmember` VALUES ('24', '61', '9', '1');
INSERT INTO `clubmember` VALUES ('26', '3', '16', '1');
INSERT INTO `clubmember` VALUES ('39', '18', '3', '1');
INSERT INTO `clubmember` VALUES ('40', '4', '49', '1');
INSERT INTO `clubmember` VALUES ('41', '4', '57', '0');
INSERT INTO `clubmember` VALUES ('42', '38', '57', '1');

-- ----------------------------
-- Table structure for `clubmemberapplication`
-- ----------------------------
DROP TABLE IF EXISTS `clubmemberapplication`;
CREATE TABLE `clubmemberapplication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clubId` int NOT NULL COMMENT '社团id',
  `userId` int NOT NULL COMMENT '用户id',
  `detail` varchar(255) DEFAULT NULL COMMENT '留言',
  `time` datetime NOT NULL COMMENT '申请时间',
  `state` tinyint(1) DEFAULT '0' COMMENT '0未审核1已同意2已拒绝',
  `remark` varchar(255) DEFAULT NULL COMMENT '审核备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of clubmemberapplication
-- ----------------------------
INSERT INTO `clubmemberapplication` VALUES ('21', '28', '49', '我很想加入！！！', '2023-06-09 15:01:42', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('22', '3', '49', '我很想加入！！！', '2023-06-09 15:02:03', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('25', '19', '49', '我很想加入！！！', '2024-02-18 16:55:25', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('26', '18', '49', '我很想加入！！！', '2024-04-23 15:57:40', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('27', '32', '49', '我很想加入！！！', '2024-05-08 10:03:45', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('30', '4', '19', '我非常想加入！！！', '2024-05-08 11:50:33', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('31', '4', '23', '我非常想加入！！！', '2024-05-08 11:50:57', '0', null);
INSERT INTO `clubmemberapplication` VALUES ('32', '23', '49', '我很想加入！！！', '2024-05-08 13:21:55', '0', null);

-- ----------------------------
-- Table structure for `command`
-- ----------------------------
DROP TABLE IF EXISTS `command`;
CREATE TABLE `command` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '评论表id',
  `activityid` int NOT NULL,
  `userid` int NOT NULL,
  `detail` varchar(255) NOT NULL,
  `time` date NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `likes` bigint NOT NULL,
  `number` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `command_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of command
-- ----------------------------
INSERT INTO `command` VALUES ('5', '9', '49', 'sdsdsd', '2023-05-30', 'sdsd', '0', '0');
INSERT INTO `command` VALUES ('6', '7', '49', 'sdsdsd', '2023-05-30', 'sdsd', '0', '0');
INSERT INTO `command` VALUES ('9', '7', '49', '123', '2023-06-13', '', '0', '0');
INSERT INTO `command` VALUES ('10', '9', '49', 'DFV第三方', '2024-02-18', '', '0', '0');
INSERT INTO `command` VALUES ('11', '9', '49', 'DFV第三方风格和', '2024-02-18', '', '0', '0');
INSERT INTO `command` VALUES ('12', '10', '49', '丰田皇冠放假吗', '2024-04-23', '', '0', '0');
INSERT INTO `command` VALUES ('13', '11', '49', '地回头太难', '2024-04-23', '', '0', '0');
INSERT INTO `command` VALUES ('14', '22', '49', '它也具有他们', '2024-04-23', '', '0', '0');
INSERT INTO `command` VALUES ('15', '5', '49', '非常好', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('16', '5', '49', '哈哈哈', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('17', '5', '49', '什么东西', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('18', '21', '49', '123', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('19', '21', '49', '13fr g', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('20', '21', '49', '成都vu的', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('21', '5', '49', '哈哈哈', '2024-05-08', '', '0', '0');
INSERT INTO `command` VALUES ('22', '5', '49', '哈哈哈好好', '2024-05-08', '', '0', '0');

-- ----------------------------
-- Table structure for `friend`
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId_1` int NOT NULL COMMENT '用户id1',
  `userId_2` int NOT NULL COMMENT '用户id2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES ('1', '3', '2');

-- ----------------------------
-- Table structure for `leave1`
-- ----------------------------
DROP TABLE IF EXISTS `leave1`;
CREATE TABLE `leave1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activityId` int NOT NULL COMMENT '活动id',
  `userId` int NOT NULL COMMENT '用户id',
  `datail` varchar(255) NOT NULL COMMENT '内容',
  `likes` int NOT NULL DEFAULT '0' COMMENT '点赞数',
  `replyto` int NOT NULL COMMENT '回复对象id 0为无',
  `time` date NOT NULL,
  `imgurl` varchar(100) NOT NULL,
  `commandid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of leave1
-- ----------------------------
INSERT INTO `leave1` VALUES ('1', '2', '3', '棒', '0', '4', '2023-05-29', 'ku.', '1');
INSERT INTO `leave1` VALUES ('2', '2', '2', '一般', '0', '33', '2023-05-24', 'ku.', '2');
INSERT INTO `leave1` VALUES ('3', '2', '49', '大苏打的方式v房地产v发达的省份菜都是非常v的方式v地方v反对v范德萨梵蒂冈v的方式v的方式v的方式VS的方式公司的发表v的方式v地方上班v的 ', '1', '4', '2023-05-25', 'jkjh', '1');
INSERT INTO `leave1` VALUES ('4', '2', '49', 'ghnghnyhmnjym', '2', '4', '2023-05-10', 'jkjh', '1');
INSERT INTO `leave1` VALUES ('5', '2', '2', '成都市v', '7', '4', '2023-05-01', 'jkjh', '1');
INSERT INTO `leave1` VALUES ('6', '2', '4', 'rgrhbgf', '0', '33', '2023-05-27', 'ergerfg', '2');
INSERT INTO `leave1` VALUES ('7', '2', '7', 'gjk,kjg', '0', '5', '2023-05-26', 'uyjkuku', '3');
INSERT INTO `leave1` VALUES ('8', '2', '9', 'dsfdsf', '0', '6', '2023-05-12', 'ghmnhgj', '4');
INSERT INTO `leave1` VALUES ('9', '2', '49', 'sdsdsd', '10', '33', '2023-05-30', 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png', '2');
INSERT INTO `leave1` VALUES ('10', '2', '49', 'sdsdsd', '10', '33', '2023-05-30', 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png', '2');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sequence` varchar(20) NOT NULL COMMENT '账号，学号',
  `nickName` varchar(120) NOT NULL COMMENT '昵称',
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '123456' COMMENT '瀵嗙爜',
  `role` tinyint NOT NULL DEFAULT '0' COMMENT '0:普通成员；1:社团管理员；2:管理员',
  `imgURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2121232323', '王大', '$2a$10$PfqvzIN3S5eEdigEmoItQuNWWwVyywvp3KIF4PyreMIpBjnAdF6ja', '0', 'https://cdn.acwing.com/media/user/profile/photo/189222_lg_e98d5f43bb.jpg');
INSERT INTO `user` VALUES ('2', 'fdgh ', 'fghgf', 'ghcjghj', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('3', '20200202003', '钱三', '$2a$10$IKszCZ1ccki46aWHBzmfmOgybz1htfWN9ux4p3rLFPoGW/mqS8OTS', '1', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('4', '20200202004', '李四', '$2a$10$IKszCZ1ccki46aWHBzmfmOgybz1htfWN9ux4p3rLFPoGW/mqS8OTS', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('5', '20200202005', '张三', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('6', '20200202006', '熊大', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('7', '20200202007', '熊二', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('8', '20200202008', '光头强', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('9', '20200202009', '张若尘', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('13', '20200202013', '王子西', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('14', '32323', '2323 2', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('15', '20200202014', '田震', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('16', '20200202015', '田三', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('17', '20200202016', '天天', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('18', '20200202017', '小黑', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('19', '20200202018', '黄烟尘', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('23', '20200202023', '帝一', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('25', '2121232323', '2131', '$2a$10$PfqvzIN3S5eEdigEmoItQuNWWwVyywvp3KIF4PyreMIpBjnAdF6ja', '0', 'https://cdn.acwing.com/media/user/profile/photo/189222_lg_e98d5f43bb.jpg');
INSERT INTO `user` VALUES ('26', '1233', '123', '123456', '0', 'http://scdwjow71.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('27', '1401065701', 'Admin', '123456', '2', 'http://rvvfyy1xi.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('29', '15358310078', '15358310078', '123456', '2', 'http://rvvfyy1xi.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('32', 'admin', 'admin', '123456', '0', 'http://rvvfyy1xi.hn-bkt.clouddn.com/1686206625172.jpg');
INSERT INTO `user` VALUES ('49', '1222', '雲欲', '$2a$10$EMYJK8Ev7mCctvo0N7LumuhT3eJH/odfOIOcncuxwVhQDVY0lk5wC', '1', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLRDYibKYKSMqko0ibCozY5XibWwv1tsxbpscZtECr20rmkTRI0nJFmdOvB1hysPfdHHt7W40rNeF0qw/132');
INSERT INTO `user` VALUES ('57', '121222', '餐餐都有肉', '$2a$10$Hld6bMrpihJTK1BSc7KeVePASMEl9/TIFjvbkmeN..nu2DR7VYRPO', '0', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJWB5fMx2bvmBnr2fsicicghjgCSrG3NvawGmuyHsxFjXeRpJQPhBrHiarVXficrmxF2We8bgqnAzvCVw/132');

-- ----------------------------
-- Table structure for `userinformation`
-- ----------------------------
DROP TABLE IF EXISTS `userinformation`;
CREATE TABLE `userinformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户表id',
  `birthday` date DEFAULT NULL COMMENT '出生日期',
  `sex` char(1) DEFAULT '男' COMMENT '性别',
  `phoneNumber` char(12) DEFAULT NULL COMMENT '联系电话',
  `intro` varchar(255) DEFAULT '这个人什么都没写！' COMMENT '个人介绍',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of userinformation
-- ----------------------------
INSERT INTO `userinformation` VALUES ('1', '1', '2022-11-08', '女', '12345678901', '这个人什么都没写！');
INSERT INTO `userinformation` VALUES ('2', '2', '2022-08-25', '男', '12345678091', '这个人什么都没写！');
INSERT INTO `userinformation` VALUES ('3', '3', '2023-02-02', '男', '12345678991', '这个人什么都没写！');
INSERT INTO `userinformation` VALUES ('4', '4', '2022-03-24', '女', '12345678891', 'hello');
INSERT INTO `userinformation` VALUES ('5', '5', '2021-06-16', '男', '11111111111', 'aaaaaaaaaaaaaaa');
INSERT INTO `userinformation` VALUES ('6', '6', '2011-11-24', '女', '22222222222', 'bbbbbbbbbb');
INSERT INTO `userinformation` VALUES ('7', '7', '2012-07-13', '男', '33333333333', 'ccccccccccc');
INSERT INTO `userinformation` VALUES ('8', '8', '2004-06-16', '男', '44444444444', 'ddddddddddddddddddd');
INSERT INTO `userinformation` VALUES ('9', '9', '2005-06-16', '男', '55555555555', 'eeeeeeeeeeeeeeeee');
INSERT INTO `userinformation` VALUES ('13', '13', '1993-03-20', '女', '99999999999', '这个人什么都没写！');
INSERT INTO `userinformation` VALUES ('14', '14', '2006-07-08', '男', '11111111110', 'ooooooooooooooooo');
INSERT INTO `userinformation` VALUES ('15', '25', '2023-02-15', '女', '120938091283', 'adaw');
INSERT INTO `userinformation` VALUES ('16', '26', '2023-02-21', '女', '123123213', 'yhjty');
INSERT INTO `userinformation` VALUES ('17', '27', '1995-03-07', '女', '34343434', 'regtrg');
INSERT INTO `userinformation` VALUES ('19', '29', '2023-05-03', '男', '4545454545', 'gfhgf');
INSERT INTO `userinformation` VALUES ('22', '32', '2023-05-03', '男', '65656', 'fghgf');
INSERT INTO `userinformation` VALUES ('27', '49', '2002-02-10', '男', '15358239908', '~~~~');
INSERT INTO `userinformation` VALUES ('28', '15', '2023-05-11', '女', '15358239908', '这个人什么都没写！');
INSERT INTO `userinformation` VALUES ('29', '16', '2023-05-17', '男', '15358239908', '这个人什么都没写');
INSERT INTO `userinformation` VALUES ('30', '17', '2023-05-11', '男', '15358239908', '这个人什么都没写');
INSERT INTO `userinformation` VALUES ('31', '18', '1998-05-05', '男', '15358239908', '这个人什么都没写');
INSERT INTO `userinformation` VALUES ('32', '19', '1999-05-06', '女', '15358239908', '这个人什么都没写');
INSERT INTO `userinformation` VALUES ('36', '23', '2005-05-05', '男', '15358239908', '这个人什么都没写');
INSERT INTO `userinformation` VALUES ('45', '57', '2002-02-10', '女', '15358239908', '这个用户很懒~~~~~');
