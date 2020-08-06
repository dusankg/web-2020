package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.User;

public class UserDAO {

	private Map<String, User> usersMap = new HashMap<>();
	
	public UserDAO() {
		
	}
	
	public UserDAO(String contextPath) {
		loadUsers(contextPath);
	}
	
	public void loadUsers(String path) {
		BufferedReader in = null;
		try {
			File file = new File(path + "/data/users.json");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringBuilder sb = new StringBuilder();
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			//System.out.println(sb.toString());
			ObjectMapper mapper = new ObjectMapper();
			List<User> users = mapper.readValue(sb.toString(), new TypeReference<List<User>>(){});
			for (User user : users) {
				this.usersMap.put(user.getUsername(), user);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {}
			}
		}
	}
	
	public User findUser (String username) {
		return usersMap.containsKey(username) ? usersMap.get(username) : null;
	}
	
}
