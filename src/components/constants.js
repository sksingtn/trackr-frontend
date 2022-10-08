
export const ADMIN_ROLE = "ADMIN"

export const FACULTY_ROLE = "FACULTY"

export const STUDENT_ROLE = "STUDENT"

export const USER_MAPPING = {
    [ADMIN_ROLE]: "/admin/dashboard",
    [FACULTY_ROLE]: "/faculty/dashboard",
    [STUDENT_ROLE]: "/student/dashboard"
}

export const IDLE_STATE = 'idle';
export const PENDING_STATE = 'pending';
export const FETCHED_STATE = 'fetched';

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', "Sunday"];