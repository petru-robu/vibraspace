export const routes = {
  home: "/",
  mixer: "/mixer",
  theory: "/theory",
  workshop: "/workshop",
  workshopProject: "/workshop/:id",
  sessionForm: "/session-form",
  sessionMixer: "/session-mixer",
};

export const navLinks = [
  { label: "Home", to: routes.home },
  { label: "Mixer", to: routes.mixer },
  { label: "Studio", to: routes.sessionForm },
];
