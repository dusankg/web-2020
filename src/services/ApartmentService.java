package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.User;
import dao.ApartmentDAO;
import dao.UserDAO;
import filters.ApartmentFilter;

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
	public Response getApartment(@PathParam("id") Integer id) {

		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);

		if (apartment == null) {
			return Response.status(400).build();
		}

		return Response.status(200).entity(apartment).build();
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
				if(apartment.getStatus() == null ) continue;
				if (apartment.getStatus().equals("aktivan") && !apartment.isDeleted())
					activeApartments.add(apartment);
			}
			
			return activeApartments;

		// Gost
		} else if (user.getRole().equals("Guest")) {
			ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
			Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
			
			List<Apartment> activeApartments = new ArrayList<>();
			for (Apartment apartment : allApartments) {
				if(apartment.getStatus() == null) continue;
				if (apartment.getStatus().equals("aktivan") && !apartment.isDeleted())
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
	public Response getMyActiveApartments(@Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!loggedUser.getRole().equals("Host")) {
			return Response.status(403).build();
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> activeApartments = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			if (apartment.getHost().equals(loggedUser.getUsername())) {
				if(apartment.getStatus() == null) continue;
				if (apartment.getStatus().equals("aktivan") && !apartment.isDeleted())
					activeApartments.add(apartment);
			}
		}
		
		return Response.status(200).entity(activeApartments).build();
		
	}
	
	// Pregled svih NEAKTIVNIH apartmana nekog domacina
	@GET
	@Path("/my-inactive")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyInactiveApartments(@Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!loggedUser.getRole().equals("Host")) {
			return Response.status(403).build();
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> inactiveApartments = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			if (apartment.getHost().equals(loggedUser.getUsername())) {
				if(apartment.getStatus() == null) {
					continue;
				}
				if (!apartment.getStatus().equals("aktivan") && !apartment.isDeleted())
					inactiveApartments.add(apartment);
			}
		}
		
		return Response.status(200).entity(inactiveApartments).build();
		
		
	}
	
	// Izmena apartmana za domacina i administratora
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeApartment(Apartment apartment, @Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!(loggedUser.getRole().equals("Host") || loggedUser.getRole().equals("Admin"))) {
			return Response.status(403).build();
		} 
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		
		if(loggedUser.getRole().equals("Host")) {
			if (!apartment.getHost().equals(loggedUser.getUsername())) {
				return Response.status(403).build();
			}
		}
		
		// updateApartment vraca apartment pre izmene
		apartmentDAO.updateApartment(apartment);
		apartmentDAO.saveApartments(contextPath);
		
		return Response.status(200).entity(apartment).build();
		
	}
	
	// Pregled svih apartmana za administratore
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllApartments(@Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if (!loggedUser.getRole().equals("Admin")) {
			return Response.status(403).build();
		}
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> allApartments = apartmentDAO.findAllApartments();
		
		List<Apartment> apartmentsList = new ArrayList<>();
		for (Apartment apartment : allApartments) {
			if( !apartment.isDeleted()) apartmentsList.add(apartment);
		}
		
		return Response.status(200).entity(apartmentsList).build();
	}
	
	// Dodavanje novog apartmana
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addApartment(Apartment apartment, @Context HttpServletRequest request) {

		// Bad request
		if (apartment == null) {
			return Response.status(400).build();
		}

		User loggedUser = (User) request.getSession().getAttribute("user");
	
		 // Samo domacini mogu dodavati apartmane 
		if (!loggedUser.getRole().equals("Host")){ 
			return Response.status(403).build(); 
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
		apartment.setComments(new ArrayList<Integer>());
		apartment.setDeleted(false);
		
		apartmentDAO.addApartment(apartment);
		apartmentDAO.saveApartments(contextPath);
		
		// users.json 
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		loggedUser.getMyApartments().add(apartment.getId());
		userDAO.updateUser(loggedUser);
		userDAO.saveUsers(contextPath);
		
		
		return Response.status(200).entity(apartment).build();
	}
	
	// Brisanje apartmana (logicko, ako ga zelimo potpuno obrisati mora rucno u json fajlu)
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteApartment(@PathParam("id") Integer id, @Context HttpServletRequest request) {
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);
		
		User user = (User) request.getSession().getAttribute("user");
		
		apartment.setDeleted(true);
		apartmentDAO.updateApartment(apartment);
		apartmentDAO.saveApartments(contextPath);
		return Response.status(200).build();
		/*
		if(user.getRole().equals("Host")) {
			if (!apartment.getHost().equals(user.getUsername())) {
				// Nema privilegije za brisanje
				return Response.status(403).build(); 
			} else {
				apartment.setDeleted(true);
				apartmentDAO.updateApartment(apartment);
				apartmentDAO.saveApartments(contextPath);
				return Response.status(200).build();
			}
		}
		
		if(!user.getRole().equals("Admin")) {
			return Response.status(403).build();
		} else {
			return Response.status(200).build();
		}*/
			
	}
	
	// TODO: Pregled datuma za koje je izabrani apartman dostupan
	@GET
	@Path("/{id}/dates")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Date> getAvailableDates(@PathParam("id") Integer id) {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);
		
		return apartment.getAvailableDates();
	}
	
	// Pretraga apartmana
	@POST
	@Path("/search")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Apartment> searchApartment(ApartmentFilter filter){
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> apartments = apartmentDAO.findAllApartments();
		
		List<Apartment> filteredApartments = new ArrayList<>();
		
		for (Apartment a : apartments) {
			/*
			 * if (filter.getStartDate() != null) { if(filter.getStartDate()) break; } if
			 * (filter.getEndDate() != null) { if(filter.getEndDate) break; }
			 */
			
			if (!a.getStatus().equals("aktivan") || a.isDeleted())
				break;
				
			if (filter.getCity() != null) {
				if(!filter.getCity().toLowerCase().equals(a.getLocation().getAddress().getCity().toLowerCase()))
					break;
			} 
			if (filter.getMinPrice() != null) {
				if(filter.getMinPrice() > a.getPricePerNight())
					break;
			} 
			if (filter.getMaxPrice() != null) {
				if(filter.getMaxPrice() < a.getPricePerNight())
					break;
			} 
			if (filter.getMinRoomNumber() != null) {
				if(filter.getMinRoomNumber() > a.getNumberOfRooms())
					break;
			} 
			if (filter.getMaxRoomNumber() != null) {
				if(filter.getMaxRoomNumber() < a.getNumberOfRooms())
					break;
			} 
			if (filter.getGuestNumber() != null) {
				if(filter.getGuestNumber() != a.getNumberOfGuests())
					break;
			} 
			filteredApartments.add(a);
		}
		
		return filteredApartments;
	}
	
}
