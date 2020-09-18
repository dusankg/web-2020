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
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.Reservation;
import beans.User;
import dao.ApartmentDAO;
import dao.ReservationDAO;
import dao.UserDAO;
import filters.UserFilter;

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
	public Response viewUser(@PathParam("username") String username) {
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		User requestedUser = userDAO.findUser(username);
		
		if(requestedUser == null) {
			return Response.status(400).build();
		}
		
		return Response.status(200).entity(requestedUser).build();
		
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
	public Response addHost(User user) {
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		
		user.setRole("Host");
		user.setMyApartments(new ArrayList<Integer>());
		user.setRentedApartments(new ArrayList<Integer>());
		user.setReservationList(new ArrayList<Integer>());
		user.setBlocked(false);
		
		if (userDAO.findUser(user.getUsername()) != null) {
			return Response.status(400).build();
		}
		
		userDAO.addUser(user);
		String contextPath = ctx.getRealPath("");
		userDAO.saveUsers(contextPath);
		
		return Response.status(200).entity(user).build();
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
	
	@PUT
	@Path("/block/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response blockUser(@PathParam("username") String username, @Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if (!loggedUser.getRole().equals("Admin")) {
			return Response.status(403).build();
		}
		
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		User userToBlock = userDAO.findUser(username);
		
		// Ne mogu se admini blokirati
		if(userToBlock.getRole().equals("Admin"))
			return Response.status(400).build();
		
		userToBlock.setBlocked(true);
		userDAO.updateUser(userToBlock);
		String contextPath = ctx.getRealPath("");
		userDAO.saveUsers(contextPath);
		
		return Response.status(200).entity(userToBlock).build();
		
	}

	// Pretraga korisnika
	@POST
	@Path("/search")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response seachUsers(UserFilter filter, @Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!(loggedUser.getRole().equals("Admin") || loggedUser.getRole().equals("Host")))
			return Response.status(403).build();
			
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		Collection<User> users = userDAO.findAllUsers();
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		List<User> filteredUsers = new ArrayList<>();
		
		for (User u : users) {
			if(filter.getRole() != null) {
				if(!filter.getRole().equals(u.getRole()))
					continue;
			}
			if(filter.getGender() != null) {
				if(filter.getGender() != u.isGender())
					continue;
			} 
			if(filter.getUsername() != null) {
				if(!filter.getUsername().equals(u.getUsername()))
					continue;
			}
			/*
			 * if(loggedUser.getRole().equals("Host")) { List<Integer> reservations =
			 * u.getReservationList(); for (Integer i : reservations) { Reservation
			 * reservation = reservationDAO.findReservation(i);
			 * if(reservation.getGuest().equals(u.getUsername()))
			 * 
			 * } }
			 */
			filteredUsers.add(u);
		}
		
		return Response.status(200).entity(filteredUsers).build();
	}
}
