package beans;

import java.util.Date;
import java.util.List;

public class Apartment {
	
	private Integer id;

	private String type;
	
	private int numberOfRooms;
	
	private int numberOfGuests;
	
	private Location location;
	
	private List<Date> dates;
	
	private List<Date> availableDates;
	
	private String host;
	
	private List<Integer> comments;
	
	private List<String> images;
	
	private double pricePerNight;
	
	private String checkInTime;
	
	private String checkOutTime;
	
	private String status;
	
	private List<Integer> amenities;
	
	private List<Integer> reservations;
	
	private boolean deleted;
	
	public Apartment() {
		
	}

	public Apartment(Integer id, String type, int numberOfRooms, int numberOfGuests, Location location, List<Date> dates,
			List<Date> availableDates, String host, List<Integer> comments, List<String> images, double pricePerNight,
			String checkInTime, String checkOutTime, String status, List<Integer> amenities, List<Integer> reservations) {
		super();
		this.id = id;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.dates = dates;
		this.availableDates = availableDates;
		this.host = host;
		this.comments = comments;
		this.images = images;
		this.pricePerNight = pricePerNight;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
		this.deleted = deleted;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public int getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public List<Date> getDates() {
		return dates;
	}

	public void setDates(List<Date> dates) {
		this.dates = dates;
	}

	public List<Date> getAvailableDates() {
		return availableDates;
	}

	public void setAvailableDates(List<Date> availableDates) {
		this.availableDates = availableDates;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public List<Integer> getComments() {
		return comments;
	}

	public void setComments(List<Integer> comments) {
		this.comments = comments;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public String getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public String getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Integer> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Integer> amenities) {
		this.amenities = amenities;
	}

	public List<Integer> getReservations() {
		return reservations;
	}

	public void setReservations(List<Integer> reservations) {
		this.reservations = reservations;
	}
	
	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Apartment [id=" + id + ", type=" + type + ", numberOfRooms=" + numberOfRooms + ", numberOfGuests="
				+ numberOfGuests + ", location=" + location + ", dates=" + dates + ", availableDates=" + availableDates
				+ ", host=" + host + ", comments=" + comments + ", images=" + images + ", pricePerNight="
				+ pricePerNight + ", checkInTime=" + checkInTime + ", checkOutTime=" + checkOutTime + ", status="
				+ status + ", amenities=" + amenities + ", reservations=" + reservations + ", deleted=" + deleted + "]";
	}

	
	
}
