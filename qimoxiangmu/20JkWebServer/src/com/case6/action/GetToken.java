package com.case6.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections4.map.HashedMap;

import com.case6.pojo.BaseDataPojo;
import com.case6.util.QiniuUtil;
import com.google.gson.Gson;

@WebServlet("/GetToken")
public class GetToken extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置前后端交互参数的编码为utf-8		
		req.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		// 用PrintWriter对象返回数据
		PrintWriter out = resp.getWriter();	
		// 获取小程序端传过来的参数，key：用于图片命名的参数
		String key = req.getParameter("key");
		System.out.println("key=" + key);
		// 获取上传凭证
		String token = null;
		token = QiniuUtil.getToken(key);
		Map<String, String> map = new HashedMap<>();
		map.put("token", token);
		if(token != null){
			out.print(new Gson().toJson(new BaseDataPojo<Map<String, String>>
			("获取成功", true, map)));
		}else{
			out.print(new Gson().toJson(new BaseDataPojo<Map<String, String>>
			("获取失败", false, map)));
		}
	}
}
