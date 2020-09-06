package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import dao.UserDAO;

@Path("user")
public class UserService {
	
	@Context 
	ServletContext ctx;
	
	public UserService(){
		
	}
	
	@PostConstruct
	public void init() {
		String contextPath = ctx.getRealPath("");
		System.out.println(contextPath);
		
		UserDAO userDAO = new UserDAO(contextPath);
		
		if(ctx.getAttribute("users") == null) {
			ctx.setAttribute("users", userDAO);
		}
	}
	
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User viewUser(@PathParam("username") String username) {
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		User requestedUser = userDAO.findUser(username);
		
		if(requestedUser == null) {
			return null;
		}
		
		return requestedUser;
		
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllUsers(){
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		
		return userDAO.findAllUsers();
		
	}
	
	// TODO: Dodati pregled svih korisnika koji su izvrsili rezervaciju za moje apartmane
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User updateUser(User user, @Context HttpServletRequest request) {
		
		UserDAO userDAO = (UserDAO)ctx.getAttribute("users");
		User userForUpdate = userDAO.findUser(user.getUsername());
		
		userForUpdate.setPassword(user.getPassword());
		userForUpdate.setFirstName(user.getFirstName());
		userForUpdate.setLastName(user.getLastName());
		userForUpdate.setGender(user.isGender());
		
		userDAO.updateUser(userForUpdate);
		
		String contextPath = ctx.getRealPath("");
		userDAO.saveUsers(contextPath);
		
		return userForUpdate;
	}
	
}