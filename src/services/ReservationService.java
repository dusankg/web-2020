package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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

@Path("reservation")
public class ReservationService {

	@Context
	ServletContext ctx;
	
	private String contextPath;
	
	public ReservationService() {
		
	}
	
	@PostConstruct
	public void init() {
		this.contextPath = ctx.getRealPath("");		
		
		ReservationDAO reservationDAO = new ReservationDAO(contextPath);
		if(ctx.getAttribute("reservations") == null)
			ctx.setAttribute("reservations", reservationDAO);
		
		ApartmentDAO apartmentDAO = new ApartmentDAO(contextPath);
		if(ctx.getAttribute("apartments") == null)
			ctx.setAttribute("apartments", apartmentDAO);

		
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation getReservation(@PathParam("id") Integer id) {
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		Reservation reservation = reservationDAO.findReservation(id);
		
		if(reservation == null) {
			return null;
		} else {
			return reservation;
		}
		
	}
	
	// Pregled rezervacija za goste
	@GET
	@Path("/my")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyReservations(@Context HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Guest"))
			return Response.status(403).build(); // forbidden
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		Collection<Reservation> reservations = reservationDAO.findAllReservations();
		
		List<Reservation> myReservations = new ArrayList<>();
		for (Reservation reservation : reservations) {
			if(reservation.getGuest().equals(user.getUsername()))
				myReservations.add(reservation);
		}
		
		return Response.status(200).entity(myReservations).build();
		
	}

	// Odustanak od rezervacije
	@PUT
	@Path("/withdraw")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation withdrawReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		if(reservation.getStatus().equals("Created") || reservation.getStatus().equals("Accepted")) {
			reservation.setStatus("Canceled");
			reservationDAO.updateReservation(reservation);
		}
		
		return reservation;
	}
	
	
	// Pregled rezervacija za domacine
	@GET
	@Path("/received")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReceived(@Context HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host"))
			return Response.status(403).build(); // forbidden
		
		List<Integer> myApartments = user.getMyApartments();
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations"); 
		
		List<Reservation> receivedReservations = new ArrayList<>();
		
		for (Integer idApartment : myApartments) {
			Apartment apartment = apartmentDAO.findApartment(idApartment);
			if(apartment.getReservations() == null) {
				continue;
			}
			for (Integer reservationId : apartment.getReservations()) {
				Reservation reservation = reservationDAO.findReservation(reservationId);
				receivedReservations.add(reservation);
			}
		}
		
		return Response.status(200).entity(receivedReservations).build();
		
	}
	
	// Prihvatanje rezervacije od strane domacina
	@PUT
	@Path("/accept")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host")) 
			return Response.status(403).build(); // forbidden
		
		if (reservation.getStatus().equals("Created")) {
			System.out.println("USAO U KLOZET");
			reservation.setStatus("Accepted");
			Reservation retReservation = reservationDAO.updateReservation(reservation);
			reservationDAO.saveReservations(this.contextPath);
			
			// Dodavanje apartmana u spisak iznajmljenih apartmana gosta NISAM BAS SIGURAN GDE BI TREBALO OVO DODAVATI
			Apartment rentedApartment = apartmentDAO.findApartment(reservation.getApartment());
			User guest = userDAO.findUser(reservation.getGuest());
			guest.getRentedApartments().add(rentedApartment.getId());
			userDAO.saveUsers(contextPath);
			
			// Ovde bismo mogli i azurirati slobodne datume
			
			//reservation.getStartDate()
			
			return Response.status(200).entity(retReservation).build();
		} else {
			return Response.status(400).build(); //404
		}
		
	}

	// Odbijanje rezervacije od strane domacina
	@PUT
	@Path("/reject")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response rejectReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host")) 
			return Response.status(403).build(); // forbidden
		
		if (reservation.getStatus().equals("Created") || reservation.getStatus().equals("Accepted")) {
			reservation.setStatus("Rejected");
			Reservation retReservation = reservationDAO.updateReservation(reservation);
			reservationDAO.saveReservations(this.contextPath);
			
			return Response.status(200).entity(retReservation).build();
		} else {
			return Response.status(400).build(); //404
		}
		
	}

	// Postavljanje rezervacije u status ZAVRSENA od strane domacina
	@PUT
	@Path("/finish")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response finishReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host")) 
			return Response.status(403).build(); // forbidden
		
		// Racunanje datuma zavrsetka rezervacije
		Date endDate = new Date(reservation.getStartDate().getTime() + reservation.getNumberOfNights()*(24*60*60*1000));
		
		// new Date() pravi novi objekat cija je vrednost trenutni datum i vreme
		if (endDate.before(new Date())) {
			reservation.setStatus("Finished");
			Reservation retReservation = reservationDAO.updateReservation(reservation);
			reservationDAO.saveReservations(this.contextPath);
			return Response.status(200).entity(retReservation).build();
		} else {
			return Response.status(400).build(); //404
		}
		
	}
	
	// Pregled rezervacija za admine
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllReservations(@Context HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Admin"))
			return Response.status(403).build(); // forbidden
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		Collection<Reservation> reservations = reservationDAO.findAllReservations();
		
		List<Reservation> reservationsList = new ArrayList<>();
		for (Reservation reservation : reservations) {
			reservationsList.add(reservation);
		}
		
		return Response.status(200).entity(reservationsList).build();
		
	}
	
	// Pravljenje nove rezervacije
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if (!loggedUser.getRole().equals("Guest")) {
			return Response.status(403).build(); // forbidden
		}
		
		// Dodavanje id-ja rezervaciji
		Integer maxId = 1;
		Collection<Reservation> reservations = reservationDAO.findAllReservations();
		for (Reservation res : reservations) {
			if (res.getId() > maxId)
				maxId = res.getId();
		}
		reservation.setId(++maxId);
		
		// Racunanje ukupne cene za rezervaciju
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(reservation.getApartment());
		
		double price = reservation.getNumberOfNights() * apartment.getPricePerNight();
		reservation.setPrice(price);
		
		reservation.setStatus("Created");
		reservation.setGuest(loggedUser.getUsername());
		
		reservationDAO.addReservation(reservation);
		reservationDAO.saveReservations(contextPath);
		
		// Dodavanje rezervacije useru
		User user = userDAO.findUser(loggedUser.getUsername());
		user.getReservationList().add(reservation.getId());
		userDAO.updateUser(user);
		userDAO.saveUsers(contextPath);
		
		// Dodavanje rezervacije apartmanu
		apartment.getReservations().add(reservation.getId());
		apartmentDAO.updateApartment(apartment);
		apartmentDAO.saveApartments(contextPath);
		
		return Response.status(200).entity(reservation).build();
	}
	
	// Pretraga rezervacija po korisnickom imenu gosta
	@GET
	@Path("/search/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchReservations(@PathParam("username") String username, @Context HttpServletRequest request){
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!(loggedUser.getRole().equals("Admin") || loggedUser.getRole().equals("Host")))
			return Response.status(403).build();
			
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		Collection<Reservation> reservations = reservationDAO.findAllReservations();
		List<Reservation> reservationsList = new ArrayList<>();
		
		for (Reservation r : reservations) {
			if(r.getGuest().equals(username))
				reservationsList.add(r);
		}
		
		return Response.status(200).entity(reservationsList).build();
	}
	
}
