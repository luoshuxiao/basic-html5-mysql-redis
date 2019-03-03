#一.数据库
**将数据持久化的容器**
##1.数据持久化：将数据从内存转移到可持久化介质上（硬盘）
##2.数据库类别：
###a.关系型数据库
	特点：1）理论基础：集合论和关系代数
	     2）用二维表来组织数据：一行叫一条记录，一列叫一个字段（单列可以最多放4G的字符集）
	     3）关系型数据库有自己的编程语言：SQL（结构化查询语言）
	关系型数据库产品SQL：
	   Oracle -- 甲骨文产品（付费）
	   MySQL -- 甲骨文产品（社区版免费）
	         -- MariaDB（和MySQL一样）
	   DB2 -- IBM产品
	   SQLServer -- 微软产品（要用windows系统，所以不常用）
	   PostgreSQL
	   SQLite
	非关系型数据库NoSQL：
	  MongoDB -- 文档数据库 -- 适合量大价值价值又低的数据类型
	  redis -- kv数据库（键值对） -- 性能特别好 -- 适合做项目中告诉缓存服务
	  ElasticSearch -- 搜索引擎
##2.Linux系统中安装mysql5.7工具 
###a.包管理工具 -- yum(黄狗更新器)、rpm(红帽子)
###b.Docker -- 虚拟化服务，创建虚拟化容器并安装软件
   	 yum -y install docker-io -- 安装docker虚拟机
	 yum info docker -- 查看软件
	 yum search docker -- 搜索软件信息
	
	 启动Docker服务：
		systemctl start docker -- 启动docker服务
		systemctl restart docker -- 重新启动docker服务
		systemctl status docker -- 查看docker状态 
		systemctl stop docker -- 停止docker服务
		systemctl enable docker -- 开机启动docker服务
		systemctl disable docker -- 关闭开机启动docker服务

	使用docker命令：
	1.docker images -- 查看已经下载的镜像文件（安装包）
	2.docker pull mysql:5.7 -- 下载MySQL镜像文件
		  MySQL 数据库超级管理员：root
		  Oracle 数据库超级管理员 ： sys
	3. docker run -d -p 3306:3306 --name mysql57 -e MYSQL_ROOT_PASSWOED=123456 mysql:5.7 -- 创建并运行mysql容器
		-d  -- 关闭服务器时关闭mysql
		-p  -- 传输端口
		3306:3306 -- 输出和输入端口（输出是数据库输出给用户可以自定义，输入必须是3306，阿里云服务器默认的）
		-name -- 给容器取名字
		-e -- 创建账户、密码
	4.docker ps : 查看运行中的容器
	5.docker container ls -a -- 查看所有容器
	6. 停止docker中的mysql容器 -- docker stop mysql57
	7. 启动docker中的mysql容器 -- docker start masql57
	8. 删除docker中的mysql容器 -- docker rm -f masql57

###c.windows安装mysql客户端工具：
	Navicat for MySQL -- 猫
	SQLyog -- 海豚
	Toad for MySQL -- 蛤蟆
#二.创建并管理数据库：SQL -- 结构化查询语言
**删除和更新数据谨慎使用，大部分数据库数据不能找回**
##1.SQL语言分为三组：
	  a.DDL(数据定义语言)：creat(创建)、drop(删除)、alter(修改)
	  b.DML(数据操作语言)：insert(插入)、delete(删除)、update（更新）、select(查询)（重点掌握对象）
	  c.DCL(数据控制语言)：grant、revoke、commit、rollback
##2.创建数据库：
	如果存在名为srs数据库就删除（mysql没有找回删除的技术,删除需谨慎）
	drop database if exists srs;
#####创建数据库取名srs(学生逃课系统)不区分大小写
	默认的字符集是latin1 -- iso-8859-1
	create database srs default charset utf8;
#####切换到srs数据库
	use srs;
#####创建二维表：
	创建学生表tb_student:
	在学生表中学号可以是唯一的标记一条学生记录
	我们通常称这样的列为主键列（主键）
	定义列：
	create table tb_student
	(

	学号：整型，不为空，添加注释：学号
	stuid int not null comment '学号',

	姓名：不定长字符（最多10个字符），不为空，注释：姓名
	stuname varchar(10) not null comment '姓名',

	性别：比特类型，默认值1，注释 ：性别
	stusex bit default 1 comment '性别',

	出身日期 ：date类型，默认为空，注释：出身日期
	stubirth date comment '出身日期',

	住址：定长字符（最长255），注释：住址
	stuaddr varchar(255) comment '住址',

	设置 主键为stuid
	主键冲突或者出现重复值会报错：Error:Duplicated Entry
	primary key (stuid)
	);
#####修改学生表：
    添加联系方式列（定长字符串11个字符）
	alter table tb_student add column stutel char(11);

	修改学生表：删除练习方式列：
	alter table tb_student drop column stutel;

	修改学生表：插入数据：

    (在终端mysql环境中，要插入的数据库下，输入source + 路径插入数据，其中路径下的文件后缀名为.sql，内容为sql语句)

	insert into tb_student values(1001,'龙哥'，1，'1990-11-11','四川成都')；
	insert into tb_student (stuid,stuname) values(1002,'轻语')；
	insert into tb_student values
	(1003,'罗叔羲',0,'1990-2-23','四川成都'),
	（1004，'罗姝'，1，null,null）,
	(1005,'龙哥1'，default,null,null);

	删除数据：
	delete from tb_student where stuid=1001;

	删除主键在1003到1005之间的学生：
	delete from tb_student where stuid>=1003 and stuid<=1005;
	delete from tb_student where stuid in (1003,1004,1005);
	delete from tb_student where stuid between 1003 and 1005;
	
	慎用：截断表（删除数据，保存属性，删除后不可逆转，不可找回数据）-- truncate table tb_student
	
	更新学号为1003和1004的两个学生的生日（set表示后面的第一个=号为赋值符号，不加set的等号表示等于符号，和python不一样）
	update tb_student set stubirth='1990-1-1' where stuid=1002 or stuid=1004;
	update tb_student set stuname='王小美'，stusex=0,stuaddr='四川自贡' where stuid=1002;
	update tb_student set stuaddr='四川绵阳' where stuaddr is null;
#####查询数据：
    查看所有的数据信息：
	select * from tb_student;

	筛选得到所有性别 为0的学生
	select * from tb_student where stusex=0;

	投影所有学生的姓名和生日
	select stuname,stubirth from t_student;
