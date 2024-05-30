export interface EmployeInformation {
    employeeName: string
    employeeposition: string
    employeeUrl: string
    timeIn?: string
    timeOut?: string
    teamMate?: TeamMate
}

export interface TeamMate {
    supervisor: string
    teamMember: string[]
    coWorker: string[]
}

export interface companyNewsProps {
    title: string;
    subject_information: string;
    subject_image: string;
    isShow: boolean;
}