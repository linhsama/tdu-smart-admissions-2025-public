import { UniversityData } from '../types';

// Define which subjects make up which combination
export const COMBINATION_DEFINITIONS: Record<string, string[]> = {
  "A00": ["Toán", "Lý", "Hóa"],
  "A01": ["Toán", "Lý", "Anh"],
  "A02": ["Toán", "Lý", "Sinh"],
  "B00": ["Toán", "Hóa", "Sinh"],
  "D01": ["Toán", "Văn", "Anh"],
  "D07": ["Toán", "Hóa", "Anh"],
  "D08": ["Toán", "Sinh", "Anh"],
  "D14": ["Văn", "Sử", "Anh"],
  "D15": ["Văn", "Địa", "Anh"],
  "C00": ["Văn", "Sử", "Địa"],
  "C01": ["Văn", "Toán", "Lý"],
  "C02": ["Văn", "Toán", "Hóa"],
  "C04": ["Văn", "Toán", "Địa"],
  "X01": ["Toán", "Văn", "GDKT&PL"],
  "X02": ["Toán", "Văn", "Tin học"],
  "X06": ["Toán", "Văn", "Tin học"], 
  "X10": ["Toán", "Hóa", "Tin học"],
  "B03": ["Toán", "Sinh", "Văn"],
  "D66": ["Văn", "GDCD", "Anh"],
  "D84": ["Toán", "GDCD", "Anh"],
  "X25": ["Toán", "GDKT&PL", "Anh"],
  "A06": ["Toán", "Hóa", "Địa"], 
  "A07": ["Toán", "Lý", "Địa"],
  "B02": ["Toán", "Sinh", "Địa"],
  "X07": ["Toán", "Lý", "Công nghệ"],
  "X26": ["Toán", "Tin học", "Anh"],
  "X78": ["Văn", "GDKT&PL", "Anh"],
  "X14": ["Toán", "Sinh", "Tin học"],
  "X56": ["Toán", "Tin học", "CNCN"], // Công nghệ công nghiệp
  "D10": ["Toán", "Địa", "Anh"],
  "X74": ["Ngữ văn", "Địa lí", "GDKT&PL"],
  "X70": ["Ngữ văn", "Lịch sử", "GDKT&PL"],
  "X21": ["Toán", "Địa lí", "GDKT&PL"]
};

export const SUBJECT_LIST = [
  "Toán", "Văn", "Anh", "Lý", "Hóa", "Sinh", "Sử", "Địa", "GDCD", "Tin học", "GDKT&PL", "Công nghệ"
];

export const QUOTES = [
    { text: "Học tập - Trải nghiệm - Khởi nghiệp - Thành công", author: "Triết lý giáo dục" },
    { text: "Đoàn kết - Hợp tác - Đổi mới - Trí tuệ - Sáng tạo", author: "Giá trị cốt lõi" }
];

export const UNIVERSITY_DATA: UniversityData = {
  general: {
    name: "Trường Đại học Tây Đô",
    code: "DTD",
    address: "Số 68, đường Trần Chiên, phường Cái Răng, TP. Cần Thơ",
    hotline: "0939 028 579",
    zalo: "0939 028 579",
    email: "bantuvan@tdu.edu.vn",
    website: "https://ts.tdu.edu.vn",
    stats: {
      employmentRate: "96%",
      partners: 350,
      years: 19
    },
    description: "Đại học Tây Đô - Trường Đại học tư thục đầu tiên ĐBSCL. Tuyển sinh 2025 với 25 ngành đào tạo, môi trường học tập hiện đại, cam kết việc làm."
  },
  timeline: [
    { event: "Nhận hồ sơ đợt 1", date: "Từ 01/04/2025", desc: "Bắt đầu nhận hồ sơ xét tuyển học bạ trực tiếp và trực tuyến.", icon: "FileText" },
    { event: "Công bố kết quả", date: "21/08/2025", desc: "Công bố danh sách trúng tuyển đợt 1 và gửi giấy báo.", icon: "Bell" },
    { event: "Nhập học đợt 1", date: "08/09/2025", desc: "Tân sinh viên làm thủ tục nhập học chính thức tại trường.", icon: "Star" },
    { event: "Xét tuyển bổ sung", date: "16/09 - 30/09/2025", desc: "Nhận hồ sơ xét tuyển đợt 2 (đối với các ngành còn chỉ tiêu).", icon: "RefreshCw" }
  ],
  scholarships: [
    { name: "Học bổng 10 Triệu", value: "10.000.000đ", amount: 10000000, condition: "Học bạ ≥ 29.5 hoặc Thi THPT ≥ 28.5", minHocBa: 29.5, minTHPT: 28.5, color: "rose", icon: "Award" },
    { name: "Học bổng 5 Triệu", value: "5.000.000đ", amount: 5000000, condition: "Học bạ 28 - 29.5 hoặc Thi THPT 27 - 28.5", minHocBa: 28.0, minTHPT: 27.0, color: "amber", icon: "Star" },
    { name: "Học bổng 2.5 Triệu", value: "2.500.000đ", amount: 2500000, condition: "Học bạ 26 - 28 hoặc Thi THPT 24 - 27", minHocBa: 26.0, minTHPT: 24.0, color: "blue", icon: "Gift" },
    { name: "Học bổng 1.7 Triệu", value: "1.700.000đ", amount: 1700000, condition: "Học bạ 22 - 26 hoặc Thi THPT 20 - 24", minHocBa: 22.0, minTHPT: 20.0, color: "cyan", icon: "Zap" },
    { name: "Học bổng 1.3 Triệu", value: "1.300.000đ", amount: 1300000, condition: "Học bạ 18 - 22 hoặc Thi THPT 18 - 20", minHocBa: 18.0, minTHPT: 18.0, color: "teal", icon: "Check" },
    { name: "Hỗ trợ Hộ khẩu", value: "1.000.000đ", amount: 1000000, condition: "HK Quận Cái Răng hoặc THPT Kết nghĩa.", color: "indigo", icon: "MapPin" },
    { name: "Dân tộc ít người", value: "2.000.000đ", amount: 2000000, condition: "Tân sinh viên là người dân tộc thiểu số.", color: "purple", icon: "Users" },
    { name: "Ngành đặc thù", value: "Giảm 1.500.000đ", amount: 1500000, condition: "Ngành Dinh dưỡng, Kinh doanh quốc tế, Việt Nam học.", color: "emerald", icon: "Tag" }
  ],
  majors: [
    // --- KHỐI SỨC KHỎE ---
    { 
        stt: 1, code: "7720201", name: "Dược học", group: "Sức khỏe", icon: "FlaskConical", 
        tuitionHK1: 25610000, pricePerCredit: 1970000, creditsHK1: 13, 
        benchmarks: { thpt: 19, hocba: 21, dgnl: 600, vsat: 270, notes: "Học bạ: Lớp 12 Giỏi hoặc TN ≥ 8.0" }, 
        combinations: ["A00", "B00", "D07", "C02", "D08", "A02"],
        color: "from-teal-500 to-emerald-600",
        details: { 
            overview: "Đào tạo Dược sĩ đại học chất lượng cao. Thời gian đào tạo 5 năm. Cơ sở vật chất phòng thí nghiệm hiện đại chuẩn quốc tế.", 
            careerPaths: ["Dược sĩ lâm sàng tại bệnh viện", "QA/QC nhà máy dược", "Kinh doanh dược phẩm", "Nghiên cứu viên"], 
            curriculumHighlights: ["Hóa dược & Dược lý", "Bào chế & Công nghệ dược", "Dược lâm sàng", "Quản lý dược"] 
        }
    },
    { 
        stt: 2, code: "7720301", name: "Điều dưỡng", group: "Sức khỏe", icon: "HeartPulse", 
        tuitionHK1: 16120000, pricePerCredit: 1240000, creditsHK1: 13, 
        benchmarks: { thpt: 19, hocba: 17, dgnl: 500, vsat: 225, notes: "Học bạ: Lớp 12 Khá hoặc TN ≥ 6.5" }, 
        combinations: ["A02", "B00", "D08", "B03", "A00"],
        color: "from-cyan-500 to-blue-600",
        details: { 
            overview: "Chăm sóc sức khỏe toàn diện. Chương trình đào tạo bám sát thực tế lâm sàng. Nhu cầu nhân lực rất lớn tại Nhật, Đức.", 
            careerPaths: ["Điều dưỡng viên đa khoa", "Chăm sóc người cao tuổi", "Y tế học đường", "Xuất khẩu lao động diện kỹ sư"], 
            curriculumHighlights: ["Điều dưỡng nội/ngoại", "Hồi sức cấp cứu", "Chăm sóc sức khỏe cộng đồng"] 
        }
    },
    { 
        stt: 3, code: "7720401", name: "Dinh dưỡng", group: "Sức khỏe", icon: "Salad", 
        tuitionHK1: 15340000, pricePerCredit: 1180000, creditsHK1: 13, 
        benchmarks: { thpt: 19, hocba: 17, dgnl: 500, vsat: 225, notes: "Học bạ: Lớp 12 Khá hoặc TN ≥ 6.5" }, 
        combinations: ["A00", "B00", "D07", "D08"],
        color: "from-green-500 to-lime-600",
        details: { 
            overview: "Ngành học xu hướng mới. Sinh viên được giảm 1.500.000đ học phí ngay khi nhập học.", 
            careerPaths: ["Chuyên gia dinh dưỡng lâm sàng", "Tư vấn dinh dưỡng", "An toàn vệ sinh thực phẩm", "Suất ăn công nghiệp"], 
            curriculumHighlights: ["Dinh dưỡng lâm sàng", "Tiết chế", "An toàn thực phẩm"] 
        }
    },
    { 
        stt: 19, code: "7640101", name: "Thú y", group: "Sức khỏe", icon: "Stethoscope", 
        tuitionHK1: 12350000, pricePerCredit: 950000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["B00", "A06", "B02", "C02", "X10", "X14", "D01"], 
        color: "from-amber-500 to-orange-600",
        details: { 
            overview: "Bác sĩ thú y - Ngành hot với thu nhập hấp dẫn. Thực hành tại phòng khám thú y hiện đại của trường.", 
            careerPaths: ["Bác sĩ thú y (Pet clinic)", "Kỹ thuật trại chăn nuôi", "Kinh doanh thuốc thú y", "Kiểm dịch động vật"], 
            curriculumHighlights: ["Phẫu thuật thú y", "Dược lý thú y", "Chẩn đoán hình ảnh"] 
        }
    },

    // --- KINH TẾ ---
    { 
        stt: 4, code: "7380107", name: "Luật kinh tế", group: "Kinh tế", icon: "Scale", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 19.5, hocba: 18, dgnl: 500, vsat: 225 }, 
        combinations: ["C00", "D14", "D84", "D66", "D01", "X25", "X78"],
        color: "from-red-600 to-rose-700",
        details: { overview: "Nắm vững pháp luật trong kinh doanh. Cơ hội trở thành luật sư, chuyên viên pháp chế doanh nghiệp.", careerPaths: ["Chuyên viên pháp chế", "Tư vấn luật", "Tòa án/Viện kiểm sát"], curriculumHighlights: ["Luật thương mại", "Luật sở hữu trí tuệ", "Luật lao động"] }
    },
    { 
        stt: 5, code: "7510605", name: "Logistics và QL chuỗi cung ứng", group: "Kinh tế", icon: "Truck", 
        tuitionHK1: 12090000, pricePerCredit: 930000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C01", "X26", "X02", "X06"],
        color: "from-indigo-500 to-purple-600",
        details: { overview: "Quản trị dòng chảy hàng hóa toàn cầu. Ngành học then chốt trong nền kinh tế hội nhập.", careerPaths: ["Chuyên viên Logistics", "Thu mua & Xuất nhập khẩu", "Quản lý kho bãi"], curriculumHighlights: ["Vận tải đa phương thức", "Quản trị tồn kho", "Thủ tục hải quan"] }
    },
    { 
        stt: 6, code: "7340301", name: "Kế toán", group: "Kinh tế", icon: "Calculator", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C04", "X26", "X02", "X06"],
        color: "from-blue-500 to-indigo-600",
        details: { overview: "Ngôn ngữ của doanh nghiệp. Đào tạo kế toán chuyên nghiệp, am hiểu chuẩn mực quốc tế.", careerPaths: ["Kế toán viên", "Kiểm toán viên", "Tư vấn thuế"], curriculumHighlights: ["Kế toán tài chính", "Kế toán quản trị", "Kiểm toán căn bản"] }
    },
    { 
        stt: 8, code: "7340101", name: "Quản trị kinh doanh", group: "Kinh tế", icon: "Briefcase", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C04", "X26", "X02", "X06"],
        color: "from-amber-500 to-orange-600",
        details: { overview: "Đào tạo CEO và nhà quản lý tương lai. Kỹ năng lãnh đạo và tư duy khởi nghiệp.", careerPaths: ["Nhân viên kinh doanh", "Quản lý dự án", "Khởi nghiệp"], curriculumHighlights: ["Quản trị học", "Marketing căn bản", "Quản trị nhân lực"] }
    },
    { 
        stt: 9, code: "7340115", name: "Marketing", group: "Kinh tế", icon: "Megaphone", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C04", "X26", "X02", "X06"],
        color: "from-pink-500 to-rose-600",
        details: { overview: "Sáng tạo & Truyền thông thương hiệu. Ngành học năng động, thu nhập không giới hạn.", careerPaths: ["Chuyên viên Marketing", "Digital Marketing", "Tổ chức sự kiện"], curriculumHighlights: ["Hành vi khách hàng", "Digital Marketing", "Nghiên cứu thị trường"] }
    },
    { 
        stt: 10, code: "7340120", name: "Kinh doanh quốc tế", group: "Kinh tế", icon: "Globe2", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C04", "X26", "X02", "X06"],
        color: "from-sky-500 to-blue-600",
        details: { overview: "Làm việc trong môi trường toàn cầu. Giảm 1.500.000đ học phí nhập học.", careerPaths: ["Xuất nhập khẩu", "Đầu tư quốc tế", "Logistics quốc tế"], curriculumHighlights: ["Thanh toán quốc tế", "Vận tải bảo hiểm", "Đàm phán quốc tế"] }
    },

    // --- DU LỊCH & DỊCH VỤ ---
    { 
        stt: 11, code: "7810103", name: "QT Dịch vụ Du lịch & Lữ hành", group: "Du lịch", icon: "Plane", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C04"],
        color: "from-teal-400 to-cyan-500",
        details: { overview: "Ngành công nghiệp không khói với tiềm năng phát triển mạnh mẽ. Thực hành tại các resort 5 sao.", careerPaths: ["Hướng dẫn viên", "Điều hành tour", "Thiết kế tour"], curriculumHighlights: ["Tuyến điểm du lịch", "Nghiệp vụ hướng dẫn", "Quản trị lữ hành"] }
    },
    { 
        stt: 13, code: "7810201", name: "Quản trị khách sạn", group: "Du lịch", icon: "Hotel", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A01", "D01", "C04"],
        color: "from-orange-400 to-amber-500",
        details: { overview: "Dịch vụ đẳng cấp, chuyên nghiệp. Cơ hội thăng tiến nhanh trong ngành F&B và lưu trú.", careerPaths: ["Quản lý khách sạn/Resort", "Lễ tân", "Quản lý buồng phòng"], curriculumHighlights: ["Nghiệp vụ lễ tân", "Quản trị buồng phòng", "Bar & Bartender"] }
    },

    // --- KỸ THUẬT & CÔNG NGHỆ ---
    { 
        stt: 22, code: "7480201", name: "Công nghệ thông tin", group: "Công nghệ", icon: "Code2", 
        tuitionHK1: 10530000, pricePerCredit: 810000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A02", "A01", "C01", "X06", "X07"],
        color: "from-violet-600 to-purple-700",
        details: { overview: "Đón đầu kỷ nguyên số và AI. Lập trình, phát triển phần mềm và quản trị mạng.", careerPaths: ["Lập trình viên (Web/App)", "Chuyên viên mạng", "Tester", "Data Analyst"], curriculumHighlights: ["Lập trình Java/C#", "Cấu trúc dữ liệu", "Trí tuệ nhân tạo"] }
    },
    { 
        stt: 23, code: "7320104", name: "Truyền thông đa phương tiện", group: "Công nghệ", icon: "Clapperboard", 
        tuitionHK1: 10660000, pricePerCredit: 820000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A01", "C00", "D01", "D15", "A00", "X02"],
        color: "from-fuchsia-600 to-pink-600",
        details: { overview: "Kết hợp công nghệ và nghệ thuật. Sản xuất nội dung số, thiết kế đồ họa và làm phim.", careerPaths: ["Content Creator", "Dựng phim/Video Editor", "Biên tập viên"], curriculumHighlights: ["Kỹ thuật quay phim", "Dựng phim phi tuyến", "Thiết kế đồ họa động"] }
    },
    { 
        stt: 24, code: "7210403", name: "Thiết kế đồ họa", group: "Công nghệ", icon: "PenTool", 
        tuitionHK1: 10920000, pricePerCredit: 840000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["C04", "D01", "D10", "D15", "A00", "X02", "X06", "X07"],
        color: "from-orange-500 to-red-500",
        details: { overview: "Mỹ thuật công nghiệp ứng dụng. Thiết kế 2D, 3D, nhận diện thương hiệu và bao bì.", careerPaths: ["Designer 2D/3D", "Thiết kế nhận diện thương hiệu", "UI/UX Designer"], curriculumHighlights: ["Màu sắc & Bố cục", "Đồ họa Vector", "Thiết kế bao bì"] }
    },
    { 
        stt: 20, code: "7510102", name: "CN Kỹ thuật CT Xây dựng", group: "Kỹ thuật", icon: "HardHat", 
        tuitionHK1: 10530000, pricePerCredit: 810000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["A00", "A02", "A01", "C01", "X06", "X07", "D01"],
        color: "from-slate-600 to-gray-700",
        details: { overview: "Xây dựng dân dụng & công nghiệp. Đào tạo kỹ sư xây dựng có năng lực thiết kế và thi công.", careerPaths: ["Kỹ sư giám sát", "Thiết kế kết cấu", "Quản lý dự án xây dựng"], curriculumHighlights: ["Sức bền vật liệu", "Kết cấu bê tông", "Thi công xây dựng"] }
    },
    
    // --- XH & NV ---
    { 
        stt: 15, code: "7220201", name: "Ngôn ngữ Anh", group: "XH & NV", icon: "Languages", 
        tuitionHK1: 10400000, pricePerCredit: 800000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225, notes: "Ưu tiên IELTS" }, 
        combinations: ["D01", "D14", "D15", "D66", "X78"],
        color: "from-rose-500 to-red-600",
        details: { overview: "Cầu nối hội nhập quốc tế. Thành thạo tiếng Anh thương mại và kỹ năng biên phiên dịch.", careerPaths: ["Biên - Phiên dịch", "Giáo viên Tiếng Anh", "Thư ký/Trợ lý"], curriculumHighlights: ["Kỹ năng biên phiên dịch", "Tiếng Anh thương mại", "Phương pháp giảng dạy"] }
    },
    { 
        stt: 25, code: "7229030", name: "Văn học", group: "XH & NV", icon: "Book", 
        tuitionHK1: 10010000, pricePerCredit: 770000, creditsHK1: 13, 
        benchmarks: { thpt: 16.5, hocba: 15, dgnl: 500, vsat: 225 }, 
        combinations: ["C04", "C00", "D14", "D15", "D01"],
        color: "from-stone-500 to-stone-700",
        details: { overview: "Nền tảng của Báo chí, Truyền thông & Văn chương. Rèn luyện tư duy ngôn ngữ sắc bén.", careerPaths: ["Biên tập viên", "Nhà báo/Phóng viên", "Copywriter"], curriculumHighlights: ["Văn học Việt Nam", "Lý luận văn học", "Báo chí truyền thông"] }
    }
  ],
  admissionMethods: [
      { name: "Học bạ THPT", desc: "Xét điểm trung bình học tập THPT (Lớp 12, hoặc 3 học kỳ, hoặc cả 3 năm).", icon: "BookOpen" },
      { name: "Thi THPT 2025", desc: "Xét tuyển dựa trên kết quả kỳ thi tốt nghiệp THPT 2025 theo tổ hợp môn.", icon: "PenTool" },
      { name: "ĐGNL ĐHQG", desc: "Sử dụng kết quả kỳ thi Đánh giá năng lực của ĐHQG TP.HCM năm 2025.", icon: "Zap" },
      { name: "Kỳ thi V-SAT", desc: "Xét tuyển dựa trên kết quả kỳ thi đánh giá đầu vào V-SAT.", icon: "Target" }
  ],
  highlights: [
    { title: "Học bổng", desc: "Dành cho 2K7", icon: "Award", color: "rose", stat: "2000+" },
    { title: "Ngành đào tạo", desc: "Đa dạng lĩnh vực", icon: "BookOpen", color: "amber", stat: "25" },
    { title: "Cơ hội việc làm", desc: "Sau tốt nghiệp", icon: "Briefcase", color: "emerald", stat: "96%" },
    { title: "Doanh nghiệp", desc: "Đối tác liên kết", icon: "Users", color: "indigo", stat: "350+" },
    { title: "Tầm nhìn", desc: "Đại học tư thục", icon: "Globe2", color: "blue", stat: "Top ĐBSCL" }
  ],
  testimonials: [
    { name: "Trần Thị Cẩm Tú", role: "Cựu SV Dược K8", quote: "Môi trường học tập năng động, cơ sở vật chất hiện đại giúp mình tự tin khi làm việc tại chuỗi nhà thuốc lớn.", color: "bg-emerald-600" },
    { name: "Lê Minh Khang", role: "SV CNTT K16", quote: "Thầy cô rất nhiệt tình, mình được giới thiệu thực tập ngay từ năm 3 và có việc làm trước khi ra trường.", color: "bg-blue-600" },
    { name: "Nguyễn Hoàng Nam", role: "SV Du lịch K15", quote: "TDU cho mình cơ hội trải nghiệm thực tế rất nhiều, các chuyến đi tour giúp mình trưởng thành hơn.", color: "bg-amber-600" },
    { name: "Phạm Ngọc Hân", role: "Tân SV 2K6", quote: "Mình ấn tượng với quy trình xét tuyển nhanh chóng và sự hỗ trợ nhiệt tình của các anh chị tư vấn.", color: "bg-rose-600" }
  ],
  news: [
    {
      id: 1,
      title: "Thông báo tuyển sinh Đại học chính quy năm 2025",
      slug: "thong-bao-tuyen-sinh-2025",
      summary: "Trường Đại học Tây Đô thông báo tuyển sinh 25 ngành đào tạo với 4 phương thức xét tuyển linh hoạt cho thí sinh 2K7.",
      content: "Nội dung chi tiết đang cập nhật...",
      date: "01/03/2025",
      category: "Tuyển sinh",
      tags: ["Tuyển sinh 2025", "Đại học chính quy"],
      color: "blue",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Admission+2025",
      status: 'published', views: 1200
    },
    {
      id: 2,
      title: "Ngày hội tư vấn tuyển sinh - Hướng nghiệp 2025",
      slug: "ngay-hoi-tu-van-2025",
      summary: "Sự kiện lớn nhất năm dành cho học sinh THPT với sự tham gia của hơn 5000 học sinh từ các trường trong khu vực ĐBSCL.",
      content: "Nội dung chi tiết đang cập nhật...",
      date: "15/03/2025",
      category: "Hoạt động",
      tags: ["Sự kiện", "Hướng nghiệp"],
      color: "rose",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Open+Day",
      status: 'published', views: 850
    },
    {
      id: 3,
      title: "Lễ ký kết hợp tác doanh nghiệp đợt 1 năm 2025",
      slug: "ky-ket-hop-tac-2025",
      summary: "TDU ký kết thỏa thuận hợp tác với 20 doanh nghiệp lớn, mở rộng cơ hội thực tập và việc làm cho sinh viên.",
      content: "Nội dung chi tiết đang cập nhật...",
      date: "10/02/2025",
      category: "Hợp tác",
      tags: ["Doanh nghiệp", "Việc làm"],
      color: "emerald",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Partnership",
      status: 'published', views: 600
    },
    {
      id: 4,
      title: "Sinh viên TDU đạt giải Nhất cuộc thi khởi nghiệp",
      slug: "sinh-vien-tdu-khoi-nghiep",
      summary: "Dự án nông nghiệp công nghệ cao của nhóm sinh viên TDU xuất sắc vượt qua 50 đội thi để giành giải Nhất cấp thành phố.",
      content: "Nội dung chi tiết đang cập nhật...",
      date: "20/03/2025",
      category: "Thành tích",
      tags: ["Sinh viên", "Khởi nghiệp"],
      color: "amber",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Startup+Win",
      status: 'published', views: 900
    },
    {
        id: 5,
        title: "Hội thảo quốc tế về Du lịch bền vững tại ĐBSCL",
        slug: "hoi-thao-du-lich-ben-vung",
        summary: "Khoa Du lịch tổ chức hội thảo với sự tham gia của các chuyên gia đầu ngành và đối tác quốc tế.",
        content: "...",
        date: "05/04/2025",
        category: "Hội thảo",
        tags: ["Du lịch", "Quốc tế"],
        color: "teal",
        image: "https://placehold.co/600x400/e2e8f0/64748b?text=Tourism+Seminar",
        status: 'published', views: 450
    },
    {
        id: 6,
        title: "TDU trao 500 suất học bổng cho tân sinh viên khó khăn",
        slug: "trao-hoc-bong-tan-sinh-vien",
        summary: "Quỹ học bổng TDU tiếp sức đến trường, cam kết không để sinh viên nào phải bỏ học vì học phí.",
        content: "...",
        date: "25/08/2025",
        category: "Học bổng",
        tags: ["Hỗ trợ", "Sinh viên"],
        color: "indigo",
        image: "https://placehold.co/600x400/e2e8f0/64748b?text=Scholarships",
        status: 'published', views: 1500
    }
  ],
  scholarshipSteps: [
    { step: "1", title: "Đăng ký xét tuyển", desc: "Nộp hồ sơ trực tuyến hoặc trực tiếp tại trường." },
    { step: "2", title: "Xét duyệt tự động", desc: "Hệ thống sẽ tự động xét mức học bổng dựa trên điểm của bạn." },
    { step: "3", title: "Nhận thông báo", desc: "Nhà trường gửi giấy báo trúng tuyển kèm quyết định học bổng." }
  ]
};

// Updated System Instruction with Empathy, Context, and Persuasiveness
export const SYSTEM_INSTRUCTION = `Bạn là TDU BOT - Chuyên viên Tư vấn Tuyển sinh ảo (AI) của Trường Đại học Tây Đô (DTD).

**VAI TRÒ (PERSONA):** 
- Bạn là một người anh/chị khóa trên hoặc một tư vấn viên RẤT ÂN CẦN, NHIỆT TÌNH, THẤU CẢM và CHUYÊN NGHIỆP.
- Giọng điệu: Thân thiện, gần gũi (xưng "mình" - "bạn"), biết dùng emoji hợp lý (✨, 🎓, 📝) để cuộc trò chuyện sinh động.
- Bạn luôn quan tâm đến cảm xúc của thí sinh (lo lắng về điểm số, băn khoăn về ngành học).

**NGUYÊN TẮC CỐT LÕI (RAG STRICT MODE):**
1. **Ưu tiên tuyệt đối dữ liệu trong <context>:** Khi trả lời về Học phí, Điểm chuẩn, Học bổng, Ngày tuyển sinh, BẮT BUỘC phải dùng thông tin được cung cấp trong thẻ <context>.
2. **Không bịa đặt:** Nếu thông tin không có trong <context>, hãy nói: "Về vấn đề này, mình chưa có thông tin chính xác trong hệ thống. Bạn vui lòng gọi hotline 0939 028 579 để được thầy cô giải đáp kỹ hơn nhé! 📞".
3. **Định dạng dữ liệu:**
   - Khi liệt kê danh sách (Ngành học, Hồ sơ): BẮT BUỘC dùng Markdown Bullet Points (- Item).
   - Khi so sánh hoặc đưa ra số liệu (Học phí, Điểm chuẩn): BẮT BUỘC dùng Markdown Table (| Cột 1 | Cột 2 |).
   - Các thông tin quan trọng (Hạn chót, Số tiền, Điểm): BẮT BUỘC in đậm (**Bold**).

**QUY TRÌNH TRẢ LỜI:**
1. **Đồng cảm & Kết nối:** Luôn bắt đầu bằng một câu chào thân thiện hoặc đồng cảm với vấn đề của người hỏi.
   - Ví dụ: "Chào [Tên User], mình hiểu bạn đang lo lắng về điểm số..."
2. **Cung cấp thông tin (Rõ ràng & Đẹp):** Trình bày thông tin chính xác, ngắn gọn, sử dụng bảng/danh sách.
3. **Gợi ý hành động (Call to Action):** Luôn hướng người dùng đến bước tiếp theo (Đăng ký xét tuyển, Xem học bổng, Chat tiếp về ngành khác).

**ĐỊNH DẠNG QUICK REPLIES:**
Cuối câu trả lời, LUÔN LUÔN kèm theo dòng gợi ý nhanh theo cú pháp:
///QUICK_REPLIES///Gợi ý 1|Gợi ý 2|Gợi ý 3

Ví dụ mẫu:
User: "Ngành Dược học phí bao nhiêu?"
Bot:
"Chào bạn! 👋 Mình rất vui được chia sẻ thông tin về ngành Dược - một trong những ngành mũi nhọn tại ĐH Tây Đô.

Theo thông báo học phí năm 2025, mức học phí HK1 cho ngành Dược như sau:

| Ngành học | Học phí HK1 | Đơn giá tín chỉ |
| :--- | :--- | :--- |
| **Dược học** | **25.610.000đ** | 1.970.000đ |

*Lưu ý: Học phí này đã ổn định và trường có rất nhiều gói học bổng hấp dẫn cho tân sinh viên Dược đó ạ!* ✨

Bạn có muốn mình tư vấn thêm về **Học bổng** hay **Điểm chuẩn** ngành này không?
///QUICK_REPLIES///Học bổng ngành Dược|Điểm chuẩn Dược|Cách nộp hồ sơ"`;
