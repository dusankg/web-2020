package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import beans.Reservation;

public class ReservationDAO {

	private Map<Long, Reservation> reservations = new HashMap<>();
	
	public ReservationDAO() {
		
	}
	
	public ReservationDAO(String contextPath) {
		loadReservations(contextPath);
	}
	
	public void loadReservations(String path) {
		BufferedReader in = null;
		try {
			File file = new File(path + "/data/reservations.json");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringBuilder sb = new StringBuilder();
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			ObjectMapper mapper = new ObjectMapper();
			this.reservations = mapper.readValue(sb.toString(),  new TypeReference<Map<Long, Reservation>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {}
			}
		} 
	
	}
	
	public void saveReservations(String path) {
		BufferedWriter out = null;
		try {
			File file = new File(path + "/data/reservations.json");
			out = new BufferedWriter(new FileWriter(file));
			ObjectMapper mapper = new ObjectMapper();
			ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
			String content = writer.writeValueAsString(this.reservations);
			out.write(content);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (Exception e) {}
		}
	}
	
	public Reservation findReservation(Long id) {
		return this.reservations.get(id);
	}
	
	public Collection<Reservation> findAllReservations() {
		return this.reservations.values();
	}
	
	public Reservation updateReservation(Reservation reservation) {
		return this.reservations.replace(reservation.getId(), reservation);
	}
	
	public Reservation addReservation(Reservation reservation) {
		return this.reservations.put(reservation.getId(), reservation);
	}
}
