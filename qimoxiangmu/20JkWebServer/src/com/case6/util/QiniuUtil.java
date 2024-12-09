package com.case6.util;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.model.BatchStatus;
import com.qiniu.util.Auth;

public class QiniuUtil {

	// 在七牛注册后获得的accessKey和secretKey（改为自己的）
	private static String accessKey = "07tZaO9JgrHwd-WVojdO-Z1wnFglnyyB0BDI71Q7";
	private static String secretKey = "iVADwS8b8WRR-xCtm-XoBw_iri8cVoZCBsWfKQnw";
	private static String bucket = "yyxhcyr";

	public static void main(String[] args) {
		String token = getToken("test.jpg");
		System.out.println(token);
	}

	// 获取覆盖同名文件的上传凭证
	public static String getToken(String key) {
		Auth auth = Auth.create(accessKey, secretKey);
		String upToken = auth.uploadToken(bucket, key, 36000000, null, true); // 生成覆盖相同key文件的上传Token
		return upToken;
	}

	// 获取普通上传凭证
	public static String getUploadToken() {
		Auth auth = Auth.create(accessKey, secretKey);
		String upToken = auth.uploadToken(bucket, null, 36000000, null, true); 
		return upToken;
	}

	// 删除七牛中指定key的文件
	public static boolean delFile(String key) {
		// 构造一个带指定Zone对象的配置类
		Configuration cfg = new Configuration(Zone.zone0());
		Auth auth = Auth.create(accessKey, secretKey);
		BucketManager bucketManager = new BucketManager(auth, cfg);
		try {
			bucketManager.delete(bucket, key);
			return true;
		} catch (QiniuException ex) {
			// 如果遇到异常，说明删除失败
			System.err.println(ex.code());
			System.err.println(ex.response.toString());
			return false;
		}
	}

	// 批量删除七牛文件
	public static boolean delFileList(String[] keyList) {
		Configuration cfg = new Configuration(Zone.zone0());
		Auth auth = Auth.create(accessKey, secretKey);
		BucketManager bucketManager = new BucketManager(auth, cfg);
		try {
		    BucketManager.BatchOperations batchOperations = new BucketManager.BatchOperations();
		    batchOperations.addDeleteOp(bucket, keyList);
		    Response response = bucketManager.batch(batchOperations);
		    BatchStatus[] batchStatusList = response.jsonToObject(BatchStatus[].class);
		    for (int i = 0; i < keyList.length; i++) {
		        BatchStatus status = batchStatusList[i];
		        String key = keyList[i];
		        System.out.print(key + "\t");
		        if (status.code == 200) {
		            System.out.println("delete success");
		        } else {
		            System.out.println(status.data.error);
		        }
		    }
		    return true;
		} catch (QiniuException ex) {
		    System.err.println(ex.response.toString());
		    return false;
		}
	}
}
