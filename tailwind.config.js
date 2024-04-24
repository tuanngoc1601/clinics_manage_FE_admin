/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        115: "115px",
        260: "260px",
      },
      fontSize: {
        '10px': "10px",
        '13px': "13px",
        '15px': "15px",
        "22px": "22px",
        '26px': "26px",
        '27px': "27px",
      },
      margin: {
        "260px": "260px",
      },
      colors: {
        textBar: "#969495",
        textNav: "#111111",
        textPlaceholder: "#999999",
        textAddress: "#666666",
        textBorder: "#dddddd",
        bgTimeSchedule: "#eeeeee",
        bgFooter: "#efefef",
        bgFooterMedia: "#64b9e5",
        bgDoctorBooking: "#f6f6f6",
        bgNote: "#D4EFFC",
        bgIntro: "#FFECB2",
        bgIntroduction: "#D4EFFB",
        bgButtonBooking: "#ffc419",
        bgInputSearch: "#f5f5f5",
        bgKey: "#45bee5",
        bgClinicHeader: "#ffffffcc",
        boderItem: "#f1f1f1",
        borderPrice: "#f89008",
        bgReaction: "#1877F2",
        bgIntro: "#F9F9F9",
        textPrimary: "#45c3d2",
        textNameDoctor: "#113135",
        textDate: "#337ab7",
        textDesc: "#626262",
        detailBtn: "#daf3f6",
        navActive: "#B511B8",
        headingColor: "#1a1a1a",
        textColor: "#333333",
        textBooking: "#555555",
        primary: "#EDFFFA",
      }
    },
  },
  plugins: [],
}

