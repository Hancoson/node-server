/**
 * Created by Guoxing.han on 2016-5-13.
 */
class Employee{
    constructor(id, name, dob){
        this.id = id;
        this.name=name;
        this.dob= dob;
    }
    getAge(){
        return (new Date()).getYear() - this.dob.getYear();
    }
}
function getEmployee(id, name, dob){
    return new Employee(id, name, dob);
}
var x = new Employee(1, "Rina", new Date(1987, 1, 22));
export {Employee, getEmployee};