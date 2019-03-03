#一.关系型数据库数据表之间的关系：一对多，多对一，多对多
##a.数据完整性：
	关系型数据库可以保证数据的完整性：
	  -- 实体完整性： 每条记录都是独一无二的，没有冗余 -- 主键、唯一索引
	  -- 参照完整性（引用完整性）：外键
	  -- 域完整性： 数据类型，非空约束，默认值约束，检查约束（Oracl支持，MySQL不支持）
##b.数据表关系：
		create table tb_college
		(
		colid int auto_increment,
		colname varchar(20) not null,
		website varchar(255),
		primary key (colid)
		);

		-- 修改tb_college表 添加主键约束
		-- alter table tb_college add constraint pk_college_id primary key (colid);

		-- 修改tb_college表，给website字段添加唯一性约束
		alter table tb_college add constraint uni_college_website unique (website);

		-- 删除名为uni_college_website的唯一性约束
		alter table tb_college drop index uni_college_website;

		insert into tb_college (colname,website) values 
		('计算机学院','http://www123.com'),
		('管理学院','http://www.baidu.com'),
		('汽车学院','http://www.jindong.com');
		
		select * from tb_college;
		-- 修改学生表tb_student，给学生加一个列，表示在哪一个学院
		alter table tb_student add column colid int comment '所在学院编号';

		-- 修改学生表tb_student添加外键约束（外来主键：外键），限制学生表中的学院 标号必须参照学院表的学院编号
		alter table tb_student add constraint  fk_student_colid foreign key (collid) references tb_college (colid);
		

		-- 总结：如果要维持两个实体（表）之间一对多或多对一的关系
		-- 需要在多的一方添加一个外键列简历起参照完整性即可
		

		create table tb_course
		(
		courid int auto_increment comment '课程名称',
		courname varchar(50) not null comment '课程名字',
		credit tinyint not null comment '学分 ',
		primary key (courid)
		);
		

		create table tb_teather
		(
		teathid int auto_increment comment '老师编号',
		teathname varchar(20) not null comment '老师姓名',
		teathtitle varchar(20) not null comment '职称',
		colid int not null comment '所属学院',
		primary key (teathid)
		);

		-- 修改老师表，添加外键约束
		alter table tb_teather add constraint fk_teather_colid foreign key (colid) references tb_college (colid);

		-- 修改课程表，添加外键列
		alter table tb_course add column teathid int comment '添加外键列';

		-- 修改课程表，添加外键约束
		alter table tb_course add constraint fk_course_teathid foreign key (teathid)
		references tb_teather (teathid);
		

		-- 关系型数据库里面，多对多关系需要通过创建中间表来维持
		create table tb_score
		(
		scid int auto_increment comment '选课编号',
		sid int not null comment '学号',
		cid int not null comment '课程编号',
		-- 分数：四位有效数字，小数点后面1位
		mark decimal(4,1) not null comment '考试成绩',
		primary key (scid),
		foreign key (sid) references tb_student (stuid),
		foreign key (cid) references tb_course (courid)
		);


		-- 将学生学号和课程编号作为一个组合，添加唯一性约束
		alter table tb_score add constraint uni_score_sid_cid
		unique (sid,cid);
#二.select 查询语句

				-- select 语句顺序 ：
				-- from子语句
				-- where子句
				-- group by 子句
				-- having 子句
				-- order by 子句
				-- limit 子句

	insert into tb_score (sid, cid, seldate, mark) values 
	(1001, 1111, '2017-09-01', 95),
	(1001, 2222, '2017-09-01', 87.5),
	(1001, 3333, '2017-09-01', 100),
	(1001, 4444, '2018-09-03', null),
	(1001, 6666, '2017-09-02', 100),
	(1002, 1111, '2017-09-03', 65),
	(1002, 5555, '2017-09-01', 42),
	(1033, 1111, '2017-09-03', 92.5),
	(1033, 4444, '2017-09-01', 78),
	(1033, 5555, '2017-09-01', 82.5),
	(1572, 1111, '2017-09-02', 78),
	(1378, 1111, '2017-09-05', 82),
	(1378, 7777, '2017-09-02', 65.5),
	(2035, 7777, '2018-09-03', 88),
	-- now()是mysql的一个获取当前时间（格林尼治标准时间）的函数，date(now())获取当前时间的日期段，time(now())获取当前时间的时间段
	(2035, 9999, date(now()), null),
	(3755, 1111, date(now()), null),
	(3755, 8888, date(now()), null),
	(3755, 9999, '2017-09-01', 92);



      -- 查询所有学生信息
		select * from tb_student;
		-- 查询所有课程名称及学分(投影:指定看那些列/别名：as给投影的数据重新取名字)
		select cname as 课程名称,credit as 学分 from tb_course;
		-- 查询所有女学生的姓名和出生日期(筛选)
		select sname,birth from tb_student where gender=0;
		-- 查询所有80后学生的姓名、性别和出生日期(筛选)
		select
		   sname as 姓名,
			 case gender when 1 then '男' else '女' end as 性别,
			 birth as 出身日期 
		from tb_student 
		where birth between '1980-1-1' and '1989-12-31';
		
		-- 使用函数写性别男和女的显示(只有MySQL可以用，其他数据库不能用)
		select
		   sname as 姓名,
			 if(gender,'男','女') as 性别,
			 birth as 出身日期 
		from tb_student 
		where birth between '1980-1-1' and '1989-12-31';
		-- 查询四个字符的名字的学生:length()函数，获取字符的字节数
		select stuid as 学号,sname as 名字 from tb_student where length(sname)/3=4;
		-- 查询姓”杨“的学生姓名和性别(模糊)
		select sname as 姓名,if (gender,'男','女') as 性别
		from tb_student where sname like '杨%';
		-- 查询姓”杨“名字两个字的学生姓名和性别(模糊)
		select sname as 姓名,if(gender,'男','女') as 性别
		from tb_student where sname like '杨_';
		-- 查询姓”杨“名字三个字的学生姓名和性别(模糊)
		select sname  as 姓名,if(gender,'男','女') as 性别 
		from tb_student where sname like '杨__';
		-- 查询名字中有”不“字或“嫣”字的学生的姓名(模糊)
		select sname as 姓名 from tb_student where sname like '%不%' or sname like '%嫣%';
		 -- 查询没有录入家庭住址的学生姓名(空值)
		--  
		select sname as 姓名 from tb_student where addr is null or addr='';
		-- 查询录入了家庭住址的学生姓名(空值)
		select sname as 姓名 from tb_student where addr is not null and addr<>'';
		-- 查询学生选课的所有日期(去重)
		select distinct seldate from tb_score;
		-- 查询学生的家庭住址(去重)
		select distinct addr as 家庭住址 from tb_student  where addr is not null and addr<>'';
		-- 查询男学生的姓名和生日按年龄从大到小排列(排序):desc(降序),asc（升序），升序可以不写asc，默认是升序（执行时先where再order by）
		select sname as 姓名,year(now())-year(birth) as 年龄 from tb_student where gender=1 order by 年龄 asc;
		-- 女生全排前面 ，男生全排后面，并且学号从大到小可以加多个排序关键字
		select stuid,sname,gender from tb_student order by gender asc,stuid desc;
		-- 5个聚合函数(在所有数据库中都能用)：min/max/sum/avg/count
		--     空值不纳入计算
		-- 查询年龄最大的学生的出生日期(聚合函数)
		select min(birth) from tb_student;
		-- 查询年龄最小的学生的出生日期(聚合函数)
		select max(birth) from tb_student;
		-- 查询男女学生的人数(分组和聚合函数)
		select if(gender,'男','女') as 性别,count(stuid) as 人数 from tb_student group by gender;
		-- 查询课程编号为1111的课程的平均成绩(筛选和聚合函数)
		select avg(mark) from tb_score where cid=1111;
		-- 查询学号为1001的学生所有课程的平均分(筛选和聚合函数)
		select avg(mark) from tb_score where sid=1001;
		-- 查询每个学生的学号和平均成绩(分组和聚合函数)
		select sid as 学号,avg(mark) as 平均成绩 from tb_score group by sid;
		-- 查询平均成绩大于等于90分并且学号在1000到4000之间学生的学号和平均成绩
		-- 分组之前的筛选用where，分组之后的筛选用having
		select sid as 学号,avg(mark) as 平均成绩 from tb_score where sid between 1000 and 3999 group by sid having 平均成绩>=90 order by 平均成绩 desc;
		-- 查询年龄最大的学生的姓名(子查询/嵌套查询)
		-- select里面再嵌套一个select
		select sname as 姓名 from tb_student where birth=(select min(birth) from tb_student);
		-- 查询年龄最大的学生姓名和年龄(子查询+运算)
		select sname as 姓名,birth as 出身日期 from tb_student where birth=(select min(birth) from tb_student);
		-- 查询选了两门以上的课程的学生姓名(子查询/分组条件/集合运算)
		select sid from tb_score group by sid having count(sid)>=2;
		
		select sname as 姓名 from tb_student where stuid in(select sid from tb_score group by sid having count(sid)>2);
		-- 查询学生姓名、课程名称以及成绩(连接查询)
		select sname,cname,mark from tb_student,tb_course,tb_score where stuid=sid and couid=cid;
		-- 查询选课学生的姓名和平均成绩(子查询和连接查询)
            -- 方法一
			select sname as 姓名,avgmark as 平均分 from tb_student t1,
			(select sid,avg(mark) as avgmark from tb_score group by sid) t2
			where stuid=sid;
		
		
		    -- 方法二
			select sname as 姓名,avgmark as 平均分 from tb_student t1 inner join
			(select sid,avg(mark) as avgmark from tb_score group by sid) t2
			on stuid=sid;
		
		-- 查询每个学生的姓名和选课数量(左外连接和子查询):outer可以省略
		-- 在连接多表查询时写在前面的表称为左表，写在后面的表叫右表
		-- MySQL不支持全外连接：full outer join
		-- 左外连接(left outer join)：将左表不满足连表条件的记录也要查出来，不满足连表条件的地方补上空值null;
		-- 右外连接(right outer join)：将右表不满足连表条件的记录也要查出来，不满足连表条件的地方补上空值null;
		
		
		select sname as 姓名,ifnull(total,0) as 选课数量 from tb_student t1 left outer join 
		(select sid,count(sid) as total from tb_score group by sid) t2
		on stuid=sid;





## 作业：

		-- 创建人力资源管理系统数据库
		drop database if exists hrs;
		create database hrs default charset utf8;
		
		-- 切换数据库上下文环境
		use hrs;
		
		-- 删除表
		drop table if exists tb_emp;
		drop table if exists tb_dept;
		
		-- 创建部门表
		create table tb_dept
		(
		dno int comment '部门编号',
		dname varchar(10) not null comment '部门名称',
		dloc varchar(20) not null comment '部门所在地',
		primary key (dno)
		);
		
		-- 添加部门记录
		insert into tb_dept values 
			(10, '会计部', '北京'),
			(20, '研发部', '成都'),
			(30, '销售部', '重庆'),
			(40, '运维部', '深圳');
		
		-- 创建员工表
		create table tb_emp
		(
		eno int comment '员工编号',
		ename varchar(20) not null comment '员工姓名',
		job varchar(20) not null comment '员工职位',
		mgr int comment '主管编号',
		sal int not null comment '员工工资',
		comm int comment '每月补贴',
		dno int comment '所在部门编号',
		primary key (eno),
		foreign key (dno) references tb_dept (dno)
		);
		
		-- 添加员工记录
		insert into tb_emp values 
			(7800, '张三丰', '总裁', null, 9000, 1200, 20),
			(2056, '乔峰', '分析师', 7800, 5000, 1500, 20),
			(3088, '李莫愁', '设计师', 2056, 3500, 800, 20),
			(3211, '张无忌', '程序员', 2056, 3200, null, 20),
			(3233, '丘处机', '程序员', 2056, 3400, null, 20),
			(3251, '张翠山', '程序员', 2056, 4000, null, 20),
			(5566, '宋远桥', '会计师', 7800, 4000, 1000, 10),
			(5234, '郭靖', '出纳', 5566, 2000, null, 10),
			(3344, '黄蓉', '销售主管', 7800, 3000, 800, 30),
			(1359, '胡一刀', '销售员', 3344, 1800, 200, 30),
			(4466, '苗人凤', '销售员', 3344, 2500, null, 30),
			(3244, '欧阳锋', '程序员', 3088, 3200, null, 20),
			(3577, '杨过', '会计', 5566, 2200, null, 10),
			(3588, '朱九真', '会计', 5566, 2500, null, 10);
		
		-- 查询薪资最高的员工姓名和工资
		select ename as 姓名,sal as 工资 from tb_emp where
		sal=(select max(sal) from tb_emp);
		
		-- 查询员工的姓名和年薪((工资+补贴)*12)
		select ename as 姓名,(sal+ifnull(comm,0))*12 as 年薪 from tb_emp;
		
		-- 查询有员工的部门的编号和人数
		select dno as 部门编号,count(dno) as 人数 from tb_emp group by dno;
		
		-- 查询所有部门的名称和人数
		-- 当列有二义性时需要使用完全限定名
		           -- 不能查到没有人数的部门
		select dname as 部门名称,total as 人数 from tb_dept t1,
		(select dno,count(dno) as total from tb_emp group by dno) t2
		where t1.dno=t2.dno;
		           -- 加左外连接，可以查到部门人数为空的部门
		select dname as 部门名称,ifnull(total,0) as 人数 from tb_dept t1 
		left join
		(select dno,count(dno) as total from tb_emp group by dno) t2
		on t1.dno=t2.dno;
		
		
		-- 查询薪资最高的员工(Boss除外)的姓名和工资
		select ename as 姓名,sal as 工资 from tb_emp where sal=(select max(sal) from tb_emp where eno<>7800);
		
		
		select ename as 姓名,sal as 工资 from tb_emp where sal=(select max(sal) from tb_emp where mgr is not null);
		
		-- 查询薪水超过平均薪水的员工的姓名和工资
		select ename as 姓名,sal as 工资 from tb_emp where sal > (select avg(sal) from tb_emp);
		
		-- 查询薪水超过其所在部门平均薪水的员工的姓名、部门编号和工资
		
		select ename as 姓名,t1.dno as 部门编号,sal as 工资 from tb_emp t1 inner join
		(select dno as deptno,avg(sal) from tb_emp group by dno) t2
		on t1.dno=t2.dno where sal>avg(sal);
		
		-- 查询部门中薪水最高的人姓名、工资和所在部门名称
		
		select ename,sal,dname from tb_dept t3 inner join 
		(select ename,sal,t1.dno from tb_emp t1 inner join 
			(select dno,max(sal) as maxsal from tb_emp group by dno) t2 
			on t1.dno=t2.dno where sal=maxsal) t4
		on t3.dno=t4.dno;
		
		-- 查询主管的姓名和职位
		
		select ename as 姓名,job as 职位 from tb_emp where eno in (select distinct mgr from tb_emp where mgr is not null);
		
		    -- 集合运算和去重操作性能都非常糟糕应该尽量避免使用
			  -- 可以使用exists 和not exists 来代替集合运算和去重 (优化数据库的执行效率)
		select ename,job from tb_emp t1 where exists (select 'x' from tb_emp t2 where t1.eno=t2.mgr);
				
				
		-- 查询薪资排名4~6名的员工姓名和工资
		select ename as 姓名,sal as 工资 from tb_emp order by sal desc limit 3,3;
		
		select ename as 姓名,sal as 工资 from tb_emp order by sal desc limit 3 offset 3;









