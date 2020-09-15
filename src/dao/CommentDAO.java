package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import beans.Comment;

public class CommentDAO {

	private Map<Integer, Comment> comments = new HashMap<>();
	
	public CommentDAO() {
		
	}
	
	public CommentDAO(String contextPath) {
		loadComments(contextPath);
	}
	
	public void loadComments(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/data/comments.json");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringBuilder sb = new StringBuilder();
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			ObjectMapper mapper = new ObjectMapper();
			this.comments = mapper.readValue(sb.toString(),  new TypeReference<Map<Integer, Comment>>(){});
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
	
	public void saveComments(String contextPath) {
		BufferedWriter out = null;
		try {
			File file = new File(contextPath + "/data/comments.json");
			out = new BufferedWriter(new FileWriter(file));
			ObjectMapper mapper = new ObjectMapper();
			ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
			String content = writer.writeValueAsString(this.comments);
			out.write(content);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (Exception e) {}
		}
	}
	
	public Comment addComment(Comment comment) {
		return this.comments.put(comment.getId(), comment);
	}
	
	public Collection<Comment> findAllComments() {
		return this.comments.values();
	}
	
	public Comment findComment(Integer id) {
		return this.comments.get(id);
	}
	
	public Comment updateComment(Comment comment) {
		return this.comments.replace(comment.getId(), comment);
	}
}
