package services;

import java.util.ArrayList;

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
import javax.ws.rs.core.Response;

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
		} else if (loggedUser.isBlocked()) {
			return "You are blocked! You don't have access to your account.";
		}
		else {
			request.getSession().setAttribute("user", loggedUser);
			return loggedUser.getRole();
		}
	}
	
	@GET
	@Path("/logout")
	public Response logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
		return Response.status(200).build();
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response registration(User user, @Context HttpServletRequest request) {
		
		System.out.println(user);
		// Dodavanje svih atributa da ne bi bili null
		user.setRole("Guest");
		user.setMyApartments(new ArrayList<Integer>());
		user.setRentedApartments(new ArrayList<Integer>());
		user.setReservationList(new ArrayList<Integer>());
		System.out.println(user);
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		
		// Ne mogu postojati 2 korisnika sa istim username
		if(userDAO.findUser(user.getUsername()) != null) {
			// Ovde bi verovatno trebalo vratiti nesto drugo, ali kako?
			return Response.status(400).build();
		}
		
		userDAO.addUser(user);
		
		String contextPath = ctx.getRealPath("");
		userDAO.saveUsers(contextPath);
		
		return Response.status(200).entity(user).build();
	}
	
	/**Vraca objekat ulogovanog korisnika.*/
	@GET
	@Path("/loggedIn")
	@Produces(MediaType.APPLICATION_JSON)
	public User getLoggedInUser(@Context HttpServletRequest request) {
		User loggedUser = (User) request.getSession().getAttribute("user");
	
		if(loggedUser == null) {
			return null;
		} else {
			return loggedUser;
		}
	}
}
