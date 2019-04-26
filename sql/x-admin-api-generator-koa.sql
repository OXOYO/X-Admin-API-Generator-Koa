-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2019-04-26 10:36:33
-- 服务器版本： 5.7.24
-- PHP 版本： 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `x-admin-api-generator-koa`
--
CREATE DATABASE IF NOT EXISTS `x-admin-api-generator-koa` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `x-admin-api-generator-koa`;

-- --------------------------------------------------------

--
-- 表的结构 `resources`
--

DROP TABLE IF EXISTS `resources`;
CREATE TABLE IF NOT EXISTS `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资源ID',
  `name` varchar(100) NOT NULL COMMENT '资源名称（英文）',
  `dir` varchar(100) NOT NULL COMMENT '资源目录名',
  `icon` varchar(50) DEFAULT NULL COMMENT '资源图标',
  `title` varchar(50) NOT NULL COMMENT '资源标题（中文/英文）',
  `lang` varchar(32) NOT NULL COMMENT 'title对应的语言包key',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID，一级节点父ID为空',
  `num` int(11) NOT NULL DEFAULT '1' COMMENT '序号',
  `position` varchar(32) CHARACTER SET ucs2 NOT NULL COMMENT '挂载位置：home 前台隐式 home-nav 前台导航 admin 后台隐式 admin-nav 后台导航 admin-sidebar 后台侧边栏',
  `type` varchar(32) NOT NULL COMMENT '资源类别：module-system 系统模块 module-app 应用模块 module-link 外链模块',
  `url` varchar(200) NOT NULL COMMENT '外链模块链接',
  `target` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否新窗口打开：0否 1是',
  `permission_type` varchar(32) NOT NULL COMMENT '资源权限类别，多个用英文逗号分隔，0：读 1：写 2：访问',
  `enable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否启用：0停用 1启用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='资源表';

--
-- 转存表中的数据 `resources`
--

INSERT INTO `resources` (`id`, `name`, `dir`, `icon`, `title`, `lang`, `description`, `parent_id`, `num`, `position`, `type`, `url`, `target`, `permission_type`, `enable`, `create_time`, `update_time`) VALUES
(1, 'platform.admin.AdminIndex', 'AdminIndex', 'md-home', '首页', 'R00001', '后台首页', 0, 0, 'admin', 'module-system', '', 0, '0', 1, '2019-04-08 00:00:00', '2019-04-15 09:44:48'),
(2, 'platform.admin.Users', 'Users', 'md-people', '用户管理', 'R00002', '', 7, 1, 'admin-sidebar', 'module-system', '', 0, '0,1', 1, '2019-04-08 00:00:00', '2019-04-08 00:00:00'),
(3, 'platform.admin.Resources', 'Resources', 'md-cube', '资源管理', 'R00003', '', 7, 2, 'admin-sidebar', 'module-system', '', 0, '0,1', 1, '2019-04-08 00:00:00', '2019-04-08 00:00:00'),
(4, 'platform.admin.Roles', 'Roles', 'md-shirt', '角色管理', 'R00004', '', 7, 3, 'admin-sidebar', 'module-system', '', 0, '0,1', 1, '2019-04-08 00:00:00', '2019-04-08 00:00:00'),
(5, 'platform.home.SigIn', 'SignIn', '', '登录', 'R00005', '', 0, 0, 'home-nav', 'module-system', '', 0, '0,1', 1, '2019-04-08 00:00:00', '2019-04-22 06:31:17'),
(6, 'platform.home.About', 'About', '', '关于', 'R00006', '', 0, 0, 'home-nav', 'module-system', '', 0, '0', 0, '2019-04-08 00:00:00', '2019-04-22 06:31:20'),
(7, 'platform.admin.System', 'System', 'md-settings', '系统管理', 'R00007', '', 0, 1, 'admin-sidebar', 'module-system', '', 0, '0', 1, '2019-04-08 00:00:00', '2019-04-22 06:31:37'),
(8, 'platform.admin.DemoApp', 'DemoApp', 'md-apps', 'DemoApp', 'R00010', 'DemoApp', 0, 1, 'admin-sidebar', 'module-app', '', 0, '0,1', 1, '2019-04-08 00:00:00', '2019-04-24 09:46:37'),
(9, 'platform.admin.SystemLog', 'SystemLog', 'md-document', '系统日志', 'R00008', '', 7, 4, 'admin-sidebar', 'module-system', '', 0, '0,1', 1, '2019-04-08 00:00:00', '2019-04-08 00:00:00'),
(10, 'platform.admin.Settings', 'Settings', 'md-settings', '设置', 'R00009', NULL, 7, 0, 'admin-sidebar', 'module-system', '', 0, '0,1', 1, '2019-04-23 01:07:24', '2019-04-23 01:31:29'),
(11, 'platform.admin.TODO', 'TODO', 'md-list', 'TODO', 'R00011', '', 0, 1, 'admin-sidebar', 'module-app', '', 0, '0,1', 1, '2019-04-24 09:47:50', '2019-04-24 09:47:50');

-- --------------------------------------------------------

--
-- 表的结构 `todo_category`
--

DROP TABLE IF EXISTS `todo_category`;
CREATE TABLE IF NOT EXISTS `todo_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(32) NOT NULL COMMENT '分类名称',
  `description` varchar(100) DEFAULT NULL COMMENT '描述',
  `theme` varchar(7) NOT NULL DEFAULT '#3e69e4' COMMENT '主题色',
  `create_user_id` int(11) NOT NULL COMMENT '创建者',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='任务类别';

--
-- 转存表中的数据 `todo_category`
--

INSERT INTO `todo_category` (`id`, `name`, `description`, `theme`, `create_user_id`, `create_time`, `update_time`) VALUES
(1, '任务', '默认分类，禁止删除。', '#3e69e4', 0, '2019-04-25 00:00:00', '2019-04-25 00:00:00'),
(2, '我的待办', NULL, '#FB0121', 1, '2019-04-26 06:39:40', '2019-04-26 09:23:19'),
(5, '我的已办', NULL, '#3BFE04', 1, '2019-04-26 08:22:52', '2019-04-26 09:23:10');

-- --------------------------------------------------------

--
-- 表的结构 `todo_task`
--

DROP TABLE IF EXISTS `todo_task`;
CREATE TABLE IF NOT EXISTS `todo_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `content` varchar(200) NOT NULL COMMENT '内容',
  `remarks` varchar(500) DEFAULT NULL COMMENT '备注',
  `expire` datetime DEFAULT NULL COMMENT '到期时间',
  `category_id` int(11) NOT NULL COMMENT '分类ID',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态：0 未完成 1 完成',
  `star` tinyint(1) NOT NULL DEFAULT '0' COMMENT '星级：0~5级',
  `create_user_id` int(11) NOT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='任务列表';

--
-- 转存表中的数据 `todo_task`
--

INSERT INTO `todo_task` (`id`, `content`, `remarks`, `expire`, `category_id`, `status`, `star`, `create_user_id`, `create_time`, `update_time`) VALUES
(1, '测试', '测试备注', '2019-04-25 00:00:00', 0, 1, 0, 1, '2019-04-25 16:58:00', '2019-04-25 09:54:31'),
(2, '测试001', NULL, NULL, 1, 0, 2, 1, '2019-04-25 09:27:15', '2019-04-26 10:23:28'),
(3, '测试002', NULL, NULL, 1, 1, 4, 1, '2019-04-25 09:28:00', '2019-04-26 09:40:38'),
(4, '测试003', NULL, NULL, 1, 0, 0, 1, '2019-04-25 09:31:06', '2019-04-25 09:31:06'),
(5, '测试003', NULL, NULL, 1, 0, 0, 1, '2019-04-25 09:32:45', '2019-04-25 09:32:45'),
(6, '测试004', NULL, NULL, 1, 0, 2, 1, '2019-04-25 09:32:49', '2019-04-26 09:40:51'),
(7, '测试005', NULL, NULL, 1, 0, 0, 1, '2019-04-25 09:53:35', '2019-04-25 09:53:35'),
(8, 'abcd', NULL, NULL, 2, 0, 0, 1, '2019-04-26 07:08:38', '2019-04-26 09:25:32'),
(9, '测试已办', NULL, NULL, 5, 1, 0, 1, '2019-04-26 09:25:27', '2019-04-26 09:25:30'),
(10, 'dddd', NULL, NULL, 1, 0, 0, 1, '2019-04-26 10:02:34', '2019-04-26 10:02:34');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `account` varchar(32) NOT NULL COMMENT '账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `name` varchar(32) NOT NULL COMMENT '用户名',
  `type` tinyint(1) NOT NULL DEFAULT '2' COMMENT '类型：0超管 1管理员 2普通用户',
  `group_id` varchar(100) DEFAULT NULL COMMENT '用户组ID，多个用英文逗号分隔',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态：0停用 1启用',
  `create_user_id` int(11) NOT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `account`, `password`, `name`, `type`, `group_id`, `status`, `create_user_id`, `create_time`, `update_time`) VALUES
(1, 'root', '0/+hkMxwgGs=', '超级管理员', 0, NULL, 1, 0, '2017-07-20 09:18:04', '2019-04-23 09:48:25'),
(2, 'admin', '0/+hkMxwgGs=', '管理员', 1, '1', 1, 1, '2019-04-08 16:44:00', '2019-04-23 07:39:06'),
(3, 'test', '0/+hkMxwgGs=', '测试', 2, '2', 1, 1, '2019-04-24 06:35:41', '2019-04-24 06:57:53');

-- --------------------------------------------------------

--
-- 表的结构 `user_group`
--

DROP TABLE IF EXISTS `user_group`;
CREATE TABLE IF NOT EXISTS `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户组ID',
  `name` varchar(32) NOT NULL COMMENT '用户组名称',
  `description` varchar(200) NOT NULL COMMENT '用户组描述',
  `status` tinyint(1) NOT NULL COMMENT '状态：0停用 1启用',
  `resource_id` varchar(200) NOT NULL COMMENT '资源ID，多个资源ID用英文逗号分割',
  `permission` varchar(500) NOT NULL COMMENT '权限，资源与权限码用|分割，多个资源用英文逗号分割',
  `create_user_id` int(11) NOT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户组';

--
-- 转存表中的数据 `user_group`
--

INSERT INTO `user_group` (`id`, `name`, `description`, `status`, `resource_id`, `permission`, `create_user_id`, `create_time`, `update_time`) VALUES
(1, '管理员组', '', 1, '7,2,3,4,10', '7|0,2|0|1,3|0,4|0|1,10|0|1', 1, '2019-04-08 00:00:00', '2019-04-24 09:13:17'),
(2, '普通用户组', '', 1, '1,5,7,10,8', '1|0,5|0|1,7|0,10|0|1,8|0|1', 1, '2019-04-24 06:20:58', '2019-04-24 09:13:24');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
