package <%= packageName %>.rest;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class <%= UserRestLayer %> implements <%= IUserRestLayer %> {

    public UserRestLayer() {
    }

    @RequestMapping(value = "/yourPath/", method = GET)
    public Iterable<T> findAll() {
        return null;
    }
}