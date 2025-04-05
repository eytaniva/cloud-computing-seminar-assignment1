import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Match from "@pages/match";
import Main from "@pages/main";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishJson from "@i18next/en.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const resources = {
  en: {
    translation: englishJson,
  },
};

function App() {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/match" element={<Match />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
