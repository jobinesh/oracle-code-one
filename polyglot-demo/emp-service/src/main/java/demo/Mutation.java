package demo;



import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import graphql.schema.DataFetchingEnvironment;

/**
 * Mutation root
 */
public class Mutation implements GraphQLMutationResolver {

    DepartmentRepository departmentRepository = null;
    EmployeeRepository employeeRepository = null;

    public Mutation(DepartmentRepository deptRepository, EmployeeRepository empRepo) {
        this.departmentRepository = deptRepository;
        this.employeeRepository = empRepo;
    }

    public Employee updateEmployee(EmployeeInput input) {

        Employee modifiedOne = employeeRepository.updateEmployee(new Employee(input.getEmployeeId(), input.getFirstName(), input.getLastName(), input.getEmail(), input.getDepartmentId()));
        return modifiedOne;
    }

 
}
