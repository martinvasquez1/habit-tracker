"use client";

import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip"

import LandingLayout from "./layouts/landing-layout.js";
import Landing from "./pages/landing.js";
import About from "./pages/about.js";
import SignUp from "./pages/sign-up.js";
import SignIn from "./pages/sign-in.js";
import NotFound from "./pages/not-found.js";

import AuthRoutes from "./components/auth-routes.js";
import AppLayout from "./layouts/app-layout.js";
import Home from "./pages/home.js";
import Habits from "./pages/habits.js";
import Habit from "./pages/habit.tsx";
import Settings from "./pages/settings.tsx";

const queryClient = new QueryClient();

export default function Router() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<Landing />} />
              <Route path="about" element={<About />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
            </Route>

            <Route path="/" element={<AuthRoutes />}>
              <Route element={<AppLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="habits" element={<Habits />} />
                <Route path="habits/:habitId" element={<Habit />} />
                <Route path="settings/" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
