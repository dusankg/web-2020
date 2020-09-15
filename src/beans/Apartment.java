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
	
	private int checkInTime;
	
	private int checkOutTime;
	
	private String status;
	
	private List<Amenity> amenities;
	
	private List<Integer> reservations;
	
	public Apartment() {
		
	}

	public Apartment(Integer id, String type, int numberOfRooms, int numberOfGuests, Location location, List<Date> dates,
			List<Date> availableDates, String host, List<Integer> comments, List<String> images, double pricePerNight,
			int checkInTime, int checkOutTime, String status, List<Amenity> amenities, List<Integer> reservations) {
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

	public int getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(int checkInTime) {
		this.checkInTime = checkInTime;
	}

	public int getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(int checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenity> amenities) {
		this.amenities = amenities;
	}

	public List<Integer> getReservations() {
		return reservations;
	}

	public void setReservations(List<Integer> reservations) {
		this.reservations = reservations;
	}

	@Override
	public String toString() {
		return "Apartment [id=" + id + ", type=" + type + ", numberOfRooms=" + numberOfRooms + ", numberOfGuests="
				+ numberOfGuests + ", location=" + location + ", dates=" + dates + ", availableDates=" + availableDates
				+ ", host=" + host + ", comments=" + comments + ", images=" + images + ", pricePerNight="
				+ pricePerNight + ", checkInTime=" + checkInTime + ", checkOutTime=" + checkOutTime + ", status="
				+ status + ", amenities=" + amenities + ", reservations=" + reservations + "]";
	}
	
	
}
