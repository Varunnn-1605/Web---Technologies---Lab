export const navData = [
  { id: 'home', label: 'Home', path: '/' },
  {
    id: 'about',
    label: 'About Us',
    path: '/about',
    dropdown: [
      { label: 'Vision & Mission', path: '/about/vision', desc: 'Our core purpose and aspirations' },
      { label: 'Leadership', path: '/about/leadership', desc: 'Board of Governors & Deans' },
      { label: 'University History', path: '/about/history', desc: 'A legacy of excellence since 1965' }
    ]
  },
  {
    id: 'academics',
    label: 'Academics',
    path: '/academics',
    dropdown: [
      { label: 'Undergraduate', path: '/academics/undergraduate', desc: 'B.Tech, B.Sc, B.A, B.Com programs' },
      { label: 'Postgraduate', path: '/academics/postgraduate', desc: 'M.Tech, M.Sc, MBA, M.A programs' },
      { label: 'Doctoral Programs', path: '/academics/doctoral', desc: 'Ph.D & Post-Doctoral Fellowships' }
    ]
  },
  {
    id: 'admissions',
    label: 'Admissions',
    path: '/admissions',
    dropdown: [
      { label: 'Overview & Criteria', path: '/admissions/overview', desc: 'Eligibility, dates & procedures' },
      { label: 'Fee Structure', path: '/admissions/fees', desc: 'Tuition fees & scholarship opportunities' },
      { label: 'Apply Online', path: '/admissions/apply', desc: 'Start your application portal' }
    ]
  },
  {
    id: 'research',
    label: 'Research',
    path: '/research',
    dropdown: [
      { label: 'Research Centers', path: '/research/centers', desc: 'State-of-the-art specialized labs' },
      { label: 'Publications', path: '/research/publications', desc: 'Peer-reviewed journals & papers' },
      { label: 'Innovation Projects', path: '/research/projects', desc: 'Industry-funded research initiatives' }
    ]
  },
  {
    id: 'campus',
    label: 'Campus Life',
    path: '/campus-life',
    dropdown: [
      { label: 'Student Clubs', path: '/campus-life/clubs', desc: 'Cultural, technical & social societies' },
      { label: 'Hostels & Dining', path: '/campus-life/hostels', desc: 'Residential halls & campus canteens' },
      { label: 'Sports & Fitness', path: '/campus-life/sports', desc: 'Gymnasiums, grounds & tournaments' }
    ]
  },
  {
    id: 'placements',
    label: 'Placements',
    path: '/placements',
    dropdown: [
      { label: 'Placement Cell', path: '/placements/cell', desc: 'Training & career orientation' },
      { label: 'Top Recruiters', path: '/placements/recruiters', desc: 'Global corporate partners' },
      { label: 'Statistics', path: '/placements/stats', desc: 'Salary packages & placement records' }
    ]
  },
  // ← NEW: Notices menu entry (MERN addition)
  { id: 'notices', label: 'Notices', path: '/notices' },
  { id: 'contact', label: 'Contact Us', path: '/contact' }
];
