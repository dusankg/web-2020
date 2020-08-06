package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import dao.UserDAO;

@Path("")
public class LoginService {

	@Context
	ServletContext ctx;
	
	public LoginService() {
		
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
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String login(User user, @Context HttpServletRequest request) {
		
		UserDAO userDAO = (UserDAO)ctx.getAttribute("users");
		User loggedUser = userDAO.findUser(user.getUsername());
		
		if(loggedUser == null) {
			return "User with that username doesn't exist!";
		} else if (!loggedUser.getPassword().equals(user.getPassword())){
			return "Password that you entered is incorrect!";
		}
		else {
			request.getSession().setAttribute("user", loggedUser);
			return loggedUser.getRole();
		}
	}
	
	@GET
	@Path("/logout")
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
}