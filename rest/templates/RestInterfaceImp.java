package <%= packageName %>.rest;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class <%= RestInterfaceImpl %> implements <%= RestInterface %> {

    public UserRestLayer() {
    }

    @RequestMapping(value = "/yourPath/", method = GET)
    public Iterable<T> findAll() {
        return null;
    }
}