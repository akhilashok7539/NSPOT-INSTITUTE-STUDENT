export const endPoints = {
    login: 'user/login',

    GetInstituteInfo: 'institute/',
    Get_socialMedia: 'institute/social-media/', // :instituteId
    Get_virtualTour: 'institute/virtual-tour/', // :instituteId
    Get_highlights: 'institute/highlights/', // :instituteId
    Get_boardOfCouncil: 'institute/board-of-council/', // :instituteId
    Get_gallery: 'institute/gallery/', // :instituteId
    Get_bankDetails: 'institute/bank-details/', // :instituteId
    Get_course: 'institute/course/', // :courseId or ?where={}
    Get_course_filter: 'institute/course/filter', // post
    Get_courseFee: 'institute/course/fees/', // :courseId
    Get_aptitudeTests: 'institute/aptitude-tests/', // :instituteId
    Get_aptitudeTests_questions: 'institute/aptitude-tests/', // :testId

    // Common endpoints
    instituteTypes: 'institute-types',
    Get_academicLevels: 'academic-level/',
    Get_academicLevel_Courses: 'academic-level/courses/', //:accademicLevelId
    Get_courseTypes: 'course-types/',
    Get_universityTypes: 'university-types/',
    Get_paymentTenures: 'payment-tenures/',
    Get_courseStream: 'course-stream/',
    Get_courseStream_specialization: 'course-stream/specialization/', //courseStreamId

    Get_studentEducations: 'studentEducations/', // studentId
    Get_studentEntranceExams: 'studentEntranceExams/', // studentId
    Get_studentCertificates: 'studentCertificates/', // studentId
    Get_additionalField: 'applicationForm/getAdditional/', // :instituteId/:formSection
    Get_removedField: 'applicationForm/getRemoved/', // :instituteId/:formSection
    Submit_applicationForm: 'applicationForm/submit/',
    Get_applicationForm: 'applicationForm/applications/', // applicationId


    Get_notifications: 'notifications/', //where[userId]
    Update_notifications: 'notifications/update',

    Create_courseFeeOrder: 'payment/courseFee/create',
    Confirm_courseFeeOrder: 'payment/courseFee/confirm',
    Cancel_courseFeeOrder: 'payment/courseFee/cancel',




    UploadFile: 'common/uploadFile',
    student: 'student/',

    create: 'create/',
    update: 'update/',
    getById: 'getById/' //id

};
