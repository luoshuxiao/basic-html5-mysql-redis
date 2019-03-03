#一.redis：非关系型数据库，kv存储系统（REmote Dictinoary server）
**提高高速缓存服务 -- 缓存热点数据（访问量大，数据量不大），缓解了数据库的压力（高频访问数据不用直接访问数据库）**

##a.在linux服务器安装redis:
        在linux系统中输入以下命令：
		    在官网下载redis的安装包
		wget http://download.redis.io/releases/redis-5.0.3.tar.gz
		    解压文件
		gunzip redis-5.0.0.tat.gz
		    解归档文件
		tar -xvf redis-5.0.3.tar
		进入redis文件
		cd redis-5.0.3
		    查看是否安装有gun编译器套件
		gcc --version 
		    编译并且安装
		make && make install
##b.redis基本操作：
**redis的客户端、服务器和哨兵等快捷方式默认放在/usr/local/bin文件夹下**

		redis提供了两种数据持久化的方案：
		1.RDB -- 默认开启
		2.AOF -- （每两秒保存一次）--默认关闭状态--appendonly yes (打开AOF)

    redis-benchmark -a 密码：查看服务器每秒钟能刚处理多好个redis命令
	redis-server --requirepass 123123 --appendonly yes > redis.log 2> redis-error.log & :启动redis服务器，密码设为123123，启动后加载文档放在redis.log,错误信息文档放在error.log, &符号表示启动后自动在后台运行
	redis-cli : 启动redis客户端并且连接自己
	redis-cli -h ip地址 -p 端口号：连接服务器
	auth 密码 : 验证身份
	ping -- 心跳事件（检查是否脸上服务器）
	set -- 设置键值对
	get -- 获取值
	expire -- 设置超时时间
	del -- 删除键
	keys -- 查看键
	exists -- 判断键是否存在
	
	
	
	flushdb -- 清除当前数据库中的键值对
	flushall -- 清除所有数据库中的所有键值对
	dbsize 数据库编号-- 查看当前数据库的存储键值对的个数
	
	select 数据库编号-- 切换至指定的数据库
	shutdown -- 关闭数据库服务器
	save -- 保存数据
	bgsave -- 后台去保存数据（不会占用当前线程，影响当前控制台）
    


#二.redis五种常用value类型：
##a.字符串--String:value值类型是字符串
    append myphone 'nookia' : 如果myphone已经存在数据库中，就把值添加在那个值后面，不存在就创建并赋值
    incr tt: 如果tt存在，将它的值加1，如果不存在就创建，值为1
    incrby num 100 : 如果num是int类型，就给它的值加100，不是就报错
    decr
    decrby
    incrbyfloat key 0.1 : 增加浮点数（小数）
    getrange key 0 8 :获取key的值中下标0到8的值
    set 
	mset
	mget
    get
    getset key value:将key的值改为value，返回出旧值

##b.哈希表--Hash：value值类型是对象（字典）

	hset dict1 key1 value1 key2 value2 : 在redis数据库中存储dict={'key1':'value1','key2':'value2'}
	
		 域存在
		redis> hset dict1 key1 value1 key2 value2
		(integer) 1
		redis> hget dict1 key1
		"value1"
	
		 域不存在
		redis> hget dict1 mysql
		(nil) 

				hset
				hget
				hkeys
				hvals
				hmset
				hmget
				hexists
				hincrby
				hincrbyfloat


##c.列表--list
		lpush list1 100 200 300 400 : 从左边依次放入元素：list1=[400,300,200,100]

		rpush list2 100 200 300 400 : 从右边依次放入元素：list2=[100,200,300,400]

		lrange list1 0 3 : 获取list1下标从0到3的元素

		rpop list1: 从右边取list1元素

		lpop ： 从左边取元素

		brpop list1 60 : list1中有元素直接获取，60s内还是没有，就返回空
		blpop
		lindex list1 3 : 取出list1中下标为3的元素

		
		redis的list类型可以实现两种经典的数据存储结构：
		栈（stack） -- FILO -- 先进后出 -- lpush +lpop / rpush + rpop
		队列（queue） -- FIFO -- 先进先出 -- lpush +rpop / rpush + lpop
		
		函数直接或者间接的调用自己：函数的递归调用 （底层用到了栈结构）
 
##d.集合--set

		sadd set1 100 : 将100添加到set1中 

		smembers set1 : 查看set1中所有元素

		sinter set1 set2 : 求set1和set2的交集

		sunion set1 set2 : 求set1和set2的并集

		sdiff set1 set2 : 求set1和set2的差集 

		srem set1 100 : 去除集合中的100

		sismember set1 100 : 判断集合中是否存在100

		scard set1 : 查看集合中有多少个元素

		spop set1: 移出并返回集合set1中的一个随机元素

		srandmember set1： 获取set1中一个随机元素，但不移出该元素

		smove set1 set2 value : 将value从set1中移动到set2中
##e有序集合：sortedset

   zadd / zcard / zcount / zincrby / zrange / zrem / zscore
#三.主从复制，读写分离（master -- salve）
  
##一台服务器做master，可以读写修改等所有操作；一台服务器做slave，只能访问master数据库，读取数据






####redis缓存数据，mysql保存数据，
 
       联动型数据用mysql建表

			"""
			序列化 - 把对象转换成字符或字节序列 - 串行化/腌咸菜
			反序列化 - 把字符或者字节序列还原成对象 - 反串行化
			Python中要实现对象的序列化和反序列有3种方案：
			- json - load / loads / dump / dumps - 字符序列
			- pickle - load / loads / dump / dumps - 字节序列
			"""
			import pickle
			import time
			
			import pymysql
			import redis
			
			
			class District(object):
			    """行政区域"""
			
			    def __init__(self, distid, name):
			        self.distid = distid
			        self.name = name
			
			    def __str__(self):
			        return self.name
			
			    def __repr__(self):
			        return self.name
			
			
			def main():
			    begin = time.time()
			    cli = redis.StrictRedis(host='120.78.202.21',
			                            port=6379,
			                            password='123123')
			    # 优先从缓存中读取数据 如果缓存没有命中 才连接数据库进行查询
			    if cli.exists('provinces'):
			        # 直接从缓存中通过键获取数据并反序列化成Python中的对象
			        provinces = pickle.loads(cli.get('provinces'))
			    else:
			        provinces = []
			        con = pymysql.connect(host='120.78.202.21', port=3306,
			                              database='hrs', charset='utf8',
			                              user='root', password='123456')
			        try:
			            with con.cursor() as cursor:
			                # 查询省级行政区域
			                cursor.execute(
			                    'select `distid`, `name` from `tb_district` where `pid` is null')
			                # 将查询结果放入列表容器
			                for dist_tuple in cursor.fetchall():
			                    dist = District(*dist_tuple)
			                    provinces.append(dist)
			                # 将列表序列化(pickle)然后放入Redis中缓存
			                cli.set('provinces', pickle.dumps(provinces))
			        finally:
			            con.close()
			    end = time.time()
			    print(f'执行时间: {end - begin}秒')
			    print(provinces)
			
			
			if __name__ == '__main__':
			    main()


####互亿无线发送短信代码：


		import io
		import json
		import logging
		import random
		
		from http.client import HTTPConnection
		from urllib.error import URLError
		from urllib.parse import urlencode
		from redis import StrictRedis
		
		def gen_code(length=8):
		    result = io.StringIO()
		    for _ in range(length):
		        result.write(str(random.randint(0, 9)))
		    return result.getvalue()
		
		SMS_SERVER = '106.ihuyi.com'
		SMS_URL = '/webservice/sms.php?method=Submit'
		SMS_ACCOUNT = 'C10419651'
		SMS_PASSWORD = 'a3ecaed032868ea37e612082566cc6ac'
		MSG_TEMPLATE = '您的验证码是：%s。请不要把验证码泄露给其他人。'
		def send_short_message(tel, code):
		    """发送短信验证码（互亿无线）"""
		    params = urlencode({
		        'account': SMS_ACCOUNT,
		        'password': SMS_PASSWORD,
		        'content': MSG_TEMPLATE % code,
		        'mobile': tel,
		        'format': 'json'
		    })
		    headers = {
		        'Content-Type': 'application/x-www-form-urlencoded',
		        'Accept': 'text/plain'
		    }
		    conn = HTTPConnection(SMS_SERVER, port=80, timeout=10)
		    try:
		        conn.request('POST', SMS_URL, params, headers)
		        json_str = conn.getresponse().read().decode('utf-8')
		        return json.loads(json_str)
		    except URLError or KeyError as e:
		        logging.error(e)
		        return json.dumps({
		            'code': 500,
		            'msg': '短信服务暂时无法使用'
		        })
		    finally:
		        conn.close()
		def main():
		    tel = input('请输入手机号：')
		    cli = StrictRedis(host='120.78.202.21',
		                      port=6379,
		                      password='123123')
		    mass = gen_code()
		    if not cli.exists(tel):
		        result = send_short_message(tel, mass)
		        print(result)
		        if result['code'] == 2:
		            print(result)
		            cli.set(tel, 1, ex=3600)
		    elif int(cli.get(tel)) < 3:
		        result = send_short_message(tel, mass)
		        if result['code'] == 2:
		            print(result)
		            cli.set(tel, 1, ex=3600)
		        cli.incr(tel)
		    else:
		        print('请不要一直发，一小时三次，oj8k?')
		if __name__ == '__main__':
		        main()

####做短信业务的平台： 

  又拍云、luosimao、云片短信、SendCloud、互亿无线
