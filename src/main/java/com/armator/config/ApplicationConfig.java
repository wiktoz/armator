package com.armator.config;

import com.armator.model.*;
import com.armator.repositoriy.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final ShipRepository shipRepository;
    private final UserRepository userRepository;
    private final ShipownerRepository shipownerRepository;
    private final RoleRepository roleRepository;
    private final WorkerRepository workerRepository;
    private final PortRepository portRepository;
    private final LoadRepository loadRepository;
    private final CustomerRepository customerRepository;
    private final CruiseRepository cruiseRepository;
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .map(UserDetails.class::cast)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration ac) throws Exception {
        return ac.getAuthenticationManager();
    }

    @PostConstruct
    public void init() {
        var user = User.builder()
                .firstname("John")
                .lastname("Doe")
                .email("test@test.com")
                .password(passwordEncoder().encode("test"))
                .role(SecurityRole.WORKER)
                .city("Warsaw")
                .street("Marszalkowska")
                .zipCode("00-000")
                .houseNumber("1")
                .flatNumber("1")
                .build();
        var admin = User.builder()
                .firstname("Janusz")
                .lastname("Tracz")
                .email("admin@test.com")
                .password(passwordEncoder().encode("test"))
                .role(SecurityRole.ADMIN)
                .city("Plebania")
                .street("Janusza Pawulona II")
                .zipCode("21-370")
                .houseNumber("1")
                .flatNumber("1")
                .build();
        var shipowner = User.builder()
                .firstname("Piotr")
                .lastname("Gryf")
                .email("piotr@test.com")
                .password(passwordEncoder().encode("birdisaword"))
                .role(SecurityRole.SHIPOWNER)
                .city("Quahog")
                .street("Setha MacFarlanea")
                .zipCode("21-370")
                .houseNumber("1")
                .flatNumber("1")
                .build();

        userRepository.save(user);
        userRepository.save(admin);
        userRepository.save(shipowner);

        var shipOwner = Shipowner.builder()
                .user(shipowner)
                .build();

        shipownerRepository.save(shipOwner);

        var ship = Ship.builder()
                .name("Titanic")
                .shipOwner(shipOwner)
                .flag("Israel")
                .maxKnots(100)
                .maxFuelCapacity(100)
                .maxLoadsNumber(100)
                .longitude(20.5)
                .latitude(39.0)
                .build();

        shipRepository.save(ship);

        var ship2 = Ship.builder()
                .name("Titan")
                .shipOwner(shipOwner)
                .flag("USA")
                .maxKnots(200)
                .maxFuelCapacity(200)
                .maxLoadsNumber(200)
                .longitude(4.0)
                .latitude(39.0)
                .build();

        shipRepository.save(ship2);

        var ship3 = Ship.builder()
                .name("ORP Jerzy Popiełuszko")
                .shipOwner(shipOwner)
                .flag("Poland")
                .maxKnots(2137)
                .maxFuelCapacity(2137)
                .maxLoadsNumber(2137)
                .latitude(54.9)
                .longitude(18.3)
                .build();

        shipRepository.save(ship3);

        var mechanic = Role.builder()
                .name("Mechanic")
                .salary(1000)
                .build();

        var captain = Role.builder()
                .name("Captain")
                .salary(10000)
                .build();

        var paramedic = Role.builder()
                .name("Paramedic")
                .salary(5000)
                .build();

        roleRepository.save(mechanic);
        roleRepository.save(captain);
        roleRepository.save(paramedic);

        var worker = Worker.builder()
                .email("test@test.com")
                .backAccountId("123456789")
                .idCardNumber("123456789")
                .phoneNumber("123456789")
                .city("Warsaw")
                .street("Marszalkowska")
                .zipCode("00-000")
                .houseNumber("1")
                .flatNumber("1")
                .role(mechanic)
                .user(user)
                .build();

        var captainWorker = Worker.builder()
                .email("piotr@test.com")
                .backAccountId("9897654321")
                .idCardNumber("987654321")
                .phoneNumber("987654321")
                .city("Warsaw")
                .street("Janusza Pawulona 2")
                .zipCode("00-000")
                .houseNumber("1")
                .flatNumber("2")
                .role(captain)
                .user(shipowner)
                .build();

        var customer = User.builder()
                .firstname("Jan")
                .lastname("Kowalski")
                .email("customer@test.com")
                .password(passwordEncoder().encode("test"))
                .role(SecurityRole.CUSTOMER)
                .city("Choroszcz")
                .street("Kowalska")
                .zipCode("04-200")
                .houseNumber("12")
                .flatNumber("14")
                .build();

        userRepository.save(customer);

        workerRepository.save(worker);
        workerRepository.save(captainWorker);

        var portA = Port.builder()
                .street("Marszalkowska")
                .city("Warsaw")
                .zipCode("00-000")
                .maxLoadsNumber(100)
                .loadsNumber(0)
                .build();

        var portB = Port.builder()
                .street("Gdanska")
                .city("Warsaw")
                .zipCode("00-000")
                .maxLoadsNumber(100)
                .loadsNumber(0)
                .build();
        portRepository.save(portA);
        portRepository.save(portB);

        var customerA = Customer.builder()
                .city("Warsaw")
                .street("Marszalkowska")
                .zipCode("00-000")
                .companyName("Company A")
                .email("customer@test.com")
                .houseNumber("1")
                .flatNumber("1")
                .build();

        customerRepository.save(customerA);

        var cruise = Cruise.builder()
                .startDate(java.time.LocalDate.now())
                .endDate(java.time.LocalDate.now().plusDays(10))
                .routeLength(100.0)
                .loadsNumber(0)
                .ship(ship)
                .srcPort(portA)
                .dstPort(portB)
                .workers(Set.of(captainWorker, worker))
                .build();

        cruiseRepository.save(cruise);

        var load = Load.builder()
                .content("Alcohol")
                .weight(100.0)
                .price(100.0)
                .user(customer)
                .srcPortId(portA)
                .dstPortId(portB)
                .status("NEW")
                .cruise(cruise)
                .build();

        var load2 = Load.builder()
                .content("AAAPI Javy")
                .weight(300.0)
                .price(400.0)
                .user(customer)
                .srcPortId(portA)
                .dstPortId(portB)
                .status("NEW")
                .cruise(cruise)
                .build();


        loadRepository.save(load);
        loadRepository.save(load2);




    }

}
