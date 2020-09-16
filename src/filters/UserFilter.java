package filters;

public class UserFilter {

	private String role;
	
	private Boolean gender;
	
	private String username;

	public UserFilter() {
		
	}

	public UserFilter(String role, Boolean gender, String username) {
		super();
		this.role = role;
		this.gender = gender;
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Boolean getGender() {
		return gender;
	}

	public void setGender(Boolean gender) {
		this.gender = gender;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "UserFilter [role=" + role + ", gender=" + gender + ", username=" + username + "]";
	}
	
	
	
	
}
