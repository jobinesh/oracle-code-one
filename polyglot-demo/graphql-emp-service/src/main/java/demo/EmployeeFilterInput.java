package demo;

/**
 *
 * @author Jobinesh
 */
public class EmployeeFilterInput {

    private String firstName;
    private String lastName;
    private Integer departmentId;

    public EmployeeFilterInput() {
    }

    public EmployeeFilterInput(String firstName, String lastName, Integer departmentId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.departmentId = departmentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

}
