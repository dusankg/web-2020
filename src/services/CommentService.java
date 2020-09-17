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
import beans.Comment;
import beans.Reservation;
import beans.User;
import dao.ApartmentDAO;
import dao.CommentDAO;
import dao.ReservationDAO;

@Path("comment")
public class CommentService {

	@Context
	ServletContext ctx;
	
	private String contextPath;
	
	public CommentService() {
		
	}
	
	@PostConstruct
	public void init() {
		this.contextPath = ctx.getRealPath("");		

		CommentDAO commentDAO = new CommentDAO(contextPath);
		if(ctx.getAttribute("comments") == null)
			ctx.setAttribute("comments", commentDAO);
			
		ApartmentDAO apartmentDAO = new ApartmentDAO(contextPath);
		if(ctx.getAttribute("apartments") == null) {
			ctx.setAttribute("apartments", apartmentDAO);
		}
		
		ReservationDAO reservationDAO = new ReservationDAO(contextPath);
		if(ctx.getAttribute("reservations") == null) {
			ctx.setAttribute("reservations", reservationDAO);
		}
	}
	
	// Ostavljanje komentara
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addComment(Comment comment, @Context HttpServletRequest request) {
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		List<Integer> apartments = loggedUser.getRentedApartments();
		Apartment apartment = apartmentDAO.findApartment(comment.getApartment());
		List<Integer> reservations = apartment.getReservations();
		Reservation reservation = null;
		for (Integer reservationId : reservations) {
			reservation = reservationDAO.findReservation(reservationId);
			if (reservation.getGuest().equals(loggedUser.getUsername()))
				break;
		}
		
		if( (reservation.getStatus().equals("Rejected") || reservation.getStatus().equals("Finished"))) {
			Integer maxId = 1;
			Collection<Comment> comments = commentDAO.findAllComments();
			for (Comment c : comments) {
				if (c.getId() > maxId)
					maxId = c.getId();
			}
			comment.setId(++maxId);
			comment.setVisible(true);
			comment.setGuest(loggedUser.getUsername());
			
			commentDAO.addComment(comment);
			
			// Dodavanje komentara u apartman

			apartment.getComments().add(comment.getId());
			apartmentDAO.updateApartment(apartment);
			apartmentDAO.saveApartments(contextPath);
			
			return Response.status(201).entity(comment).build();

		} else {
			return Response.status(400).build(); // nesto ne valja
		} 
		
		
	}
	
	// Pregled svih komentara za domacine
	@GET
	@Path("/my-apartments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCommentsForMyApartments(@Context HttpServletRequest request) {
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if (!loggedUser.getRole().equals("Host"))
			return Response.status(403).build();
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Comment> allComments = commentDAO.findAllComments();
		
		List<Comment> retComments = new ArrayList<>();
		
		for (Comment comment : allComments) {
			Integer idApartment = comment.getApartment();
			Apartment a = apartmentDAO.findApartment(idApartment);
			if(a.getHost().equals(loggedUser.getUsername()))
				retComments.add(comment);
		}
		
		return Response.status(200).entity(retComments).build();
		
	}
	
	// Promena vidljivosti komentara - ako je vidljiv postace nevidljiv i obrnuto
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Comment changeCommentVisibility(@PathParam("id") Integer id) {
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		Comment comment = commentDAO.findComment(id);
		
		if (comment.isVisible()) {
			comment.setVisible(false);
		} else {
			comment.setVisible(true);
		}
		
		commentDAO.updateComment(comment);
		commentDAO.saveComments(contextPath);
		
		return comment;
	}
	
	// Pregled komentara za goste (id je od apartmana)
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getCommentsForApartment(@PathParam("id") Integer id) {
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		
		Apartment ap = apartmentDAO.findApartment(id);
		
		List<Integer> comments = ap.getComments();
		List<Comment> retComments = new ArrayList<>();
		
		for (Integer idComment : comments) {
			Comment comment = commentDAO.findComment(idComment);
			if(comment.isVisible())
				retComments.add(comment);
		}
		
		return retComments;
		
	}
	
	// Pregled svih komentara za admine
	@GET
	@Path("/admin/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllCommentsForApartment(@PathParam("id") Integer id, @Context HttpServletRequest request){
		
		User loggedUser = (User) request.getSession().getAttribute("user");
		if(!loggedUser.getRole().equals("Admin"))
			return Response.status(403).build();
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		
		Apartment ap = apartmentDAO.findApartment(id);
		
		List<Integer> comments = ap.getComments();
		List<Comment> allComments = new ArrayList<>();
		
		for (Integer idComment : comments) {
			Comment comment = commentDAO.findComment(idComment);
			allComments.add(comment);
		}
		
		return Response.status(200).entity(allComments).build();
				
	}
	
	// Pregled svih komentara za admine
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getAllComments(@PathParam("id") Integer id){
		
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		Collection<Comment> allApartments = commentDAO.findAllComments();

		
		List<Comment> allComments = new ArrayList<>();
		
		for (Comment comment : allApartments) {
			//Comment comment = commentDAO.findComment(idComment);
			allComments.add(comment);
		}
		
		return allComments;
				
	}
	
	
	
}
