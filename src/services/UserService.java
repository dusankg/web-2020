package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Apartment;
import beans.Reservation;
import beans.User;
import dao.ApartmentDAO;
import dao.ReservationDAO;
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
		
		ApartmentDAO apartmentDAO = new ApartmentDAO(contextPath);
		if(ctx.getAttribute("apartments") == null) {
			ctx.setAttribute("apartments", apartmentDAO);
		}
		
		ReservationDAO reservationDAO = new ReservationDAO(contextPath);
		if(ctx.getAttribute("reservations") == null) {
			ctx.setAttribute("reservations", reservationDAO);
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
	
	// Dodavanje Domacina od strane admina
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User addHost(User user) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		
		user.setRole("Host");
		user.setMyApartments(new ArrayList<Integer>());
		user.setRentedApartments(new ArrayList<Integer>());
		user.setReservationList(new ArrayList<Integer>());
		
		if (userDAO.findUser(user.getUsername()) != null) {
			return user;
		}
		
		userDAO.addUser(user);
		String contextPath = ctx.getRealPath("");
		userDAO.saveUsers(contextPath);
		
		return user;
	}
	
	// Pregled svih korisnika koji su izvrsili rezervaciju za moje apartmane
	@GET
	@Path("/reservations-for-me")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsersWithReservations(@Context HttpServletRequest request) {
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		User loggedUser = (User) request.getSession().getAttribute("user");
		
		List<User> usersToShow = new ArrayList<>();
		
		for (Integer idApartment : loggedUser.getMyApartments()) {
			Apartment a = apartmentDAO.findApartment(idApartment);	
			for (Integer idReservation : a.getReservations()) {
				Reservation r = reservationDAO.findReservation(idReservation);
				usersToShow.add(userDAO.findUser(r.getGuest()));
			}
		}
		
		return usersToShow;
		
	}
	
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
