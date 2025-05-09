export const tokenConfig = () => {
    const token = localStorage.getItem("token")

    const headers = {
        "Authorization": `Bearer ${token}`
    }
    return headers
}

export const authToken = localStorage.getItem("token")

const courseData = [
    {
      id: 1,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 2,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    },
    {
      id: 3,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 4,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 5,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 6,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 7,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 8,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 9,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 10,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 11,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 12,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 13,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 14,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    },
    {
      id: 15,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 16,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 17,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 18,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    }, {
      id: 19,
      title: "Responsive Web Design Essentials - HTML5 CSS Bootstrap",
      instructor: "John Doe",
      email: "admin@example.com",
      category: "Responsive Design",
      lesson: 13,
      section: 4,
      enrollmentHistory: 4,
      status: "Active",
      price: 25,
      originalPrice: 30
    },
    {
      id: 20,
      title: "Build Websites from Scratch with HTML & CSS",
      instructor: "James Marryatt",
      email: "instructor@example.com",
      category: "HTML & CSS",
      lesson: 7,
      section: 4,
      enrollmentHistory: 1,
      status: "Active",
      price: 0,
      isFree: true
    },
  ];
  
