package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

import beans.Amenity;
import beans.Apartment;
import beans.User;
import dao.AmenityDAO;
import dao.ApartmentDAO;

@Path("amenity")
public class AmenityService {

	@Context
	ServletContext ctx;
	
	private String contextPath;
	
	public AmenityService() {
		
	}
	
	public void init() {
		this.contextPath = ctx.getRealPath("");
		
		AmenityDAO amenityDAO = new AmenityDAO(contextPath);
		if (ctx.getAttribute("amenities") == null) {
			ctx.setAttribute("amenities", amenityDAO);
		}
		
		ApartmentDAO apartmentDAO = new ApartmentDAO(contextPath);
		if (ctx.getAttribute("apartments") == null) {
			ctx.setAttribute("apartments", apartmentDAO);
		}
		
	}
	
	// Pregled svih amenitija za admina a i za domacina
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Amenity> getAllAmenities() {
		
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenities");
		Collection<Amenity> amenities = amenityDAO.findAllAmenities();
		
		List<Amenity> amenitiesList = new ArrayList<>();
		
		for (Amenity amenity : amenities) {
			amenitiesList.add(amenity);
		}
		
		return amenitiesList;
	
	}
	
	// Dodavanje novog sadrzaja apartmana (samo admin)
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity addAmenity(Amenity amenity, @Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(loggedUser.getRole().equals("Admin")) {
			return null; // forbidden
		}
		
		// Generisanje id-ja
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenities");
		Integer maxId = 1;
		Collection<Amenity> amenities = amenityDAO.findAllAmenities();
		for (Amenity a : amenities) {
			if (a.getId() > maxId)
				maxId = a.getId();
		}
		amenity.setId(++maxId);
		
		amenityDAO.addAmenity(amenity);
		amenityDAO.saveAmenities(contextPath);
		
		return amenity;
		
	}
	
	// Izmena sadrzaja apartmana
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Amenity changeAmenity(Amenity amenity, @Context HttpServletRequest request) {

		User loggedUser = (User) request.getSession().getAttribute("user");
		if(loggedUser.getRole().equals("Admin")) {
			return null; // forbidden
		}
		
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenities");
		amenityDAO.updateAmenity(amenity);
		
		amenityDAO.saveAmenities(contextPath);
		
		return amenity;
	}
	
	// Brisanje amenitija
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteAmenity(@PathParam("id") Integer id, @Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(loggedUser.getRole().equals("Admin")) {
			return Response.status(403).build();
		}
		
		// Brisanje ovog amenitija iz svih apartmana
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> apartments = apartmentDAO.findAllApartments();
		for (Apartment apartment : apartments) {
			if (apartment.getAmenities().contains(id)) {
				apartment.getAmenities().remove(id);
				apartmentDAO.updateApartment(apartment);
			}
		}
		apartmentDAO.saveApartments(contextPath);
		
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenities");
		amenityDAO.removeAmenity(id);
		
		amenityDAO.saveAmenities(contextPath);
		
		return Response.status(200).build();
	}
	
	
	
	// Pregled svih amenitija od odredjenog apartmana
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Amenity> getMyAmenities(@PathParam("id") Integer id){
		
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Apartment apartment = apartmentDAO.findApartment(id);
		AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenities");
		
		List<Integer> amenitiesId = apartment.getAmenities();
		List<Amenity> amenities = new ArrayList<>();
		
		for (Integer amenityId : amenitiesId) {
			amenities.add(amenityDAO.findAmenity(amenityId));
		}
		
		return amenities;
	}
}
