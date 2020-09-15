package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Apartment;
import beans.User;
import dao.ApartmentDAO;
import dao.UserDAO;

@Path("apartment")
public class ApartmentService {

	@Context
	ServletContext ctx;

	private String contextPath;
	
	public ApartmentService() {

	}

	@PostConstruct
	public void init() {
		this.contextPath = ctx.getRealPath("");

		ApartmentDAO apartmentDAO = new ApartmentDAO(contextPath);

		if (ctx.getAttribute("apartments") == null) {
			ctx.setAttribute("apartments", apartmentDAO);
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getApartment(@PathParam("id") Integer id) {

		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);

		if (apartment == null) {
			return null;
		}

		return apartment;
	}
	
	// Pregled svih aktivnih apartmana za goste i neulogovane korisnike
	@GET
	@Path("/active")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getActiveApartments(@Context HttpServletRequest request){
		
		User user = (User) request.getSession().getAttribute("user");
		
		// Neulogovani korisnik
		if(user == null) {
			ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
			Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
			
			List<Apartment> activeApartments = new ArrayList<>();
			for (Apartment apartment : allApartments) {
				if (apartment.getStatus().equals("aktivan"))
					activeApartments.add(apartment);
			}
			
			return activeApartments;

		// Gost
		} else if (user.getRole().equals("Guest")) {
			ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
			Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
			
			List<Apartment> activeApartments = new ArrayList<>();
			for (Apartment apartment : allApartments) {
				if (apartment.getStatus().equals("aktivan"))
					activeApartments.add(apartment);
			}
			
			return activeApartments;
		} else {
			return null;
		}
		
	}
	
	// Pregled svih AKTIVNIH apartmana nekog domacina
	@GET
	@Path("/my-active")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getMyActiveApartments(@Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!loggedUser.getRole().equals("Host")) {
			return null;
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> activeApartments = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			if (apartment.getHost().equals(loggedUser.getUsername())) {
				if (apartment.getStatus().equals("aktivan"))
					activeApartments.add(apartment);
			}
		}
		
		return activeApartments;
		
	}
	
	// Pregled svih NEAKTIVNIH apartmana nekog domacina
	@GET
	@Path("/my-inactive")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getMyInactiveApartments(@Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!loggedUser.getRole().equals("Host")) {
			return null;
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> inactiveApartments = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			if (apartment.getHost().equals(loggedUser.getUsername())) {
				if (!apartment.getStatus().equals("aktivan"))
					inactiveApartments.add(apartment);
			}
		}
		
		return inactiveApartments;
		
	}
	
	// Izmena apartmana za domacina i administratora
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment changeApartment(Apartment apartment, @Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!(loggedUser.getRole().equals("Host") || loggedUser.getRole().equals("Admin"))) {
			return null;
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		
		if(loggedUser.getRole().equals("Host")) {
			if (!apartment.getHost().equals(loggedUser.getUsername())) {
				return null;
			}
		}
		
		// updateApartment vraca apartment pre izmene
		apartmentDAO.updateApartment(apartment);
		apartmentDAO.saveApartments(contextPath);
		
		return apartment;
		
	}
	
	// Pregled svih apartmana za administratore
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> getAllApartments() {
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> apartmentsList = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			apartmentsList.add(apartment);
		}
		
		return apartmentsList;
	}
	
	// Dodavanje novog apartmana
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment addApartment(Apartment apartment, @Context HttpServletRequest request) {

		// Bad request
		if (apartment == null) {
			return null;
		}

		User loggedUser = (User) request.getSession().getAttribute("user");
	
		 // Samo domacini mogu dodavati apartmane 
		if (!loggedUser.getRole().equals("Host")){ 
			return null; 
		}

		// Id koji dodajemo generisemo na backendu, inkrementujemo za 1 u odnosu na maksimalni od svih postojecih id-jeva
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Integer maxId = 1;
		Collection<Apartment> apartments = apartmentDAO.findAllApartments();
		for (Apartment a : apartments) {
			if (a.getId() > maxId)
				maxId = a.getId();
		}
		apartment.setId(++maxId);
		
		apartment.setHost(loggedUser.getUsername());
		apartment.setStatus("neaktivan");

		apartmentDAO.addApartment(apartment);
		apartmentDAO.saveApartments(contextPath);
		
		// users.json 
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		loggedUser.getMyApartments().add(apartment.getId());
		userDAO.updateUser(loggedUser);
		userDAO.saveUsers(contextPath);
		
		
		return apartment;
	}
	
	// TODO: BRISANJE TREBA DA BUDE LOGICKO 
	// Brisanje apartmana
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment deleteApartment(@PathParam("id") Integer id, @Context HttpServletRequest request) {
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);
		
		User user = (User) request.getSession().getAttribute("user");
		
		if(user.getRole().equals("Host")) {
			if (!apartment.getHost().equals(user.getUsername())) {
				return null;
			} else {
				return apartmentDAO.removeApartment(apartment);
			}
		}
		
		if(!user.getRole().equals("Admin")) {
			return null;
		} else {
			return apartmentDAO.removeApartment(apartment);
		}
			
	}
	
	// TODO: Pregled datuma za koje je izabrani apartman dostupan
	
}
