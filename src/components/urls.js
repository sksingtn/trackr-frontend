
export const BASE_URL = 'http://localhost:8000/api'

export const COMMON_LOGIN = '/login/'
export const COMMON_LOGOUT = '/logout/'
export const COMMON_VIEW_PROFILE = '/profile/'
export const TOGGLE_NOTIFICATION = '/toggle-notification/'
export const UPLOAD_PROFILE_IMAGE = '/upload-profile-image/'
export const VIEW_ACTIVITY = '/show-activity/'
export const MARK_ACTIVITY_AS_READ = '/mark-activity/'
export const VIEW_BROADCAST = '/show-broadcast/'
export const VIEW_BROADCAST_AS_READ = '/mark-broadcast/'

export const ADMIN_LIST_BATCH = '/admin/batch/'
export const ADMIN_LIST_CREATE_FACULTY = '/admin/faculty/'
export const ADMIN_CREATE_SLOT = '/admin/slot/'
export const adminSlotRetriveUpdateDeleteUrl = (slotId) => `/admin/slot/${slotId}/`
export const adminBatchRetriveUrl = (batchId) => `/admin/batch/${batchId}/`
export const adminBatchStatusToggle = (batchId) => `/admin/batch-active-toggle/${batchId}/`

export const FACULTY_VIEW_TIMELINE = '/faculty/timeline/'

export const STUDENT_VIEW_TIMELINE = '/student/timeline/'


