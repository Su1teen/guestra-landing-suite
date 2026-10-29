import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
// Страницы пререндерятся при сборке: если разметка уже есть, React подхватывает её.
if (root.firstElementChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
