import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Subjects } from "./pages/Subjects";
import { SubjectDetails } from "./pages/SubjectDetails";
import { Practice } from "./pages/Practice";
import { Quiz } from "./pages/Quiz";
import { AITutor } from "./pages/AITutor";
import { Analytics } from "./pages/Analytics";
import { Flashcards } from "./pages/Flashcards";
import { Tests } from "./pages/Tests";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";

export default function App(){
 return <BrowserRouter><Routes><Route path="/login" element={<Login/>}/><Route element={<AppLayout/>}><Route path="/" element={<Dashboard/>}/><Route path="/subjects" element={<Subjects/>}/><Route path="/subjects/:id" element={<SubjectDetails/>}/><Route path="/practice" element={<Practice/>}/><Route path="/quiz" element={<Quiz/>}/><Route path="/ai-tutor" element={<AITutor/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/flashcards" element={<Flashcards/>}/><Route path="/tests" element={<Tests/>}/><Route path="/settings" element={<Settings/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></BrowserRouter>
}
