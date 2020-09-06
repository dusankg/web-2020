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

@Path("apartment")
public class ApartmentService {

	@Context
	ServletContext ctx;

	public ApartmentService() {

	}

	@PostConstruct
	public void init() {
		String contextPath = ctx.getRealPath("");

		ApartmentDAO apartmentDAO = new ApartmentDAO(contextPath);

		if (ctx.getAttribute("apartments") == null) {
			ctx.setAttribute("apartments", apartmentDAO);
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getApartment(@PathParam("id") String id) {

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
		
		User loggedUser = (User) request.getAttribute("user");
		if(!loggedUser.getRole().equals("Host")) {
			return null;
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> activeApartments = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			if (apartment.getHost().equals(loggedUser)) {
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
			if (apartment.getHost().equals(loggedUser)) {
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
			if (!apartment.getHost().equals(loggedUser)) {
				return null;
			}
		}
		
		return apartmentDAO.updateApartment(apartment);
		
	}
	
	// Pregled svih apartmana za administratore
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

		// Videti da li cemo automatski generisati id-jeve ili cemo ih unositi iz fronta
		// Samo za probu harkdkodovano
		apartment.setId("2");
		apartment.setHost(loggedUser);
		apartment.setStatus("neaktivan");

		return apartment;
	}
	
	// BRISANJE TREBA DA BUDE LOGICKO PROVERITI STA TO TACNO ZNACI
	// Brisanje apartmana
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment deleteApartment(@PathParam("id") String id, @Context HttpServletRequest request) {
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);
		
		User user = (User) request.getSession().getAttribute("user");
		
		if(user.getRole().equals("Host")) {
			if (!apartment.getHost().equals(user)) {
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
	
}
