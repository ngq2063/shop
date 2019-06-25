package com.pyg.fastdfs;

import org.csource.fastdfs.ClientGlobal;
import org.csource.fastdfs.StorageClient;
import org.csource.fastdfs.StorageServer;
import org.csource.fastdfs.TrackerClient;
import org.csource.fastdfs.TrackerServer;
import org.junit.Test;

public class MyFastDfs {

	
	@Test
	public  void test() throws Exception{
		String path="D:\\培训学习\\eclipse2\\pyg-shop-web\\src\\main\\resources\\config\\client.conf";
		String path2="D:\\1.jpg";
		//读取配置文件，链接远程服务器
		ClientGlobal.init(path);
		
		//创建tracker服务客户端对象
					TrackerClient tc = new TrackerClient();
					//从客户端对象中获取tracker服务对象
					TrackerServer trackerServer = tc.getConnection();
					
					StorageServer storageServer=null;
					//创建storage客户端服务对象
					StorageClient sc = new StorageClient(trackerServer, storageServer);
					
					//直接上传图片
					String[] urls = sc.upload_file(path2, "jpg", null);
					
					//打印
					for (String url : urls) {
						System.out.println(url);
						
					}
	}

}
