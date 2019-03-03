#一.MySQL用户管理：
###a.选中需要添加用户或者管理权限的数据库
    use srs;
###b.创建hellokitty用户名和123456密码(%表示在任意ip登录)
     create user hellokitty@'%' identified by '123456';
###c.给hellokitty用户开通select权限
     grant select on hrs.* to hellokitty@'%';
###d.给hellokitty开通insert权限
     grant insert on hrs.* to hellokitty@'%';
###f.给hellokitty开通所有权限，grant ption 代表hellokitty可以将自己的权限给别的用户开通（仅仅限他自己拥有的权利）
    grant all privileges on *.* to hellkitty@'%' with grant option;
###g.收回所有权利
    revoke all privileges on *.* from hellokitty@'%';
###h.删除用户
     drop user hellokitty@'%';

#二.原子性操作（事务） --  解决数据一致性问题
**多个数据操作要么全都成功，要么全都失败（不可分割）**
##开启一个事务环境(两种方法)：
     start transaction;
     begin;
##提交事务
     commit;
##回滚事务
     rollback;
#三.python中操作mysql
##insert :插入语句

	import pymysql
	def main():
	    no = int(input('请输入部门编号：'))
	    name = input('请输入名字：')
	    loc = input('请输入所在地：')
	    #1. 创建数据库连接对象
	    con = pymysql.connect(host='120.78.202.21', port=3306,database='hrs',
	                          charset='utf8', user='root', password='123456') # autocommit = on/off  自动提交功能的开启和关闭
	    try:
	        #2. 通过连接对象拿到游标
	        with con.cursor() as cursor:
	            #3. 通过游标执行SQL并获得执行结果
	            result = cursor.execute(
	                # %s ：安全占位符（security）
	                'insert into tb_dept values (%s,%s,%s)',
	                (no, name, loc)
	            )
	        if result == 1:
	            #4. 提交事务
	            con.commit()
	            print("添加成功！")
	    except:
	        #4. 操作失败回滚事务
	        con.rollback()
	    finally:
	        # 5. 无论成功还是失败，关闭连接
	        con.close()
	    print(con)
	if __name__ == '__main__':
	    main()
##delete ：删除语句

	import pymysql
	def main():
	    no = int(input('请输入部门编号：'))
	    #1. 创建数据库连接对象
	    con = pymysql.connect(host='120.78.202.21',port=3306,database='hrs',
	                          charset='utf8',user='root',password='123456') # autocommit = Ture/Flase  自动提交功能的开启和关闭
	    try:
	        #2. 通过连接对象拿到游标
	             #with ：在离开这个代码段后，自动释放游标
	        with con.cursor() as cursor:
	            #3. 通过游标执行SQL并获得执行结果
	            result = cursor.execute(
	                # %s ：安全占位符（security）
	                'delete from tb_dept where dno=%s',
	                (no, )
	            )
	        if result == 1:
	            #4. 提交事务
	            con.commit()
	            print("删除成功！")
	    except:
	        #4. 操作失败回滚事务
	        con.rollback()
	    finally:
	        # 5. 无论成功还是失败，关闭连接
	        con.close()
	if __name__ == '__main__':
	    main()
##update ：更新语句 

	"""
	更新数据库数据
	"""
	import pymysql
	def main():
	    """主函数：程序入口"""
	    dept_no = int(input('请输入部门编号：'))
	    name = input('请输入名字：')
	    loc = input('请输入所在地：')
	    #1. 创建数据库连接对象
	    con = pymysql.connect(host='120.78.202.21', port=3306, database='hrs',
	                          charset='utf8', user='root', password='123456')# autocommit = on/off  自动提交功能的开启和关闭
	    try:
	        #2. 通过连接对象拿到游标
	        with con.cursor() as cursor:
	            #3. 通过游标执行SQL并获得执行结果
	            result = cursor.execute(
	                # %s ：安全占位符（security）
	                'update tb_dept set dname=%s, dloc=%s where dno=%s',
	                (name, loc, dept_no,)
	            )
	        if result == 1:
	            #4. 提交事务
	            con.commit()
	            print("更新成功！")
	    except:
	        #4. 操作失败回滚事务
	        con.rollback()
	    finally:
	        # 5. 无论成功还是失败，关闭连接
	        con.close()
	if __name__ == '__main__':
	    main()
##select :查询语句

	"""
	导入pymysql模块
	"""
	import pymysql
	from pymysql.cursors import DictCursor
	def main():
	    """主函数：程序入口"""
	    #1. 创建数据库连接对象
	    con = pymysql.connect(host='120.78.202.21', port=3306,
	                          database='hrs', charset='utf8',
	                          user='root', password='123456')
	                          # autocommit = on/off  自动提交功能的开启和关闭
	    try:
	        #2. 通过连接对象拿到游标
	        with con.cursor(cursor=DictCursor) as cursor:
	            #3. 通过游标执行SQL并获得执行结果
	            cursor.execute('select dno as no, dname as name, dloc as loc from tb_dept')
	            print('编号\t名称\t所在地')
	            for dept in cursor.fetchall():
	                print(dept['no'], end='\t')
	                print(dept['name'], end='\t')
	                print(dept['loc'])
	    except:
	         #4. 操作失败回滚事务
	         con.rollback()
	    finally:
	        # 5. 无论成功还是失败，关闭连接
	        con.close()
	if __name__ == '__main__':
	    main()

方法二：

	"""
	导入pymysql模块
	"""
	import pymysql
	from pymysql.cursors import DictCursor
	
	class Dept():
	    def __init__(self, no, name, loc):
	        self.no = no
	        self.name = name
	        self.loc = loc
	    def __str__(self):
	        return f'{self.no}\t{self.name}\t{self.loc}'
	
	def main():
	    """主函数：程序入口"""
	    #1. 创建数据库连接对象
	    con = pymysql.connect(host='120.78.202.21', port=3306,
	                          database='hrs', charset='utf8',
	                          user='root', password='123456')
	                          # autocommit = on/off  自动提交功能的开启和关闭
	    try:
	        #2. 通过连接对象拿到游标
	        with con.cursor(cursor=DictCursor) as cursor:
	            #3. 通过游标执行SQL并获得执行结果
	            cursor.execute('select dno as no, dname as name, dloc as loc from tb_dept')
	            print('编号\t名称\t所在地')
	            for result in cursor.fetchall():
	                dept=Dept(**result)
	                print(dept)
	    except:
	        #4. 操作失败回滚事务
	        con.rollback()
	    finally:
	        # 5. 无论成功还是失败，关闭连接
	        con.close()
	if __name__ == '__main__':
	    main()

三：

		import pymysql
		class Emp():
		    def __init__(self, no, name, job, sal):
		        self.no = no
		        self.name = name
		        self.job = job
		        self.sal = sal
		    def __str__(self):
		        return f'{self.no}-{self.name}-{self.job}-{self.sal}'
		def main():
		    page = int(input('页码：'))
		    size = int(input('页面大小：'))
		    con = pymysql.connect(host='localhost', port=3306,
		                          db='hrs', charset='utf8',
		                          user='root', passwd='123456',
		                          autocommit=True)
		    print(con)
		    try:
		        with con.cursor() as cursor:
		            cursor.execute('select eno as no, ename as name, job, sal from tb_emp limit %s, %s',
		                           ((page-1)* size, size))
		            for result in cursor.fetchall():
		                emp = Emp(*result)
		                print(emp)
		    except:
		        con.rollback()
		    finally:
		        con.close()
		if __name__ == '__main__':
		    main()