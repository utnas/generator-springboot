package <%= packageName %>.rest;

interface <%= IUserRestLayer %>{

    Iterable<T> findAll();

    T findByName(final String name);

    T findById(final long id);

    boolean create(final String... params);

    boolean update(final String ... values);

    void delete(final long id);
}