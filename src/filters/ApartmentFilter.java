package filters;

import java.util.Date;

public class ApartmentFilter {
	
	private Date startDate;
	
	private Date endDate;
	
	private String city;
	
	private Double minPrice;
	
	private Double maxPrice;
	
	private Integer minRoomNumber;
	
	private Integer maxRoomNumber;
	
	private Integer guestNumber;
	
	public ApartmentFilter() {
		
	}

	public ApartmentFilter(Date startDate, Date endDate, String city, Double minPrice, Double maxPrice,
			Integer minRoomNumber, Integer maxRoomNumber, Integer guestNumber) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.city = city;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.minRoomNumber = minRoomNumber;
		this.maxRoomNumber = maxRoomNumber;
		this.guestNumber = guestNumber;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Double getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(Double minPrice) {
		this.minPrice = minPrice;
	}

	public Double getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(Double maxPrice) {
		this.maxPrice = maxPrice;
	}

	public Integer getMinRoomNumber() {
		return minRoomNumber;
	}

	public void setMinRoomNumber(Integer minRoomNumber) {
		this.minRoomNumber = minRoomNumber;
	}

	public Integer getMaxRoomNumber() {
		return maxRoomNumber;
	}

	public void setMaxRoomNumber(Integer maxRoomNumber) {
		this.maxRoomNumber = maxRoomNumber;
	}

	public Integer getGuestNumber() {
		return guestNumber;
	}

	public void setGuestNumber(Integer guestNumber) {
		this.guestNumber = guestNumber;
	}

	@Override
	public String toString() {
		return "ApartmentFilter [startDate=" + startDate + ", endDate=" + endDate + ", city=" + city + ", minPrice="
				+ minPrice + ", maxPrice=" + maxPrice + ", minRoomNumber=" + minRoomNumber + ", maxRoomNumber="
				+ maxRoomNumber + ", guestNumber=" + guestNumber + "]";
	}
	
	
}
