package com.case6.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.case6.pojo.BaseDataPojo;
import com.google.gson.Gson;

@WebServlet("/UploadFile")
public class UploadFile extends HttpServlet {
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
				// 设置文件需要上传的本地路径，放在根目录下的"upload"目录中，
				// 注意是服务器的项目根目录
				String path = req.getSession().getServletContext()
						.getRealPath("/upload") + "/";
				// 新建path文件夹
				File dir = new File(path);
				if (!dir.exists()) {
					dir.mkdir();
				}
				// 获取磁盘文件条目工厂
				DiskFileItemFactory factory = new DiskFileItemFactory();
				// 设置暂时存放的存储室，存储室可以和最终存储文件目录不同。
				// 设置暂存室的目的是为了防止大文件的读写占用过多内存，
				// 类似于一个更大容量的缓存
				factory.setRepository(dir);
				// 设置缓存区，当文件的容量超过该缓存时，就放到暂时存储室
				factory.setSizeThreshold(1024 * 1024);
				// 文件上传处理
				ServletFileUpload upload = new ServletFileUpload(factory);
				String fileName = null;
				try {
					// list中有两个对象，一个对象是文本信息，一个对象是文件信息
					List<FileItem> list = upload.parseRequest(req);
					System.out.println(new Gson().toJson(list));
					FileItem picture = null; // 定义文件对象
					for (FileItem item : list) {
						// 获取表单的属性名字
						String name = item.getFieldName();
						// 如果获取的表单信息时普通文本信息
						if (item.isFormField()) {
							// 获取用户在小程序端请求的formData中设置的value
							String value = item.getString();
							req.setAttribute(name, value);
						} else {
							picture = item;
						}
					}

					// 自定义上传图片的文件名，使用小程序端传过来的formData参数命名，如果是文字识别不需要传此参数
					fileName = (String) req.getAttribute("fileName");
					// 设置文件写入的完整路径
					String destPath = path + fileName;

					// 将文件写入磁盘
					File file = new File(destPath);
					OutputStream outs = new FileOutputStream(file);	// 定义输出流写入
					InputStream ins = picture.getInputStream();		// 定义输入流读取文件
					int length = 0;
					byte[] buf = new byte[1024];
					while ((length = ins.read(buf)) != -1) {	// 开始读取
						outs.write(buf, 0, length);		// 写入
					}
					ins.close();
					outs.close();
				} catch (FileUploadException e) {
					e.printStackTrace();
					out.print(new Gson().toJson(new BaseDataPojo
							<Map<String, String>>("上传失败", false, null)));
				}
				// 上传成功，封装返回响应数据
				Map<String, String> map = new HashedMap<>();
				// 拼接图片url地址，并返回给小程序端
				String url = "http://127.0.0.1:8080/19JkCourseWeb/upload/" 
						+ fileName;
				map.put("imgUrl", url);
				out.print(new Gson().toJson(new BaseDataPojo<Map<String, 
						String>>("上传成功", true, map)));
	}
}
