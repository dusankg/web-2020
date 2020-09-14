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

import beans.Apartment;
import beans.Reservation;
import beans.User;
import dao.ApartmentDAO;
import dao.ReservationDAO;

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
		
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation getReservation(@PathParam("id") Long id) {
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
	public List<Reservation> getMyReservations(@Context HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Guest"))
			return null; // forbidden
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		Collection<Reservation> reservations = reservationDAO.findAllReservations();
		
		List<Reservation> myReservations = new ArrayList<>();
		for (Reservation reservation : reservations) {
			if(reservation.getGuest().equals(user.getUsername()))
				myReservations.add(reservation);
		}
		
		return myReservations;
		
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
	public List<Reservation> getReceived(@Context HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host"))
			return null; // forbidden
		
		List<Apartment> myApartments = user.getMyApartments();
		List<Reservation> receivedReservations = new ArrayList<>();
		
		for (Apartment apartment : myApartments) {
			for (Reservation reservation : apartment.getReservations()) {
				receivedReservations.add(reservation);
			}
		}
		
		return receivedReservations;
		
	}
	
	// Prihvatanje rezervacije od strane domacina
	@PUT
	@Path("/accept")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation acceptReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host")) 
			return null; // forbidden
		
		if (reservation.getStatus().equals("Created")) {
			reservation.setStatus("Accepted");
			Reservation retReservation = reservationDAO.updateReservation(reservation);
			reservationDAO.saveReservations(this.contextPath);
			return retReservation;
		} else {
			return null; //404
		}
		
	}

	// Odbijanje rezervacije od strane domacina
	@PUT
	@Path("/reject")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation rejectReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host")) 
			return null; // forbidden
		
		if (reservation.getStatus().equals("Created") || reservation.getStatus().equals("Accepted")) {
			reservation.setStatus("Rejected");
			Reservation retReservation = reservationDAO.updateReservation(reservation);
			reservationDAO.saveReservations(this.contextPath);
			return retReservation;
		} else {
			return null; //404
		}
		
	}

	// Postavljanje rezervacije u status ZAVRSENA od strane domacina
	@PUT
	@Path("/finish")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation finishReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User user = (User) request.getSession().getAttribute("user");
		if (!user.getRole().equals("Host")) 
			return null; // forbidden
		
		// Racunanje datuma zavrsetka rezervacije
		Date endDate = new Date(reservation.getStartDate().getTime() + reservation.getNumberOfNights()*(24*60*60*1000));
		
		// new Date() pravi novi objekat cija je vrednost trenutni datum i vreme
		if (endDate.before(new Date())) {
			reservation.setStatus("Finished");
			Reservation retReservation = reservationDAO.updateReservation(reservation);
			reservationDAO.saveReservations(this.contextPath);
			return retReservation;
		} else {
			return null; //404
		}
		
	}
	
	// Pregled rezervacija za admine
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Reservation> getAllReservations(@Context HttpServletRequest request) {
		
		User user = (User) request.getSession().getAttribute("user");
		//if (!user.getRole().equals("Admin"))
		//	return null; // forbidden
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		Collection<Reservation> reservations = reservationDAO.findAllReservations();
		
		List<Reservation> reservationsList = new ArrayList<>();
		for (Reservation reservation : reservations) {
			reservationsList.add(reservation);
		}
		
		return reservationsList;
		
	}
	
	// Pravljenje nove rezervacije
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Reservation createReservation(Reservation reservation, @Context HttpServletRequest request) {
		
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if (!loggedUser.getRole().equals("Guest")) {
			return null; // forbidden
		}
		
		// Dodavanje id-ja rezervaciji
		Long maxId = 1L;
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
		
		return reservation;
	}
}
