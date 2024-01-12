package com.armator.service;


import com.armator.model.Load;
import com.armator.repositoriy.LoadRepository;
import com.armator.repositoriy.PortRepository;
import com.armator.repositoriy.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final PortRepository portRepository;
    private final LoadRepository loadRepository;
    private final UserRepository userRepository;
    public List<Load> searchLoad(String searchString){

        if (searchString.isEmpty()){
            return loadRepository.findAll();
        }

        return loadRepository.loadSearch(searchString);
    }
}
