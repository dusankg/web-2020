package beans;

import java.util.Date;

public class Reservation {

	private Long id;
	
	private Integer apartment;
	
	private Date startDate;
	
	private int numberOfNights;
	
	private double price;
	
	private String reservationMessage;
	
	private String guest;
	
	private String status;
	
	public Reservation() {
		
	}

	public Reservation(Long id, Integer apartment, Date startDate, int numberOfNights, double price, String reservationMessage,
			String guest, String status) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNights = numberOfNights;
		this.price = price;
		this.reservationMessage = reservationMessage;
		this.guest = guest;
		this.status = status;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getApartment() {
		return apartment;
	}

	public void setApartment(Integer apartment) {
		this.apartment = apartment;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNumberOfNights() {
		return numberOfNights;
	}

	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getReservationMessage() {
		return reservationMessage;
	}

	public void setReservationMessage(String reservationMessage) {
		this.reservationMessage = reservationMessage;
	}

	public String getGuest() {
		return guest;
	}

	public void setGuest(String guest) {
		this.guest = guest;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
