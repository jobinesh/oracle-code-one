package demo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author Jobinesh
 */
public class EmployeeRepository {

    public static int id = 600;
    static List<Employee> employees = new ArrayList<Employee>() {
        {
            add(new Employee(100, "Matthew", "Weiss", "mweiss@xxx.xxx", 10));
            add(new Employee(200, "Fripp", "Adam", "frippadam@xxx.xxx", 10));
            add(new Employee(300, "Julia", "Nayer", "jnayer@xxx.xxx", 10));
            add(new Employee(400, "Jobinesh", "Purushothaman", "jp@xxx.xxx", 20));
            add(new Employee(500, "Tom", "Adam", "tomadam@xxx.xxx", 20));
            add(new Employee(600, "Steven", "King", "sking@xxx.xxx", 30));
        }
    };

    public List<Employee> getEmployees() {
        return EmployeeRepository.employees;
    }

    public List<Employee> findEmployeesByFilter(EmployeeFilterInput filter) {
        if (filter == null) {
            return EmployeeRepository.employees;
        }
        List<Employee> filteredlist = new ArrayList<>();
        Iterator<Employee> iter = EmployeeRepository.employees.iterator();
        while (iter.hasNext()) {
            Employee emp = iter.next();
            if (filter.getDepartmentId() != null && filter.getDepartmentId().equals(emp.getDepartmentId())) {
                filteredlist.add(emp);
                continue;
            }
            if (filter.getFirstName() != null && filter.getFirstName().equalsIgnoreCase(emp.getFirstName())) {
                filteredlist.add(emp);
                continue;
            }
            if (filter.getLastName() != null && filter.getLastName().equalsIgnoreCase(emp.getLastName())) {
                filteredlist.add(emp);
                continue;
            }
        }
        return filteredlist;
    }

    public void setEmployee(List<Employee> employees) {
        EmployeeRepository.employees = employees;
    }

    public List<Employee> findByDepartmnetId(Integer deptId) {
        ArrayList<Employee> list = new ArrayList<Employee>();
        Iterator<Employee> iter = employees.iterator();
        while (iter.hasNext()) {
            Employee emp = iter.next();
            if (emp.getDepartmentId().equals(deptId)) {
                list.add(emp);
            }
        }
        return list;
    }

    public Employee updateEmployee(Employee emp) {
        Iterator<Employee> iter = getEmployees().iterator();
        while (iter.hasNext()) {
            Employee employee = iter.next();
            if (employee.getEmployeeId().equals(emp.getEmployeeId())) {
                employee.setDepartmentId(emp.getDepartmentId() != null ? emp.getDepartmentId() : employee.getDepartmentId());
                employee.setEmail(emp.getEmail() != null ? emp.getEmail() : employee.getEmail());
                employee.setFirstName(emp.getFirstName() != null ? emp.getFirstName() : employee.getFirstName());
                employee.setLastName(emp.getLastName() != null ? emp.getLastName() : employee.getLastName());
                return employee;
            }
        }
        return null;
    }
}
