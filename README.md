<div align="center">
<h1>Flat Maintenance System</h1>  

**A Smart Browser-Based Maintenance Tracking System**  
Built for residential societies and apartment communities using  
**HTML → CSS → JavaScript**
</div>

---

## Σ Project Overview

The **Flat Maintenance System** is a fully interactive, web-based solution that empowers society administrators to:

- Track and manage flat-wise maintenance payments  
- Define flat statuses (Owned, Rented, Empty) with visual tags  
- Auto-sync selected months across form and card UI  
- Generate professional PDF reports grouped by year  
- Maintain offline functionality through browser-local storage  

~ 100% frontend-powered — no backend or database required.  

---

## Σ Key Features  

-> Responsive & mobile-friendly layout using modern CSS Grid/Flex  
-> Flat card design with real-time month checkbox synchronization  
-> Status-based filtering and tag rendering (Owned, Rented, Empty)  
-> Dropdown-based multiple-month selection integrated with UI cards  
-> Generate UI-styled PDF reports using `jsPDF`  
-> PDF excludes empty-status flats automatically  
-> Auto-detect current year and group pending months by year  
-> Clean visual search bar with Show All functionality  
-> Dynamic flat list from predefined array (static control)  

---

## Σ Modern UI/UX Design Highlights  

→ **Card-Based Layout** with flat-specific grouping  
→ **Glassmorphism Effect** for flat cards (translucent + shadow)  
→ **Neumorphism Button Design**: Soft UI with inset shadows  
→ **Dark-Blue and White Theme** with soft rounded edges  
→ **Grid Responsive Layout**: Adaptive across desktops, tablets, phones  
→ **Floating Action Buttons** for PDF and Reset actions  
→ **Smooth Transitions** on card update, search, and toggles  
→ **Sticky Navigation Bar** with tab routing animation  
→ **Font Customization** for clarity and aesthetics using `Poppins` and `Roboto`

---

## Σ Tech Stack  

**Frontend Technologies**  
- HTML5 → Semantic layout & forms  
- CSS3 → Custom card system, neumorphism, grid responsiveness  
- JavaScript → DOM manipulation, logic control, UI-PDF sync  

**Libraries**  
- [`jsPDF`](https://github.com/parallax/jsPDF) → For generating styled PDF reports  

**Storage**  
- `localStorage` → Client-side persistent data management  

---

## Σ System Modules

| Module Name         | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| **Dashboard**       | Lists all flats with real-time payment and status summary                   |
| **Payment Form**    | Month selector (multi), amount input, auto checkbox sync                    |
| **Flat Cards**      | Status-based cards with month checkboxes and UI badges                      |
| **PDF Generator**   | Professional table layout, multi-year grouping, styled output               |
| **Search Utility**  | Search flats by number with instant filtering & "Show All" reset option     |
| **Year Handling**   | Auto-calculated from system date to reflect actual pending payments         |

---

## Σ Visual Theme Highlights (CSS Designs Used)

-> **Glassmorphism UI** for flat cards: `backdrop-filter`, semi-transparent panels  
-> **Neumorphic Inputs/Buttons**: `box-shadow` inner/outer dual-tone  
-> **Grid-Based Layouts**: Clean responsive rows & cards on all screen sizes  
-> **Animated Typewriter Text**: Title subtitle showing developer credits  
-> **Dynamic Color Codes**:  
   → Owned → Green Card  
   → Rented → Orange Card  
   → Empty → Grey Card (excluded in PDF)  
-> **PDF Table Styling**: Mimics UI → Light borders, headers in bold blue, alternating row colors  

---

## Σ Future Enhancements

-> User Authentication and Role-based Access (Admin vs Members)  
-> Firebase/Node.js backend integration for cloud storage  
-> Payment gateway or QR code support for monthly payments  
-> Graph-based trends: Payments by month/flat  
-> Reminders/Notifications to members for dues  
-> Secure OTP-based member login  
-> Admin panel with export tools (CSV, Excel, XLSX)

---

## Σ Developer Credits

--- Kush Amit Shah  
--- Diploma in Computer Engineering  
--- B.Tech (Pursuing)
--- Gujarat, India  
--- Mail: kushshah900@gmail.com  
--- Interests: Cybersecurity | Web Development | Logical Programming  
