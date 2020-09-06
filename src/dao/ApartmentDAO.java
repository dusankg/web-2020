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

import beans.Apartment;

public class ApartmentDAO {

	private Map<String, Apartment> apartments = new HashMap<>();
	
	public ApartmentDAO() {
		
	}
	
	public ApartmentDAO(String contextPath) {
		loadApartments(contextPath);
	}
	
	public void loadApartments(String path) {
		BufferedReader in = null;
		try {
			File file = new File(path + "/data/apartments.json");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringBuilder sb = new StringBuilder();
			while ((line = in.readLine()) != null) {
				sb.append(line);
			}
			ObjectMapper mapper = new ObjectMapper();
			this.apartments = mapper.readValue(sb.toString(), new TypeReference<Map<String, Apartment>>(){});
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
	
	public void saveApartments(String path) {
		BufferedWriter out = null;
		try {
			File file = new File(path + "/data/apartments.json");
			out = new BufferedWriter(new FileWriter(file));
			ObjectMapper mapper = new ObjectMapper();
			ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
			String content = writer.writeValueAsString(this.apartments);
			out.write(content);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (Exception e) {
					
				}
			}
		}
	}
	
	public Apartment addApartment (Apartment apartment) {
		apartments.put(apartment.getId(), apartment);
		return apartment;
	}
	
	public Apartment findApartment(String id) {
		return apartments.containsKey(id) ? apartments.get(id) : null;
	}
	
	public Collection<Apartment> findAllApartments() {
		return apartments.values();
	}
	
	public Apartment updateApartment(Apartment apartment) {
		return apartments.put(apartment.getId(), apartment);
	}
	
	public Apartment removeApartment(Apartment apartment) {
		return apartments.remove(apartment.getId());
	}
}
