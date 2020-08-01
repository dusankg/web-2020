package beans;

import java.util.Date;

public class Reservation {

	private Apartment apartment;
	
	private Date startDate;
	
	private int numberOfNights;
	
	private double price;
	
	private String reservationMessage;
	
	private User guest;
	
	private String status;
	
	public Reservation() {
		
	}

	public Reservation(Apartment apartment, Date startDate, int numberOfNights, double price, String reservationMessage,
			User guest, String status) {
		super();
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNights = numberOfNights;
		this.price = price;
		this.reservationMessage = reservationMessage;
		this.guest = guest;
		this.status = status;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
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

	public User getGuest() {
		return guest;
	}

	public void setGuest(User guest) {
		this.guest = guest;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
