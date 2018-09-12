package demo;

//import com.coxautodev.graphql.tools.GraphQLRootResolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import java.util.List;

/**
 * Query root. Contains top-level queries.
 */
public class Query implements GraphQLQueryResolver {

    private final DepartmentRepository deptRepository;
    private final EmployeeRepository employeeRepository;

    public Query(DepartmentRepository deptRepository, EmployeeRepository employeeRepository) {
        this.deptRepository = deptRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Department> departments() {
        return deptRepository.getDepartments();
    }

    public List<Employee> employees() {
        return employeeRepository.getEmployees();
    }

    public List<Employee> employeesByFilter(EmployeeFilterInput filter) {
        return employeeRepository.findEmployeesByFilter(filter);
    }
}
