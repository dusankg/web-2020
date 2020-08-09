package beans;

import java.util.List;

public class User {

	private String username;
	
	private String password;
	
	private String firstName;
	
	private String lastName;
	
	// true if male, false if female
	private boolean gender;
	
	private String role;
	
	private List<Apartment> myApartments;
	
	private List<Apartment> rentedApartments;
	
	private List<Reservation> reservationList;
	
	public User() {
		
	}

	public User(String username, String password, String firstName, String lastName, boolean gender, String role,
			List<Apartment> myApartments, List<Apartment> rentedApartments, List<Reservation> reservationList) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.role = role;
		this.myApartments = myApartments;
		this.rentedApartments = rentedApartments;
		this.reservationList = reservationList;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public boolean isGender() {
		return gender;
	}

	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Apartment> getMyApartments() {
		return myApartments;
	}

	public void setMyApartments(List<Apartment> myApartments) {
		this.myApartments = myApartments;
	}

	public List<Apartment> getRentedApartments() {
		return rentedApartments;
	}

	public void setRentedApartments(List<Apartment> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}

	public List<Reservation> getReservationList() {
		return reservationList;
	}

	public void setReservationList(List<Reservation> reservationList) {
		this.reservationList = reservationList;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", firstName=" + firstName + ", lastName="
				+ lastName + ", gender=" + gender + ", role=" + role + ", myApartments=" + myApartments
				+ ", rentedApartments=" + rentedApartments + ", reservationList=" + reservationList + "]";
	}
	
	
}
