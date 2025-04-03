import {
    AboutCoursePage,
	CertPage,
	CourseLearningPage,
	CourseListingPage,
	GenerateCertPage,
	Homepage,
	MessagingInner,
	MessagingPage,
	MyProfilePage,
	NotificationsPage,
	OthersProfilePage,
	UploadPage,
	WalletPage,
} from "../pages/STUDENT";
import { URL } from "../utils/constants";

const studentRoutes = [
    {
        path: URL.HOME,
        index: true,
        element: (<Homepage/>),
        name: 'Home',
    },
    {
        path: URL.COURSELISTING,
        element: (<CourseListingPage/>),
        name: 'Course_Listing',
    },
    {
        path: URL.ABOUTCOURSE + ":id",
        element: (<AboutCoursePage/>),
        name: 'Course_Details',
    },
    {
        path: URL.LEARNING,
        element: <CourseLearningPage />,
        name: 'Course_Learning',
    },
    {
        path: URL.PROFILE,
        element: <MyProfilePage />,
        name: 'Profile',
    },
    {
        path: URL.BIO,
        element: <OthersProfilePage />,
        name: 'Friend Profile',
    },
    {
        path: URL.WALLET,
        element: <WalletPage />,
        name: 'Wallet',
    },
    {
        path: URL.GENERATE_CERTIFICATE,
        element: <GenerateCertPage />,
        name: 'Certificate',
    },
    {
        path: "/new/certificate",
        element: <CertPage />,
        name: 'New Certificate',
    },
    {
        path: URL.NOTIFICATION,
        element: <NotificationsPage />,
        name: 'Notifications',
    },
    {
        path: URL.UPLOAD,
        element: <UploadPage />,
        name: 'Upload',
    },
    {
        path: URL.MESSAGING,
        element: <MessagingPage />,
        name: 'Messaging',
    },
    {
        path: URL.MESSAGING + "/:id",
        element: <MessagingInner />,
        name: 'Messaging Inner',
    },
        
]

export default studentRoutes;