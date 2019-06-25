package com.pyg.shop.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pyg.utils.FastDFSClient;
import com.pyg.utils.PygResult;

@RestController
@RequestMapping("/shop")
public class FileupLoad {
	
	//注入常量
	@Value("${IMAGE_SERVER}")
	private String IMAGE_SERVER;
	
	
	@RequestMapping("/upload")
	public PygResult uploadPic(MultipartFile file){
		try {
			
			//获取图片的扩展名
		String name = file.getOriginalFilename();
		String exam=name.substring(name.lastIndexOf('.')+1);
			//创建文件上传的工具类对象	
			FastDFSClient fdfs=new FastDFSClient("classpath:config/client.conf");
			
			//文件上传成功地址，是一个相对地址
			String url=fdfs.uploadFile(file.getBytes(),exam);
			
			//组合文件的绝对路径
			url=IMAGE_SERVER+url;
			return new PygResult(true,url);
		} catch (Exception e) {
          e.printStackTrace();
          return new PygResult(false, "上传失败");
		}
		
	}
	
	

}
