package demo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class DepartmentRepository {

    public static int id = 30;
    static List<Department> departments = new ArrayList<Department>() {
        {

            add(new Department(10, "HR", 100, 2000));
            add(new Department(20, "IT", 200, 2000));
            add(new Department(30, "Sales", 300, 2000));
        }
    };

    public DepartmentRepository() {

    }

    public List<Department> getDepartments() {
        return DepartmentRepository.departments;
    }

    public void setDepartments(List<Department> departments) {
        DepartmentRepository.departments = departments;
    }

    public Department createDepartment(Department department) {
        DepartmentRepository.departments.add(department);
        return department;

    }

    public Department updateDepartment(Department department) {
        Iterator<Department> iter = getDepartments().iterator();
        while (iter.hasNext()) {
            Department dept = iter.next();
            if (dept.getDepartmentId().equals(department.getDepartmentId())) {
                dept.setDepartmentName(department.getDepartmentName() != null ? department.getDepartmentName() : dept.getDepartmentName());
                dept.setLocationId(department.getLocationId() != null ? department.getLocationId() : dept.getLocationId());
                dept.setManagerId(department.getManagerId() != null ? department.getManagerId() : dept.getManagerId());
                return dept;
            }
        }
        return null;
    }
}
