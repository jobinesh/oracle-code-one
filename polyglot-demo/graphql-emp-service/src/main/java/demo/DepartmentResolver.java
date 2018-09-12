package demo;

import com.coxautodev.graphql.tools.GraphQLResolver;
import java.util.List;

/**
 *
 * @author Jobinesh
 */
public class DepartmentResolver implements GraphQLResolver<Department> {

    private EmployeeRepository employeeRepository = null;

    DepartmentResolver(EmployeeRepository employeeRepository) {
    
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> employees(Department department) {
        if (department.getDepartmentId() == null) {
            return null;
        }
        return employeeRepository.findByDepartmnetId(department.getDepartmentId());
    }
}
