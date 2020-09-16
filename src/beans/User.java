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
	
	private List<Integer> myApartments;
	
	private List<Integer> rentedApartments;
	
	private List<Integer> reservationList;
	
	private boolean blocked;
	
	public User() {
		
	}

	public User(String username, String password, String firstName, String lastName, boolean gender, String role,
			List<Integer> myApartments, List<Integer> rentedApartments, List<Integer> reservationList, boolean blocked) {
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
		this.blocked = false;
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

	public List<Integer> getMyApartments() {
		return myApartments;
	}

	public void setMyApartments(List<Integer> myApartments) {
		this.myApartments = myApartments;
	}

	public List<Integer> getRentedApartments() {
		return rentedApartments;
	}

	public void setRentedApartments(List<Integer> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}

	public List<Integer> getReservationList() {
		return reservationList;
	}

	public void setReservationList(List<Integer> reservationList) {
		this.reservationList = reservationList;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", firstName=" + firstName + ", lastName="
				+ lastName + ", gender=" + gender + ", role=" + role + ", myApartments=" + myApartments
				+ ", rentedApartments=" + rentedApartments + ", reservationList=" + reservationList + ", blocked="
				+ blocked + "]";
	}
	
	
}
